<template>
    <div v-if="locationStore.currentWeather">
        <p>{{ locationStore.currentWeather }}</p>
    </div>
    <div v-else>
        hi
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