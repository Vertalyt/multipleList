<template>
  <div class="container mx-auto flex flex-col items-center bg-gray-100 p-4">
    <div v-if="itemsList">
      <label for="starwars">
        <input type="text" v-model.lazy ="searchModel" />
      </label>
    </div>

    <div v-if="itemsList">
      <slot name="list" :item="itemsList" />
    </div>
    <div>
      <button
        v-if="currentPage > 1"
        @click="currentPage = currentPage - 1"
        class="my-4 mx-2 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        Назад
      </button>
      {{ currentPage }}
      <button
        v-if="hasNextPage"
        @click="currentPage = currentPage + 1"
        class="my-4 mx-2 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        Вперед
      </button>
    </div>
    <AppLoading v-if="isLoading" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import AppLoading from './AppLoading.vue'
import { fetchPostsData } from '../api/fetchApi'

const props = defineProps({
  urlFlag: {
    type: String
  }
})

const isLoading = ref(false)
const itemsList = ref([])
const currentPage = ref(1)
const searchModel = ref(null)

function savePathname(page) {
      window.history.pushState(
        null,
        document.title,
        `${window.location.pathname}?page=${page}`
      )
  }

onMounted(async () => {
  isLoading.value = true
  const windowData = Object.fromEntries(new URL(window.location).searchParams.entries());
    if (windowData.page && !isNaN(Number(windowData.page))) {
        currentPage.value = Number(windowData.page);
        currentPage.value = currentPage.value > 6 ? 1 : currentPage.value;
    }

  await fetchPostsData({
    page: currentPage.value,
    search: searchModel.value,
    url: props.urlFlag,
  }).then((res) => {
    itemsList.value = res
  })
  isLoading.value = false
})

watch(currentPage, async (val) => {
  isLoading.value = true
  await fetchPostsData({
    page: val,
    search: searchModel.value,
    url: props.urlFlag,
  }).then((res) => {
    itemsList.value = res
  })
  savePathname(val)
  isLoading.value = false
})

watch(searchModel, async (val) => {
  isLoading.value = true
    currentPage.value = 1
    await fetchPostsData(
      {
      page: currentPage.value, 
      search: val,
      url: props.urlFlag,
    }
    ).then((res) => {
      itemsList.value = res
  } )
  savePathname(currentPage.value)
  isLoading.value = false
})


const hasNextPage = () => {
  if (itemsList.value.length) return true
}

// eslint-disable-next-line no-unused-vars
const components = {
  AppLoading
}
</script>

<script>
export default {
  name: 'AppListComponents'
}
</script>
