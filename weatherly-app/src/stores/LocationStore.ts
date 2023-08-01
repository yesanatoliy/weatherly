import { defineStore } from 'pinia'
import axios from 'axios'
// import { onMounted } from 'vue';

const API_KEY = process.env.VUE_APP_WEATHER_KEY;


export const useLocationStore = defineStore('LocationStore', {
  state: () => ({
    currentWeather: null as null | {
        name: string,
        weather: Array<{
            icon:string,
            description: string,
        }>,
        main: {
            temp: number,
            temp_max: number,
            temp_min: number
        }
    },
    dailyWeather: [],
  }),
  actions: {
    // Method to get the current weather data from OpenWeather API
    async getCurrentWeather(coords: {longitude: number, latitude: number}) {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}&units=imperial`
      );
      this.currentWeather = res.data
    },
    // API call for fetching icons
    generateIconUrl(ico: string) {
        return `http://openweathermap.org/img/wn/${ico}@2x.png`
    },
    // Method to get forecast data from OpenWeather API
    async getDailyWeather(coords: {longitude: number, latitude: number} ){
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}&units=imperial`
          )
        this.dailyWeather = res.data.list
    }
  },
});
