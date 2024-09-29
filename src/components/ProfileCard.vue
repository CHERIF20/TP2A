<template>
    <div
        class="container max-w-sm mx-auto bg-white shadow-xl rounded-md overflow-hidden"
    >
        <div class="rounded-t-lg h-32 overflow-hidden w-full">
            <img
                class="object-cover object-top w-full h-full"
                :src="profileBackgroundImageLink"
                alt="Banner image"
            />
        </div>
        <div
            class="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden"
        >
            <img
                class="object-cover object-center h-full w-full"
                :src="userProfileImageLink"
                alt="Profile image"
            />
        </div>
        <div class="text-center mt-2">
            <h2 class="font-semibold">{{ userName }}</h2>
            <div class="flex justify-center items-center">
                <p class="text-gray-500">{{ userGrade }}</p>
                <CheckBadgeIcon
                    :class="['w-4 fill-current mx-2', userGrade.toLowerCase()]"
                    aria-label="User grade badge"
                />
            </div>
        </div>
        <ul
            class="py-4 mt-2 text-gray-700 flex items-center justify-around text-sm"
        >
            <li class="flex flex-col items-center">
                <StarIcon
                    class="w-5 fill-current text-blueviolet-700"
                    aria-label="User stars"
                />
                <div>{{ userStarsNumber }}</div>
            </li>
            <li class="flex flex-col items-center">
                <svg
                    class="w-4 fill-current text-blueviolet-700"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    aria-label="User followers"
                >
                    <path
                        d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z"
                    />
                </svg>
                <div>{{ userFollowersNumber }}</div>
            </li>
            <li class="flex flex-col items-center">
                <BuildingStorefrontIcon
                    class="w-5 fill-current text-blueviolet-700"
                    aria-label="User visited restaurants"
                />
                <div>{{ userVisitedRestaurantNumber }}</div>
            </li>
        </ul>
        <div class="p-4 flex justify-center border-t mx-8 mt-2">
            <button
                class="rounded-full bg-blueviolet-500 hover:shadow-lg font-semibold text-white px-6 py-2 transition-all duration-300 ease-in-out"
                aria-label="Follow user"
            >
                Follow
            </button>
        </div>
    </div>
</template>

<style scoped>
.newbie {
    color: #16ad16;
}
.bronze {
    color: #856d4d;
}
.silver {
    color: #868992;
}
.gold {
    color: gold;
}
.legend {
    color: #ff4f4f;
}
</style>

<script setup>
import {
    StarIcon,
    CheckBadgeIcon,
    BuildingStorefrontIcon,
} from "@heroicons/vue/20/solid";
import { ref } from "vue";

const userName = ref("Jane Doe");
const userGrade = ref("Newbie");
const userProfileImageLink = ref(
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
);
const profileBackgroundImageLink = ref("https://picsum.photos/300/600");
const userStarsNumber = ref(0);
const userFollowersNumber = ref(0);
const userVisitedRestaurantNumber = ref(0);
</script>
