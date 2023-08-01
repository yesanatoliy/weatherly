import { defineStore } from 'pinia'

export const useLocationStore = defineStore('LocationStore', {
    state: () => ({
        dailyWeather: [],
        currentWeather: null
    }),
    
})