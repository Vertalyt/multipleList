
<template>
      <ul class="list-disc">
        <li v-for="p in item" :key="p.id">
          <a target="_blank" :href="p.guid.rendered">{{ p.title.rendered }}</a>
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
  name: 'TechCrunchSlot',
}
</script>

