<template>
    <div
        class="bg-white p-6 rounded-lg shadow-md text-center flex flex-col justify-between h-full"
    >
        <div
            id="myMap"
            class="rounded-md w-full h-64 sm:h-80 md:h-96 relative"
        ></div>
        <span class="text-sm text-red-500">{{ error }}</span>
        <button
            @click="modalOpen = true"
            target="_blank"
            class="mt-4 inline-block bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition duration-300"
        >
            Get Directions
        </button>
        <UserLocationModal
            v-model="modalOpen"
            :open="modalOpen"
            :userPosition="userPosition"
            :searchResults="searchResults"
            @update:open="modalOpen = $event"
            @update:userLocation="findRoute($event)"
            @update:searchResults="findAddress($event)"
        />
        <div
            class="flex items-center justify-between border-t border-gray-200 pt-4"
        >
            <div class="flex items-center space-x-2">
                <i class="fas fa-map-marker-alt text-gray-500"></i>
                <span class="text-sm text-gray-500">
                    {{ props.restaurantAdress }}</span
                >
            </div>
            <div class="flex items-center space-x-2">
                <i class="fas fa-phone-alt text-gray-500"></i>
                <span class="text-sm text-gray-500">
                    {{ props.restaurantPhone }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import UserLocationModal from "@/components/UserLocationModal.vue";

const datasource = ref();
const map = ref();
const error = ref("");
const modalOpen = ref(false);
const userPosition = ref("");
const routeEndPoint = ref([]);
const pipeline = ref();
const searchResults = ref([]);

const props = defineProps({
    restaurantCoordinates: { type: Array, required: true },
    restaurantPhone: { type: String, required: true },
    restaurantAdress: { type: String, required: true },
    restaurantName: { type: String, required: true },
});

onMounted(() => {
    if (props.restaurantCoordinates) {
        getMap(props.restaurantCoordinates);
    } else {
        error.value =
            "The map is taking longer than expected to load. Please try again later or contact support if the issue persists";
    }
});

function findAddress(searchInput) {
    error.value = "";
    if (!searchInput) {
        searchResults.value = [];
        return;
    }
    searchResults.value = [];
    const searchURL = new atlas.service.SearchURL(pipeline.value);

    searchURL
        .searchAddress(atlas.service.Aborter.timeout(10000), searchInput, {
            lon: map.value.getCamera().center[0],
            lat: map.value.getCamera().center[1],
            maxFuzzyLevel: 4,
            view: "Auto",
        })
        .then((response) => {
            const data = response.geojson.getFeatures();
            searchResults.value = data.features;
        })
        .catch((err) => {
            error.value = "Error searching for address";
        });
}

function findRoute(userCoordinates) {
    searchResults.value = [];
    error.value = "";
    datasource.value.clear();
    const startPoint = new atlas.data.Feature(
        new atlas.data.Point(userCoordinates),
        {
            icon: "pin-round-red",
        },
    );

    datasource.value.add([startPoint, routeEndPoint.value]);

    map.value.layers.add(
        new atlas.layer.LineLayer(datasource.value, null, {
            strokeColor: "#2272B9",
            strokeWidth: 5,
            lineJoin: "round",
            lineCap: "round",
        }),
        "labels",
    );

    const routeURL = new atlas.service.RouteURL(pipeline.value);

    routeURL
        .calculateRouteDirections(atlas.service.Aborter.timeout(10000), [
            startPoint.geometry.coordinates,
            routeEndPoint.value.geometry.coordinates,
        ])
        .then((response) => {
            const data = response.geojson.getFeatures();
            if (data && data.features.length > 0) {
                datasource.value.add(data);
                map.value.setCamera({
                    bounds: data.bbox,
                    padding: 40,
                });
            }
        })
        .catch((err) => {
            error.value = "No route found between the locations.";
        });
}

function getMap(coordinates) {
    map.value = new atlas.Map("myMap", {
        view: "Auto",
        authOptions: {
            authType: "subscriptionKey",
            subscriptionKey: process.env.VUE_APP_MAP_API_KEY,
        },
    });

    map.value.events.add("ready", () => {
        map.value.controls.add(new atlas.control.ZoomControl(), {
            position: "top-right",
        });

        datasource.value = new atlas.source.DataSource();
        map.value.sources.add(datasource.value);

        routeEndPoint.value = new atlas.data.Feature(
            new atlas.data.Point(coordinates),
            {
                title: props.restaurantName,
                icon: "marker-red",
            },
        );

        datasource.value.add(routeEndPoint.value);

        map.value.layers.add(
            new atlas.layer.SymbolLayer(datasource.value, null, {
                iconOptions: {
                    image: ["get", "icon"],
                    allowOverlap: true,
                    ignorePlacement: true,
                },
                textOptions: {
                    textField: ["get", "title"],
                    offset: [0, 1.2],
                },
                filter: [
                    "any",
                    ["==", ["geometry-type"], "Point"],
                    ["==", ["geometry-type"], "MultiPoint"],
                ],
            }),
        );

        map.value.setCamera({
            center: coordinates,
            zoom: 14,
        });
        pipeline.value = atlas.service.MapsURL.newPipeline(
            new atlas.service.MapControlCredential(map.value),
        );

        navigator.geolocation.getCurrentPosition((position) => {
            const searchURL = new atlas.service.SearchURL(pipeline.value);

            searchURL
                .searchAddressReverse(
                    atlas.service.Aborter.timeout(3000),
                    [position.coords.longitude, position.coords.latitude],
                    {},
                )
                .then((results) => {
                    const data = results.geojson.getFeatures();
                    if (
                        data.features.length > 0 &&
                        data.features[0].properties &&
                        data.features[0].properties.address &&
                        data.features[0].properties.address.freeformAddress
                    ) {
                        userPosition.value +=
                            data.features[0].properties.address.freeformAddress;
                    }
                });
        });
    });
}
</script>
