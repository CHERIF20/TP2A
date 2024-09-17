<template>
    <div id="app">
        <nav-menu></nav-menu>
        <router-view></router-view>
        <app-footer></app-footer>
    </div>
</template>

<script>
import Navigation from "@/components/Navigation";
import AppFooter from "@/components/AppFooter";
export default {
    name: "app",
    components: {
        "nav-menu": Navigation,
        "app-footer": AppFooter,
    },
};
</script>

<style></style>
