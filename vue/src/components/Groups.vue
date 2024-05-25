<template>
    <div>
        <h1>Groups</h1>
        <ul>
            <!-- <li v-for="group in groups" :key="group.id">{{ group.name }}</li> -->
            <li>
              group one
            </li>
        </ul>
    </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const loading = ref(false)
const post = ref(null)
const error = ref(null)

// watch the params of the route to fetch the data again
watch(() => route, fetchData, { immediate: true })

async function fetchData() {
  error.value = post.value = null
  loading.value = true
  
  try {
    post.value = await fetch(process.env.DJANGO_SERVER + 'groups') 
    console.log(post.value)
  } catch (err) {
    error.value = err.toString()
  } finally {
    loading.value = false
  }
}
</script>

<style>
/* Add your custom styles here */
</style>