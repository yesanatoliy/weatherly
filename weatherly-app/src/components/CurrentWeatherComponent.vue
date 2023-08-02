<template>
    <v-fade-transition>

        <v-card class="transparentCard pt-16 pb-8 text-left pl-16" v-if="locationStore.currentWeather">
            <v-card-title class="text-left text-h2">{{ locationStore.currentWeather.name }}</v-card-title>
            <!-- Down below we are binding the img src through a method 
            in the Location Store that makes an API call. 
            The function takes in an icon argument and we are
            retrieving that icon arg from our first API call, 
            which populates our current weather
            data when this component is mounted. -->
            <img :src="locationStore.generateIconUrl(
                locationStore.currentWeather.weather[0].icon)" 
            />
            <v-card-title class="text-h4">{{ locationStore.currentWeather.main.temp }}&deg;F</v-card-title>
            <v-card-subtitle>{{ locationStore.currentWeather.weather[0].description }}</v-card-subtitle>
            <v-card-text>H:{{ locationStore.currentWeather.main.temp_max }}&deg;F <v-divider color="white" thickness="10" vertical></v-divider> L:{{ locationStore.currentWeather.main.temp_min }}&deg;F</v-card-text>
        </v-card>
        <v-card color="red-accent-4" class="pt-8 pb-8 text-center pl-16 ma-10" v-else loading 
        title="Please allow access to your location or use the Search bar.">
        </v-card>
    </v-fade-transition>
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

<style scoped>
img{
    margin-left: 0;
    display: block;
    width: 8%
}
.transparentCard{
    color: white;
    background-color: transparent;
    box-shadow: none;
    margin-left: 16%
}

</style>