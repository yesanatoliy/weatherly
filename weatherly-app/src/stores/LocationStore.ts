import { defineStore } from 'pinia'
import axios from 'axios'
// import { onMounted } from 'vue';

const API_KEY = process.env.VUE_APP_WEATHER_KEY;


export const useLocationStore = defineStore('LocationStore', {
  state: () => ({
    currentWeather: null,
    dailyWeather: [],
  }),
  actions: {
    // Method to get the current weather data from OpenWeather API
    async getCurrentWeather(coords: any) {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}&units=imperial`
      );
      this.currentWeather = res.data
    },
    
  },
});
