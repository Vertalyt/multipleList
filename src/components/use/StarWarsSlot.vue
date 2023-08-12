<template>
  <ul class="list-disc">
    <li v-for="p in item" :key="p.name">
      {{ p.name }}
    </li>
  </ul>
</template>

<script setup>
defineProps({
  item: {
    type: Object
  }
})
</script>

<script>
export default {
  name: 'StarWarsSlot'
}
</script>
