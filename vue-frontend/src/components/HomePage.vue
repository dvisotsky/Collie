<template>
    <div class="container">
        <h1>Collie</h1>
        <h3>Groups</h3>

        <a href="/groups/create">Create Group</a>
        <ul id="groupList"></ul>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const groups = ref<Group[]>([])

onMounted(async () => {
    await fetchGroups()
})

async function fetchGroups() {
    try {
        const response = await fetch('http://localhost:8000/groups')
        const data = await response.json()
        groups.value = data
    } catch (error) {
        console.error(error)
    }
}
</script>