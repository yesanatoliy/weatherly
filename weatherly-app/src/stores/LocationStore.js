import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';
const API_KEY = process.env.VUE_APP_WEATHER_KEY;
export const useLocationStore = defineStore('LocationStore', () => {
    const currentWeather = ref(null);
    const dailyWeather = ref([]);
    // Method for getting the current weather from the OpenWeather
    const getCurrentWeather = async (coords) => {
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}&units=imperial`);
        currentWeather.value = res.data;
    };
    return { currentWeather, dailyWeather, getCurrentWeather };
});
//# sourceMappingURL=LocationStore.js.map