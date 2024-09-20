<template>
    <div class="relative">
        <div
            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
        >
            <MagnifyingGlassIcon
                class="h-5 w-5 text-gray-400"
                aria-hidden="true"
            />
        </div>
        <input
            id="search"
            name="search"
            class="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            v-model="search"
            placeholder="Search"
            type="search"
        />
    </div>
</template>

<script setup>
import { MagnifyingGlassIcon } from "@heroicons/vue/20/solid";
import { ref, watch } from "vue";

var search = ref("");

// Emit the update:search to the parent component
const emit = defineEmits(["update:search"]);

// Watch for changes in search and emit to the parent
watch(search, (newVal) => {
    emit("update:search", newVal);
});
</script>
