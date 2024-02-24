<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useTaskStore } from "./stores/TaskStore";

const taskStore = useTaskStore();

onMounted(() => {
  taskStore.getTasks();
});

watch(taskStore, (old, now) => {
  console.log(now.isLoading);
});
</script>

<template>
  <header>
    <h1>Pinia Task</h1>
  </header>

  <main>
    <h1>Task List</h1>
    <div v-if="taskStore.isLoading">
      <h1>Loading Gan...</h1>
    </div>
    <div v-else>
      <div v-if="!taskStore.isError">
        <div v-for="task in taskStore.tasks" :key="task.id">
          <p>{{ task.title }}</p>
          <button @click="taskStore.deleteTask(task.id)">Delete</button>
          <button v-if="task.isFav" @click="taskStore.unFav(task.id)">
            Unfav
          </button>
          <button v-else @click="taskStore.doFav(task.id)">Dofav</button>
        </div>
        <h1>Task Fav</h1>
        <div v-for="task in taskStore.favs" :key="task.id">
          <p>{{ task.title }}</p>
        </div>
        <p>Fav count: {{ taskStore.favs.length }}</p>
        <hr>
        <button @click="taskStore.$reset">Reset Store</button>
      </div>
      <div v-else>
        <h1>{{ taskStore.error }}</h1>
      </div>
    </div>
  </main>
</template>

<style scoped>
header h1 {
  padding: 10px;
  background-color: yellow;
  text-align: center;
  color: black;
}

main {
  margin-top: 20px;
  padding: 20px;
}
</style>
