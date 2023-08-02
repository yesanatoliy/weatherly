<template>
    <div>
        <form @submit="locationStore.getCityInfo">
            <input :value="locationStore.searchBar" type="text" @change="handleChange">
            <button>Search</button>
        </form>
    </div>
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

<style>

</style>