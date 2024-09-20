<template>
    <div id="myMap" class="rounded-md size-full relative">
        <p>{{ error }}</p>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
let map, datasource;
const error = ref("");

const props = defineProps({
    restaurantCoordinates: { type: Array, required: true },
});

onMounted(() => {
    if (props.restaurantCoordinates) {
        getMap(props.restaurantCoordinates);
    } else {
        error.value =
            "The map is taking longer than expected to load. Please try again later or contact support if the issue persists.";
    }
});
function getMap(coordinates) {
    map = new atlas.Map("myMap", {
        view: "Auto",
        authOptions: {
            authType: "subscriptionKey",
            subscriptionKey: process.env.VUE_APP_MAP_API_KEY,
        },
    });
    map.events.add("ready", () => {
        map.controls.add(new atlas.control.ZoomControl(), {
            position: "top-right",
        });
        datasource = new atlas.source.DataSource();
        map.sources.add(datasource);
        const point = new atlas.Shape(new atlas.data.Point(coordinates));
        datasource.add(point);
        const symbolLayer = new atlas.layer.SymbolLayer(datasource, null, {
            iconOptions: {
                image: "marker-red",
                anchor: "center",
                allowOverlap: true,
            },
        });
        map.layers.add(symbolLayer);
        map.setCamera({
            center: coordinates,
            zoom: 14,
        });
    });
}
</script>
