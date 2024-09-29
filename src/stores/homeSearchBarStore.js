import { defineStore } from "pinia";
import { ref } from "vue";

export const homeSearchBarStore = defineStore("homeSearchBarStore", {
    state: () => ({
        position: ref({
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        }),
    }),
    actions: {
        updatePosition(newPosition) {
            this.position = { ...newPosition };
        },
    },
    getters: {
        getPosition(state) {
            return state.position;
        },
    },
});
