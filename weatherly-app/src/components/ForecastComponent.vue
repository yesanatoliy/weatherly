<template>
    <v-card class="" v-for="(day, index) in locationStore.dailyWeather" 
    :key="index">
        <!-- Down below we are binding the img src through a method 
        in the Location Store that makes an API call. 
        The function takes in an icon argument and we are
        retrieving that icon arg from our first API call, 
        which populates our current weather
        data when this component is mounted. -->
        <v-card-title>{{ unixConverter(day.dt)[1] }}</v-card-title>
        <v-card-item>{{ unixConverter(day.dt)[0] }}</v-card-item>
        <img :src="locationStore.generateIconUrl(
            day.weather[0].icon)" 
        />
        <v-card-text>{{ day.main.temp }}&deg;F</v-card-text>
        <v-card-text>{{ day.weather[0].description }}</v-card-text>
    </v-card>
</template>

<script setup lang="ts">
    import { useLocationStore } from '../stores/LocationStore';
    import { onMounted } from 'vue'
    
    const locationStore = useLocationStore();
    
    onMounted(() =>
        navigator.geolocation.getCurrentPosition(async (position) => {
            await locationStore.getDailyWeather(position.coords)
        }))
    
    const unixConverter = (unix: number) => {
        let rawDate = new Date(unix * 1000)
        // Had to look this object up, for some reason the .toLocaleTimeString method was not
        // returning the right time because it relies on the user's browser's settings
        // and apparently this way is more consistent. Still going to use the locale date string though.
        const formatter = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
        timeZone: 'UTC', // Specify the desired time zone (change it to your desired time zone)
        });
        const timeStamp = formatter.format(rawDate);
        let dateStamp = new Date(unix * 1000).toLocaleDateString("en-US")
       return [timeStamp, dateStamp]
    }
    
</script>

<style>

</style>