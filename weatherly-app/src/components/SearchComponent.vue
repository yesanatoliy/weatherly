<template>
    <header>
        <h1>Weatherly</h1>
        <v-form class="justify-center" @submit="locationStore.getCityInfo">
            <input :value="locationStore.searchBar" type="text" @change="handleChange" placeholder="Search a city..">
            <button><v-icon icon="mdi-magnify"></v-icon></button>
        </v-form>
    </header>
</template>

<script setup lang="ts">
    import { useLocationStore } from '../stores/LocationStore';
    // import { onMounted } from 'vue'
    
    const locationStore = useLocationStore();
    
    // onMounted(() => {

    // })
    // I put an explicit any here just because the Event type was not working
    const handleChange = (event: any) => {
        locationStore.searchBar = event.target.value
    }
    
</script>

<style scoped>
 input{
    background-color: white;
    color: black;
    padding: 3px;
    font-size: 18px;
    width: 60%;
    border-radius: 10px;
    transition: width 0.4s ease-in-out;
    margin-top: 2%;
 }
 input:focus{
    width:100%
 }
 header{
    background-color: rgba(0, 0, 0, 0.399);
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 1%;
 }
 h1{
    color: white;
 }
</style>