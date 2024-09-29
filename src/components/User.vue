<template>
    <div
        class="container mx-auto mt-16 pt-4 flex items-center justify-center lg:h-[90vh] relative overflow-hidden"
    >
        <div
            class="w-full px-4 m-4 bg-white lg:flex lg:flex-row justify-evenly"
        >
            <!-- Navigation -->
            <nav
                class="w-full lg:relative lg:w-64"
                aria-label="Sidebar Navigation"
            >
                <div class="flex lg:flex-col justify-between w-full mb-4 gap-2">
                    <h1 class="text-xl font-bold">Dashboard</h1>

                    <!-- Dropdown for small screens -->
                    <div class="lg:hidden relative">
                        <button
                            @click="toggleMenu"
                            class="bg-gray-200 p-2 rounded flex items-center justify-between"
                            aria-expanded="isMenuOpen"
                            aria-label="Toggle Menu"
                        >
                            <ChevronDownIcon
                                class="w-5 text-blueviolet-600"
                                v-if="!isMenuOpen"
                            ></ChevronDownIcon>
                            <ChevronUpIcon class="w-5" v-else></ChevronUpIcon>
                        </button>

                        <div
                            v-if="isMenuOpen"
                            class="absolute right-0 mt-3 w-48 bg-white border m-auto border-t-0 rounded-lg z-50 overflow-hidden bg-opacity-95"
                        >
                            <ul class="py-1">
                                <router-link
                                    v-for="(item, index) in menuItems"
                                    :to="item.link"
                                    :key="index"
                                    exact
                                    class="block mx-auto w-11/12 text-slate-800 rounded-md p-3 transition hover:bg-blueviolet-50 focus:bg-blueviolet-100 hover:pl-2"
                                >
                                    {{ item.name }}
                                </router-link>
                            </ul>
                        </div>
                    </div>

                    <!-- Full screen menu -->
                    <ul class="hidden lg:flex flex-col space-y-2">
                        <li v-for="(item, index) in menuItems" :key="index">
                            <a
                                :href="item.link"
                                class="flex m-auto py-2 text-slate-800 rounded-md transition hover:bg-blueviolet-50 hover:pl-4"
                            >
                                {{ item.name }}
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <!-- Main Content -->
            <main
                class="w-full p-6 lg:ml-24 bg-gray-200 rounded-md transition-all overflow-hidden"
            >
                <header class="flex justify-between items-center mb-6">
                    <div>
                        <h1 class="text-2xl font-bold">My Dashboard</h1>
                        <p class="text-sm text-gray-500">
                            Welcome to your UFood portal
                        </p>
                    </div>
                </header>

                <!-- Profile and Data Section -->
                <div
                    class="space-y-6 lg:space-y-0 lg:gap-6 mx-auto lg:flex lg:flex-row"
                >
                    <ProfileCard />
                    <div
                        class="lg:flex-auto lg:flex-col lg:flex justify-between gap-6"
                    >
                        <RecentlyVisitedRestaurantsList />
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/20/solid";
import ProfileCard from "./ProfileCard.vue";
import RecentlyVisitedRestaurantsList from "./RecentlyVisitedRestaurantsList.vue";
import { ref } from "vue";

const menuItems = ref([
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Services", link: "/services" },
    { name: "Contact", link: "/contact" },
]);

const isMenuOpen = ref(false);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
ul {
    transition: max-height 0.3s ease;
}
a {
    transition:
        padding-left 0.3s,
        background-color 0.3s;
}
</style>
