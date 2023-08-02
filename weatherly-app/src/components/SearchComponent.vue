<template>
    <header>
        <h1>Weatherly</h1>
        <v-form class="d-flex justify-end" @submit="locationStore.getCityInfo">
            <input :value="locationStore.searchBar" type="text" @change="handleChange" placeholder="Search a city..">
            <button>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Blue_magnifying_glass_icon.svg/834px-Blue_magnifying_glass_icon.svg.png" alt="">
            </button>
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
    padding: 0 10px;
    font-size: 20px;
    width: 30%;
    border-radius: 10px;
    transition: width 0.4s ease-in-out;
 }
 input:focus{
    width:50%;
 }
 header{
    background-color: rgba(0, 0, 0, 0.399);
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 1%;
    align-items: center
 }
 h1{
    color: white;
 }
 img{
    width: 30%;
    padding-top: 5%;
 }
 button{
    width: 10%
 }

</style>