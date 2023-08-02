import { defineStore } from 'pinia'
import axios from 'axios'


const API_KEY = process.env.VUE_APP_WEATHER_KEY;

interface WeatherData {
  name: string,
  dt: number,
  main: {
    temp: number,
    temp_max: number,
    temp_min: number
  },
  weather: Array<{
    icon: string,
    id: number,
    description: string
  }>
}

interface CityData {
  name: string,
  lat: number,
  lon: number
}


export const useLocationStore = defineStore('LocationStore', {
  
  state: () => ({
    currentWeather: null as null | WeatherData,
    dailyWeather: [] as Array<WeatherData>,
    searchedWeather: null as null | WeatherData,
    searchedForecast: [] as Array<WeatherData>,
    searched: false,
    searchBar: '',
    city: null as null | CityData
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
        const forecast = res.data.list
        // Our data comes in an Array of 40 objects which represent the 5-day
        // forecast for every 3 hours. Since we only need the data for 5 days,
        // I organized it by using a for loop which uses an iterator to go through
        // the first forecast in the data array and then jump to the forecast 24hrs
        // after and repeat that 5 times in total to give us a 5-day forecast and
        // set our state to that. However, every time I save on VScode it runs
        // the for loop again because the forecast component is being mounted
        // which can become an issue if we have a multi-page application where
        // the forecast component is mounted on multiple pages. To prevent our
        // dailyWeather state from becoming too long and giving us repeating data
        // I put an if statement to ensure that the loop checks if the array is 
        // empty first. I also added the logical or operator so that the function
        // run if there is a new search, and I also cleared the dailyWeather array so it never
        // exceeds 5 elements which might be redundant I'm not sure.
        if (this.dailyWeather.length === 0 || this.searched === true) {
          this.dailyWeather = []
          for (let i = 0; i < 33; i += 8){
            this.dailyWeather.push(forecast[i])
          }
        }
    },
    // This handles our API call and our submit of our search bar
    async getCityInfo(e: Event) {
      e.preventDefault()
      const res = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${this.searchBar}&limit=1&appid=${API_KEY}`
      )
      this.city = res.data[0]
      this.searchBar = ''
      this.searched = true
      // Have to include this if statement so that the code will only run if the API call successfully
      // sets a city state.
      if (this.city) {
        const coords = {
          latitude: this.city.lat,
          longitude: this.city.lon,
        };
        this.getCurrentWeather(coords)
        this.getDailyWeather(coords)
      }
    },
    
  },
});
