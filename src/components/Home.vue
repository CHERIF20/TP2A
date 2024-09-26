<template>
    <div class="bg-gray-50">
        <div>
            <!-- Mobile filter dialog -->
            <TransitionRoot as="template" :show="mobileFiltersOpen">
                <Dialog
                    class="relative z-40 sm:hidden"
                    @close="mobileFiltersOpen = false"
                >
                    <TransitionChild
                        as="template"
                        enter="transition-opacity ease-linear duration-300"
                        enter-from="opacity-0"
                        enter-to="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leave-from="opacity-100"
                        leave-to="opacity-0"
                    >
                        <div class="fixed inset-0 bg-black bg-opacity-25" />
                    </TransitionChild>

                    <div class="fixed inset-0 z-40 flex">
                        <TransitionChild
                            as="template"
                            enter="transition ease-in-out duration-300 transform"
                            enter-from="translate-x-full"
                            enter-to="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leave-from="translate-x-0"
                            leave-to="translate-x-full"
                        >
                            <DialogPanel
                                class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl"
                            >
                                <div
                                    class="flex items-center justify-between px-4"
                                >
                                    <h2
                                        class="text-lg font-medium text-gray-900"
                                    >
                                        Filters
                                    </h2>
                                    <button
                                        type="button"
                                        class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        @click="mobileFiltersOpen = false"
                                    >
                                        <span class="sr-only">Close menu</span>
                                        <XMarkIcon
                                            class="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>

                                <!-- Filters -->
                                <form class="mt-4">
                                    <Disclosure
                                        as="div"
                                        v-for="section in filters"
                                        :key="section.name"
                                        class="border-t border-gray-200 px-4 py-6"
                                        v-slot="{ open }"
                                    >
                                        <h3 class="-mx-2 -my-3 flow-root">
                                            <DisclosureButton
                                                class="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400"
                                            >
                                                <span
                                                    class="font-medium text-gray-900"
                                                    >{{ section.name }}</span
                                                >
                                                <span
                                                    class="ml-6 flex items-center"
                                                >
                                                    <ChevronDownIcon
                                                        :class="[
                                                            open
                                                                ? '-rotate-180'
                                                                : 'rotate-0',
                                                            'h-5 w-5 transform',
                                                        ]"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            </DisclosureButton>
                                        </h3>
                                        <DisclosurePanel class="pt-6">
                                            <div class="space-y-6">
                                                <div
                                                    v-for="(
                                                        option, optionIdx
                                                    ) in section.options"
                                                    :key="option.value"
                                                    class="flex items-center"
                                                >
                                                    <input
                                                        :id="`filter-mobile-${section.id}-${optionIdx}`"
                                                        :name="`${section.id}[]`"
                                                        :value="option.value"
                                                        type="checkbox"
                                                        :checked="
                                                            option.checked
                                                        "
                                                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                    />
                                                    <label
                                                        :for="`filter-mobile-${section.id}-${optionIdx}`"
                                                        class="ml-3 text-sm text-gray-500"
                                                        >{{
                                                            option.label
                                                        }}</label
                                                    >
                                                </div>
                                            </div>
                                        </DisclosurePanel>
                                    </Disclosure>
                                </form>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </Dialog>
            </TransitionRoot>

            <main>
                <div class="mx-auto max-w-3xl lg:max-w-7xl">
                    <div
                        class="w-full h-96 flex flex-col items-center rounded-md bg-[url('https://media.istockphoto.com/id/486506594/photo/madrid-plaza-mayor-people-enjoying-al-fresco-restaurants-panorama-spain.jpg?s=612x612&w=0&k=20&c=E4kWi_-1l6XTUqOz3B5xis_-2jX5-89G25yYVLD3V18=')] bg-cover"
                    >
                        <div
                            class="w-full h-full flex flex-col rounded-md justify-center items-center backdrop-blur-sm"
                        >
                            <h1
                                class="px-2 text-4xl font-bold tracking-tight text-gray-50 text-center"
                            >
                                Discover the perfect restaurant for your next
                                meal
                            </h1>
                            <div
                                class="flex justify-center px-6 py-4 w-2/3 md:w-2/3 lg:w-1/2"
                            >
                                <div class="w-full">
                                    <label for="search" class="sr-only"
                                        >Search</label
                                    >
                                    <SearchBar />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="px-4 sm:px-6 lg:px-8">
                        <!-- Filters -->
                        <section
                            aria-labelledby="filter-heading"
                            class="border-t border-gray-200 pt-6"
                        >
                            <h2 id="filter-heading" class="sr-only">
                                Product filters
                            </h2>

                            <div class="flex items-center justify-between">
                                <Menu
                                    as="div"
                                    class="relative inline-block text-left"
                                >
                                    <transition
                                        enter-active-class="transition ease-out duration-100"
                                        enter-from-class="transform opacity-0 scale-95"
                                        enter-to-class="transform opacity-100 scale-100"
                                        leave-active-class="transition ease-in duration-75"
                                        leave-from-class="transform opacity-100 scale-100"
                                        leave-to-class="transform opacity-0 scale-95"
                                    >
                                        <MenuItems
                                            class="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        >
                                            <div class="py-1">
                                                <MenuItem
                                                    v-for="option in sortOptions"
                                                    :key="option"
                                                    v-slot="{ active }"
                                                >
                                                    <a
                                                        :href="option.href"
                                                        :class="[
                                                            active
                                                                ? 'bg-gray-100'
                                                                : '',
                                                            'block px-4 py-2 text-sm font-medium text-gray-900',
                                                        ]"
                                                        >{{ option.name }}</a
                                                    >
                                                </MenuItem>
                                            </div>
                                        </MenuItems>
                                    </transition>
                                </Menu>

                                <button
                                    type="button"
                                    class="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
                                    @click="mobileFiltersOpen = true"
                                >
                                    Filters
                                </button>

                                <PopoverGroup
                                    class="hidden sm:flex sm:items-baseline sm:space-x-8"
                                >
                                    <Popover
                                        as="div"
                                        v-for="section in filters"
                                        :key="section.name"
                                        id="menu"
                                        class="relative inline-block text-left"
                                    >
                                        <div>
                                            <PopoverButton
                                                class="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                                            >
                                                <span>{{ section.name }}</span>
                                                <ChevronDownIcon
                                                    class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                    aria-hidden="true"
                                                />
                                            </PopoverButton>
                                        </div>

                                        <transition
                                            enter-active-class="transition ease-out duration-100"
                                            enter-from-class="transform opacity-0 scale-95"
                                            enter-to-class="transform opacity-100 scale-100"
                                            leave-active-class="transition ease-in duration-75"
                                            leave-from-class="transform opacity-100 scale-100"
                                            leave-to-class="transform opacity-0 scale-95"
                                        >
                                            <PopoverPanel
                                                class="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                                            >
                                                <form class="space-y-4">
                                                    <div
                                                        v-for="(
                                                            option, optionIdx
                                                        ) in section.options"
                                                        :key="option.value"
                                                        class="flex items-center"
                                                    >
                                                        <input
                                                            :id="`filter-${section.id}-${optionIdx}`"
                                                            :name="`${section.id}[]`"
                                                            :value="
                                                                option.value
                                                            "
                                                            :checked="
                                                                option.checked
                                                            "
                                                            type="checkbox"
                                                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                        <label
                                                            :for="`filter-${section.id}-${optionIdx}`"
                                                            class="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                                                            >{{
                                                                option.label
                                                            }}</label
                                                        >
                                                    </div>
                                                </form>
                                            </PopoverPanel>
                                        </transition>
                                    </Popover>
                                </PopoverGroup>
                            </div>
                        </section>

                        <!-- Product grid -->
                        <section
                            aria-labelledby="products-heading"
                            class="mt-8"
                        >
                            <h2 id="products-heading" class="sr-only">
                                Products
                            </h2>

                            <div
                                class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8"
                            >
                                <RestaurantCard
                                    v-for="restaurant in restaurants"
                                    :key="restaurant.id"
                                    :restaurant="restaurant"
                                    class="group"
                                />
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuItem,
    MenuItems,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    TransitionChild,
    TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import SearchBar from "@/components/SearchBar.vue";
import RestaurantCard from "@/components/RestaurantCard.vue";

const sortOptions = [
    { name: "Most Popular", href: "#" },
    { name: "Best Rating", href: "#" },
    { name: "Newest", href: "#" },
    { name: "Price: Low to High", href: "#" },
    { name: "Price: High to Low", href: "#" },
];
const filters = [
    {
        id: "restaurant-type",
        name: "Restaurant Type",
        options: [
            { value: "fine-dining", label: "Fine Dining" },
            { value: "fast-food", label: "Fast Food" },
            { value: "buffet", label: "Buffet" },
            { value: "cafe-bistro", label: "Café/Bistro" },
            { value: "restaurant-bar", label: "Restaurant/Bar" },
            { value: "street-food", label: "Street Food" },
        ],
    },
    {
        id: "price-range",
        name: "Price Range",
        options: [
            { value: "0-10", label: "$0 - $10" },
            { value: "10-25", label: "$10 - $25" },
            { value: "25-50", label: "$25 - $50" },
            { value: "50+", label: "$50+" },
        ],
    },
    {
        id: "reviews",
        name: "Reviews",
        options: [
            { value: "1+", label: "1 & up" },
            { value: "2+", label: "2 & up" },
            { value: "3+", label: "3 & up" },
            { value: "4+", label: "4 & up" },
        ],
    },
];
const restaurants = [
    {
        id: 1,
        name: "The Chef’s Corner",
        reviews: 4.4,
        location: "Montreal, Qc",
        imageSrc:
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudHxlbnwwfHwwfHx8Mg%3D%3D",
        imageAlt: "",
    },
    {
        id: 2,
        name: "The Gourmet Haven",
        reviews: 3.8,
        location: "Montreal, Qc",
        imageSrc:
            "https://images.unsplash.com/photo-1497644083578-611b798c60f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8Mg%3D%3D",
        imageAlt: "",
    },
    {
        id: 3,
        name: "The Tipsy Fork & Tap",
        reviews: 4.3,
        location: "Montreal, Qc",
        imageSrc:
            "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdGF1cmFudHxlbnwwfHwwfHx8Mg%3D%3D",
        imageAlt: "",
    },
    {
        id: 4,
        name: "Savory Springs",
        reviews: 4.7,
        location: "Montreal, Qc",
        imageSrc:
            "https://images.unsplash.com/photo-1505275350441-83dcda8eeef5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDI%3D",
        imageAlt: "",
    },
    {
        id: 5,
        name: "Urban Harvest Bistro",
        reviews: 4.5,
        location: "Montreal, Qc",
        imageSrc:
            "https://images.unsplash.com/photo-1474898856510-884a2c0be546?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8Mg%3D%3D",
        imageAlt: "",
    },
    {
        id: 6,
        name: "Mosaic Café",
        reviews: 4.8,
        location: "Montreal, Qc",
        imageSrc:
            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDI%3D",
        imageAlt: "",
    },
    {
        id: 7,
        name: "Bistro Bella Vita",
        reviews: 3.9,
        location: "Montreal, Qc",
        imageSrc:
            "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDI%3D",
        imageAlt: "",
    },
    {
        id: 8,
        name: "The Rustic Table",
        reviews: 4.2,
        location: "Montreal, Qc",
        imageSrc:
            "https://images.unsplash.com/photo-1517638851339-a711cfcf3279?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDI%3D",
        imageAlt: "",
    },
    {
        id: 9,
        name: "Saffron & Sage",
        reviews: 5,
        location: "Montreal, Qc",
        imageSrc:
            "https://images.unsplash.com/photo-1488992783499-418eb1f62d08?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDI%3D",
        imageAlt: "",
    },
];

const mobileFiltersOpen = ref(false);
</script>
