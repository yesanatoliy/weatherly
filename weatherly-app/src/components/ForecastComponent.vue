<template>
    <div v-for="(day, index) in locationStore.dailyWeather" 
    :key="index">
        
        <!-- Down below we are binding the img src through a method 
        in the Location Store that makes an API call. 
        The function takes in an icon argument and we are
        retrieving that icon arg from our first API call, 
        which populates our current weather
        data when this component is mounted. -->
        <img :src="locationStore.generateIconUrl(
            day.weather[0].icon)" 
        />
        <p>{{ day.main.temp }}&deg;F</p>
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