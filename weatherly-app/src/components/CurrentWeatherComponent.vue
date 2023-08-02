<template>
    <v-card class="w-25" v-if="locationStore.currentWeather">
        <v-card-title>{{ locationStore.currentWeather.name }}</v-card-title>
        <!-- Down below we are binding the img src through a method 
        in the Location Store that makes an API call. 
        The function takes in an icon argument and we are
        retrieving that icon arg from our first API call, 
        which populates our current weather
        data when this component is mounted. -->
        <img :src="locationStore.generateIconUrl(
            locationStore.currentWeather.weather[0].icon)" 
        />
        <v-card-text>{{ locationStore.currentWeather.main.temp }}&deg;F</v-card-text>
        <v-card-subtitle>{{ locationStore.currentWeather.weather[0].description }}</v-card-subtitle>
    </v-card>
    <v-card class="w-50 h-auto" v-else loading 
    title="Please allow access to your location or type in the Search bar.">
    </v-card>
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