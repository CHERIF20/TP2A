<template>
    <div class="mt-16 pt-4 bg-gray-50">
        <div class="max-w-custom mx-auto">
            <div class="relative overflow-hidden w-full rounded-md">
                <div
                    class="flex transition-transform duration-700 ease-in-out"
                    :style="{
                        transform: `translateX(-${currentIndex * 100}%)`,
                    }"
                >
                    <!-- Loop through images to create slides -->
                    <div
                        v-for="(image, index) in images"
                        :key="index"
                        class="w-full flex-shrink-0 relative"
                    >
                        <img
                            :src="image"
                            alt="Restaurant image"
                            class="h-64 sm:h-80 md:h-96 w-full object-cover object-center"
                        />
                        <!-- Overlay for slide text -->
                        <div
                            class="absolute top-0 left-0 w-full md:w-1/2 h-full p-4 sm:p-8 flex flex-col justify-center bg-black bg-opacity-10 text-white"
                        >
                            <h2
                                class="text-3xl sm:text-4xl md:text-5xl font-extrabold"
                            >
                                {{ name }}
                            </h2>
                            <p class="mt-2 sm:mt-4 text-lg sm:text-xl">
                                Book your table now to savor exquisite dishes.
                            </p>
                        </div>
                    </div>
                </div>
                <!-- Button for previous slide -->
                <button
                    @click="prevSlide"
                    class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 rounded"
                >
                    ❮
                </button>
                <!-- Button for next slide -->
                <button
                    @click="nextSlide"
                    class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 rounded"
                >
                    ❯
                </button>
            </div>

            <!-- Container for additional restaurant details -->
            <div
                class="relative mx-auto -mt-12 max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8"
            >
                <dl
                    class="mx-auto mt-16 grid max-w-2xl grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10 sm:gap-y-16 lg:max-w-none lg:grid-cols-2 lg:gap-x-8"
                >
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <!-- Cuisine Types Section -->
                        <div
                            class="bg-white shadow-md border-t border-gray-200 p-6 rounded-lg"
                        >
                            <h5
                                class="text-2xl sm:text-xl font-semibold text-gray-800 mb-4"
                            >
                                Cuisine Types
                            </h5>
                            <div class="space-y-4">
                                <div
                                    class="flex items-center"
                                    v-for="(type, index) in cuisineTypes"
                                    :key="index"
                                >
                                    <i :class="type.iconClass"></i>
                                    <span
                                        class="ml-2 text-lg sm:text-xl text-gray-700"
                                        >{{ type.name }}</span
                                    >
                                </div>
                            </div>
                        </div>

                        <!-- Opening Hours Section -->
                        <div
                            class="bg-white shadow-md border-t border-gray-200 p-6 rounded-lg"
                        >
                            <h3
                                class="text-2xl sm:text-xl font-semibold text-gray-800 mb-4"
                            >
                                Opening Hours
                            </h3>
                            <div class="text-lg sm:text-l text-gray-500">
                                <div
                                    v-for="(hours, day) in openingHours"
                                    :key="day"
                                >
                                    <strong>{{ day }}:</strong> {{ hours }}
                                </div>
                            </div>
                        </div>

                        <!-- Price Range Section -->
                        <div
                            class="bg-white shadow-md border-t border-gray-200 p-6 rounded-lg"
                        >
                            <h3
                                class="text-2xl sm:text-xl font-semibold text-gray-800 mb-4"
                            >
                                Price Range
                            </h3>
                            <div class="flex items-center">
                                <i
                                    class="fas fa-dollar-sign text-green-500"
                                ></i>
                                <span
                                    class="ml-2 text-lg sm:text-xl text-gray-500"
                                    >{{ priceRange }}</span
                                >
                            </div>
                        </div>

                        <!-- Average Rating Section -->
                        <div
                            class="bg-white shadow-md border-t border-gray-200 p-6 rounded-lg"
                        >
                            <h3
                                class="text-2xl sm:text-xl font-semibold text-gray-800 mb-4"
                            >
                                Average Rating
                            </h3>
                            <div class="flex items-center">
                                <i
                                    v-for="star in fullStars"
                                    :key="star"
                                    class="fas fa-star text-yellow-500"
                                ></i>
                                <i
                                    v-if="halfStar"
                                    class="fas fa-star-half-alt text-yellow-500"
                                ></i>
                            </div>
                        </div>
                    </div>

                    <!-- Map and contact information -->
                    <div>
                        <RestaurantMap
                            :restaurantCoordinates="coordinates"
                            :restaurantPhone="phone"
                            :restaurantAdress="address"
                            :restaurantName="name"
                        />
                    </div>
                </dl>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import RestaurantMap from "./RestaurantMap.vue";

const images = ref([
    "https://ufood.s3-us-west-2.amazonaws.com/pictures/ec8c7eae-b114-4a4f-abf7-d8a1f1ebfdbd.jpg",
    "https://ufood.s3-us-west-2.amazonaws.com/pictures/838cd69b-b0e4-4b5c-90f7-fd669bdeaa4e.jpg",
    "https://ufood.s3-us-west-2.amazonaws.com/pictures/0ef98b55-1bc6-47c7-84ac-84fff03fd0ce.jpg",
    "https://ufood.s3-us-west-2.amazonaws.com/pictures/f12d653a-e4ab-43ce-9406-4a09f62c93b1.jpg",
    "https://ufood.s3-us-west-2.amazonaws.com/pictures/98bdf440-e61b-463f-af0c-965e7b012ca8.jpg",
    "https://ufood.s3-us-west-2.amazonaws.com/pictures/b247a725-4a91-45c6-a821-9c6119868339.jpg",
    "https://ufood.s3-us-west-2.amazonaws.com/pictures/a8f554fd-789f-4165-9ab2-ff015a24f2b3.jpg",
    "https://ufood.s3-us-west-2.amazonaws.com/pictures/e1886cb9-7d53-4117-9b03-7f79c606d550.jpg",
    "https://ufood.s3-us-west-2.amazonaws.com/pictures/cdb967be-12d0-4a17-8afe-b1aac26f4c1a.jpg",
]);

// Current index for the slider
const currentIndex = ref(0);

// Function to go to the next slide
const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % images.value.length;
};

// Function to go to the previous slide
const prevSlide = () => {
    currentIndex.value =
        (currentIndex.value - 1 + images.value.length) % images.value.length;
};

// Function to start auto-slide
const startAutoSlide = () => {
    setInterval(() => {
        nextSlide();
    }, 3000);
};

// On component mount, start the auto-slide
onMounted(() => {
    startAutoSlide();
});

// Data
const cuisineTypes = ref([
    { name: "Italian", iconClass: "fas fa-utensils text-green-500" },
    { name: "Vegan", iconClass: "fas fa-leaf text-green-500" },
    { name: "Seafood", iconClass: "fas fa-fish text-green-500" },
]);

const openingHours = ref({
    "Mon - Wed": "10 AM - 10 PM",
    "Thu - Fri": "9 AM - 10 PM",
    "Sat - Sun": "8 AM - 11 PM",
});

const priceRange = ref("20 - 50");
const rating = ref("4.5/5");
const fullStars = ref([1, 2, 3, 4]);
const halfStar = ref(true);
const name = ref("The Chef’s Corner");
const address = ref("12 rue Saint-Anne, QC, G1R 3X2");
const phone = ref("+1 877-266-5687");
const coordinates = ref([-71.2283214, 46.83446199999999]);
</script>

<style>
.corp {
    margin: 0;
    line-height: inherit;
}
</style>
