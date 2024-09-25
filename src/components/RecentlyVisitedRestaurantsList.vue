<template>
    <div
        class="relative flex w-full h-full max-h-[430px] flex-col rounded-md border border-slate-200 p-3 bg-white shadow-sm overflow-hidden"
    >
        <div class="p-3">
            <h1 class="text-md lg:text-lg font-bold">Restaurants</h1>
            <p class="text-xs lg:text-sm text-gray-500">
                Restaurants you have recently visited
            </p>
        </div>
        <nav
            v-if="userRecentlyVisitedRestaurantsList.length > 0"
            class="flex w-full overflow-y-auto flex-col gap-1 rounded-lg"
        >
            <article
                v-for="(
                    restaurant, index
                ) in userRecentlyVisitedRestaurantsList"
                :key="index"
                class="flex items-center w-full rounded-md p-3 transition hover:bg-blueviolet-50 active:bg-blueviolet-100"
                aria-label="Visited restaurant"
            >
                <router-link
                    :to="{ name: 'Restaurant', params: { id: restaurant.id } }"
                    class="flex w-full items-center gap-4"
                >
                    <div class="flex-shrink-0 grid place-items-center">
                        <img
                            alt="restaurant image"
                            :src="restaurant.imageSrc"
                            class="h-12 w-12 rounded-full object-cover"
                        />
                    </div>
                    <div class="flex flex-col">
                        <h5 class="text-slate-800 text-sm font-bold">
                            {{ restaurant.name }}
                        </h5>
                        <p class="text-slate-500 text-sm">
                            {{ restaurant.location }}
                        </p>
                    </div>
                </router-link>
                <ul class="flex items-center gap-5 justify-end ml-auto">
                    <li class="flex flex-col items-center">
                        <StarIcon
                            class="w-4 text-yellow-300"
                            aria-hidden="true"
                        />
                        <div class="text-xs">{{ restaurant.reviews }}</div>
                    </li>
                    <li class="flex flex-col items-center">
                        <ArrowRightEndOnRectangleIcon
                            class="w-4 text-black"
                            aria-hidden="true"
                        />
                        <div class="text-xs">
                            {{ restaurant.userVisitsNumber }}
                        </div>
                    </li>
                </ul>
            </article>
        </nav>
        <div v-else class="text-center mt-6 h-full w-full">
            <h2 class="mb-4 text-md lg:text-lg font-semibold">
                Nothing to see here
            </h2>
            <p class="mb-4 text-xs lg:text-sm text-gray-500">
                Oops! Looks like you haven't visited any restaurants yet
            </p>
            <div class="animate-bounce">
                <svg
                    class="mx-auto h-16 w-16 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                </svg>
            </div>
            <router-link to="/" class="mt-4 text-blue-500">
                Let's get you back home
            </router-link>
        </div>
    </div>
</template>

<script setup>
import {
    StarIcon,
    ArrowRightEndOnRectangleIcon,
} from "@heroicons/vue/20/solid";
import { ref } from "vue";

const userRecentlyVisitedRestaurantsList = ref(
    new Array(0).fill({
        id: 1,
        name: "Some restaurant name",
        location: "404 Nowhere street, Faraway city, C0P 0C0, No Country",
        reviews: 1,
        userVisitsNumber: 1,
        imageSrc: "https://picsum.photos/400",
        homepageLink: "/",
    }),
);
</script>
