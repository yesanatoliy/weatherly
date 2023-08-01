<template>
    <div v-if="locationStore.currentWeather">
        <p>{{ locationStore.currentWeather }}</p>
        <h3>{{ locationStore.currentWeather.name }}</h3>
        <!-- Down below we are binding the img src through a method 
        in the Location Store that makes an API call. 
        The function takes in an icon argument and we are
        retrieving that icon arg from our first API call, 
        which populates our current weather
        data when this component is mounted. -->
        <img :src="locationStore.generateIconUrl(
            locationStore.currentWeather.weather[0].icon)" 
        />
        <p>{{ locationStore.currentWeather.main.temp }}&deg;F</p>
        <p>{{ locationStore.currentWeather.weather[0].description }}</p>
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