<template>
    <v-sheet v-if="locationStore.dailyWeather.length > 0" class="customColor2" >
        <h2>5-day forecast</h2>
        <v-sheet color="transparent" class="d-inline-flex justify-space-evenly w-100 h-100 mt-10">
            <v-card class="customColor flex-column justify-center" v-for="(day, index) in locationStore.dailyWeather" 
            :key="index">
                <v-card-title>{{ unixConverter(day.dt)[1] }}</v-card-title>
                <v-card-item>{{ unixConverter(day.dt)[0] }}</v-card-item>
                <!-- Down below we are binding the img src through a method 
                in the Location Store that makes an API call. 
                The function takes in an icon argument and we are
                retrieving that icon arg from our first API call, 
                which populates our current weather
                data when this component is mounted. -->
                <img :src="locationStore.generateIconUrl(
                    day.weather[0].icon)" 
                />
                <v-card-text>{{ day.weather[0].description }}</v-card-text>
                <v-card-text>{{ day.main.temp }}&deg;F</v-card-text>
            </v-card>
        </v-sheet>
    </v-sheet>
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

<style scoped>
    .customColor{
        background-color: rgba(0, 0, 0, 0.4);
        color: white;
        text-align: center;
    }
    .customColor2{
        background-color: #01589b69;
        padding-top: 25px;
        padding-bottom: 35px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 10%;
        width: 70%;
        border: 1px solid #7272721d;
        box-shadow: 2px 4px 4px 2px rgba(0, 0, 0, 0.19);
        border-radius: 10px
    }
    h2{
        color: white;
    }
</style>