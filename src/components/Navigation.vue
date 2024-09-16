<template>
    <!-- When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars -->
    <Popover as="template" v-slot="{ open }">
        <header
            :class="[
                open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
                'bg-white shadow-sm lg:static lg:overflow-y-visible',
            ]"
        >
            <div class="mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    class="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12"
                >
                    <div
                        class="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2"
                    >
                        <div class="flex flex-shrink-0 items-center">
                            <router-link to="/">
                                <img
                                    class="h-8 w-auto"
                                    src="https://i.imgur.com/GE1U9Kh.png"
                                    alt="UFood"
                                />
                            </router-link>
                        </div>
                    </div>
                    <div class="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                        <div
                            class="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0"
                        >
                            <div class="w-full">
                                <label for="search" class="sr-only"
                                    >Search</label
                                >
                                <SearchBar></SearchBar>
                            </div>
                        </div>
                    </div>
                    <div
                        class="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden"
                    >
                        <!-- Mobile menu button -->
                        <PopoverButton
                            class="relative -mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        >
                            <span class="absolute -inset-0.5" />
                            <span class="sr-only">Open menu</span>
                            <Bars3Icon
                                v-if="!open"
                                class="block h-6 w-6"
                                aria-hidden="true"
                            />
                            <XMarkIcon
                                v-else
                                class="block h-6 w-6"
                                aria-hidden="true"
                            />
                        </PopoverButton>
                    </div>
                    <div
                        class="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4"
                    >
                        <div
                            class="text-base font-medium text-gray-800"
                            v-if="user.isConnected"
                        >
                            {{ user.name }}
                        </div>
                        <div
                            class="text-base font-medium text-gray-800"
                            v-if="!user.isConnected"
                        >
                            Guest
                        </div>
                        <!-- Profile dropdown -->
                        <Menu as="div" class="relative ml-5 flex-shrink-0">
                            <div>
                                <MenuButton
                                    class="relative flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    <span class="absolute -inset-1.5" />
                                    <span class="sr-only">Open user menu</span>
                                    <img
                                        class="h-8 w-8 rounded-full"
                                        :src="user.imageUrl"
                                        alt=""
                                    />
                                </MenuButton>
                            </div>
                            <transition
                                enter-active-class="transition ease-out duration-100"
                                enter-from-class="transform opacity-0 scale-95"
                                enter-to-class="transform opacity-100 scale-100"
                                leave-active-class="transition ease-in duration-75"
                                leave-from-class="transform opacity-100 scale-100"
                                leave-to-class="transform opacity-0 scale-95"
                            >
                                <MenuItems
                                    class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                >
                                    <MenuItem
                                        v-for="item in userNavigation"
                                        :key="item.name"
                                        v-slot="{ active }"
                                    >
                                        <router-link
                                            :to="item.to"
                                            :class="[
                                                active ? 'bg-gray-100' : '',
                                                'block px-4 py-2 text-sm text-gray-700',
                                            ]"
                                            >{{ item.name }}</router-link
                                        >
                                    </MenuItem>
                                </MenuItems>
                            </transition>
                        </Menu>
                    </div>
                </div>
            </div>

            <PopoverPanel as="nav" class="lg:hidden" aria-label="Global">
                <div class="border-t border-gray-200 pb-3 pt-4">
                    <div
                        class="mx-auto flex max-w-3xl items-center px-4 sm:px-6"
                    >
                        <div class="flex-shrink-0">
                            <img
                                class="h-10 w-10 rounded-full"
                                :src="user.imageUrl"
                                alt=""
                            />
                        </div>
                        <div class="ml-3">
                            <div
                                class="text-base font-medium text-gray-800"
                                v-if="!user.isConnected"
                            >
                                Guest
                            </div>
                            <div
                                class="text-base font-medium text-gray-800"
                                v-if="user.isConnected"
                            >
                                {{ user.name }}
                            </div>
                            <div
                                class="text-sm font-medium text-gray-500"
                                v-if="user.isConnected"
                            >
                                {{ user.email }}
                            </div>
                        </div>
                    </div>
                    <div class="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">
                        <router-link
                            v-for="item in userNavigation"
                            :key="item.name"
                            :to="item.to"
                            class="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            >{{ item.name }}</router-link
                        >
                    </div>
                </div>
            </PopoverPanel>
        </header>
    </Popover>
</template>

<script setup>
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Popover,
    PopoverButton,
    PopoverPanel,
} from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import SearchBar from "@/components/SearchBar.vue";

const user = {
    name: "Chelsea Hagon",
    email: "chelsea.hagon@example.com",
    imageUrl:
        "https://cdn.pixabay.com/photo/2018/02/26/21/44/hamburger-3184108_640.png",
    isConnected: true,
};
const userNavigation = [
    { name: "Your Profile", to: "/user", showOnConnected: true },
    { name: "Sign out", to: "/", showOnConnected: true },
    { name: "Sign In", to: "/", showOnConnected: false },
].filter((nav) => nav.showOnConnected === user.isConnected);
</script>
