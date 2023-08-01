<template>
    <div v-if="locationStore.currentWeather">
        <p>{{ locationStore.currentWeather }}</p>
        <h1>{{ locationStore.currentWeather.name }}</h1>
        <img :src="locationStore.generateIconUrl(
            locationStore.currentWeather.weather[0].icon)" />
    </div>
    <div v-else>
        Loading...
    </div>
</template>

<script setup lang="ts">
    import { useLocationStore } from '../stores/LocationStore';
    import { onMounted } from 'vue'
    const locationStore = useLocationStore();
    onMounted(() =>
        navigator.geolocation.getCurrentPosition(async (position) => {
            await locationStore.getCurrentWeather(position.coords)
        }))
</script>

<style></style>