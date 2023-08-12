<template>

  <div class="container mx-auto flex flex-col items-center bg-gray-100 p-4">
  
  <select name="categories" class="select-text" v-model="listModel">
  <option key="techCrunch" value="techCrunch" >TechCrunch</option>
  <option key="starwars" value="starwars" >StarWars</option>
  </select>
  </div>
  
  <AppListComponents v-if="listModel === 'techCrunch'" urlFlag="techCrunch">
    <template #list="{ item }">
        <TechCrunchSlot :item="item" />
    </template>
  </AppListComponents>
  
  
  <AppListComponents v-if="listModel === 'starwars'" urlFlag="starwars">
    <template #list="{ item }">
        <StarWarsSlot :item="item" />
    </template>
  </AppListComponents>
  
  </template>
  
  <script setup>
  
  import AppListComponents from './components/AppListComponents.vue';
  import { ref } from 'vue'
  import StarWarsSlot from './components/use/StarWarsSlot.vue';
  import TechCrunchSlot from './components/use/TechCrunchSlot.vue';
  
  const listModel = ref('starwars')
  
  // eslint-disable-next-line no-unused-vars
  const components = {
    AppListComponents,
    StarWarsSlot,
    TechCrunchSlot
  }
  </script>
  
  <style src="./assets/app.css" scoped></style>