<template>
    <div id="app">
        <nav-menu :key="$route.fullPath"></nav-menu>
        <router-view></router-view>
        <app-footer></app-footer>
    </div>
</template>

<script setup>
import NavMenu from "@/components/Navigation";
import AppFooter from "@/components/AppFooter";
</script>

<script>
export default {
    name: "app",
};
</script>

<style></style>
