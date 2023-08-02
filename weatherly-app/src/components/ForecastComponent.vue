<template>
    <div>
        forecast
    </div>
</template>

<script setup lang="ts">
    import { useLocationStore } from '../stores/LocationStore';
    import { onMounted } from 'vue'
    const locationStore = useLocationStore();
    onMounted(() =>
        navigator.geolocation.getCurrentPosition(async (position) => {
            await locationStore.getDailyWeather(position.coords)
        }))
</script>

<style>

</style>