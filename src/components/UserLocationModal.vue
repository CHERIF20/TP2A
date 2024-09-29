<template>
    <TransitionRoot as="template" :show="internalOpen">
        <Dialog class="relative z-10" @close="internalOpen = false">
            <TransitionChild
                as="template"
                enter="ease-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in duration-200"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div
                    class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                />
            </TransitionChild>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div
                    class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
                >
                    <TransitionChild
                        as="template"
                        enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
                        >
                            <!-- Close Button -->
                            <div class="absolute top-0 right-0 mr-4 mt-4">
                                <button
                                    type="button"
                                    @click="internalOpen = false"
                                    class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    <span class="sr-only">Close</span>
                                    <XMarkIcon
                                        class="h-5 w-5"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>

                            <div>
                                <div class="mt-3 text-center sm:mt-5">
                                    <DialogTitle
                                        as="h3"
                                        class="text-base font-semibold leading-6 text-gray-900"
                                        >Your street number and name
                                    </DialogTitle>
                                    <div class="mt-2">
                                        <SearchBar
                                            @update:search="
                                                searchInput = $event
                                            "
                                        />
                                    </div>
                                    <div id="results-panel" class="mt-4">
                                        <ul class="space-y-4">
                                            <li
                                                v-for="result in props.searchResults"
                                                :key="result.id"
                                                @click="
                                                    itemClicked(
                                                        result.geometry
                                                            .coordinates,
                                                    )
                                                "
                                                class="p-4 bg-gray-100 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-200"
                                            >
                                                <div class="font-bold text-lg">
                                                    {{
                                                        result.properties.poi
                                                            ?.name ||
                                                        result.properties
                                                            .address
                                                            .freeformAddress
                                                    }}
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
<script setup>
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { ref, watch } from "vue";
import SearchBar from "./SearchBar.vue";

const props = defineProps({
    open: {
        type: Boolean,
        required: true,
    },
    userPosition: {
        type: String,
        required: false,
    },
    searchResults: {
        type: Array,
        required: true,
    },
});

const searchInput = ref("");
const internalOpen = ref(props.open);

const emit = defineEmits([
    "update:open",
    "update:userLocation",
    "update:searchResults",
]);
const searchLengthThreshold = 3;
let searchInputLength;
const keyStrokeDelay = 150;

watch(
    () => props.open,
    (newVal) => {
        internalOpen.value = newVal;
        if (props.userPosition && props.userPosition.length > 0) {
            searchInput.value = props.userPosition;
        }
    },
);

watch(searchInput, (newVal) => {
    if (newVal.length >= searchLengthThreshold) {
        setTimeout(() => {
            if (searchInputLength == newVal.length) {
                emit("update:searchResults", newVal);
            }
        }, keyStrokeDelay);
    }
    searchInputLength = newVal.length;
});

watch(internalOpen, (newVal) => {
    if (!newVal) {
        emit("update:open", false);
    }
});

function closeModal() {
    internalOpen.value = false;
    searchInput.value = "";
}

function itemClicked(result) {
    closeModal();
    emit("update:userLocation", result);
}
</script>
