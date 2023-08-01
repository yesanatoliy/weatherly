import { defineStore } from 'pinia'
// import axios from 'axios'
import { ref } from 'vue'

export const useLocationStore = defineStore('LocationStore', () => {
    const currentWeather = ref(null)
    const dailyWeather = ref([])
    return { currentWeather, dailyWeather }
})