<template>
    <div>
        <div class="w-full overflow-hidden rounded-lg aspect-w-4 aspect-h-3">
            <img
                :src="restaurant.imageSrc"
                :alt="restaurant.imageAlt"
                class="h-full w-full object-cover object-center group-hover:opacity-75"
            />
        </div>
        <div
            class="mt-4 flex items-center justify-between text-base font-medium text-gray-900"
        >
            <h3>{{ restaurant.name }}</h3>
            <div class="flex items-center xl:col-span-1">
                <div class="flex items-center">
                    <StarIcon
                        v-for="rating in [0, 1, 2, 3, 4]"
                        :key="rating"
                        :class="[
                            restaurant.reviews > rating
                                ? 'text-yellow-400'
                                : 'text-gray-200',
                            'h-5 w-5 flex-shrink-0',
                        ]"
                        aria-hidden="true"
                    />
                </div>
                <p class="ml-3 text-sm text-gray-700">
                    {{ restaurant.reviews }}
                    <span class="sr-only"> out of 5 stars</span>
                </p>
            </div>
        </div>
        <p class="mt-1 text-sm italic text-gray-500">
            {{ restaurant.location }}
        </p>
    </div>
</template>

<script setup>
import { StarIcon } from "@heroicons/vue/20/solid";

defineProps({ restaurant: Object });
</script>
