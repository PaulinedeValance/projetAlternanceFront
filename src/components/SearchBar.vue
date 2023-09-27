<script setup lang="ts">
import { ref } from 'vue';

const searchQuery = ref('');

const emits = defineEmits(['search']);

const performSearch = () => {
  emits('search', searchQuery.value); // J'émets l'événement 'search' avec la valeur de searchQuery
};
</script>

<template>
  <div>
    <input class="search-bar" v-model="searchQuery" @input="performSearch" placeholder="Rechercher un jeu..." />
  </div>
</template>
<style>
.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #218e76ce;
  border-radius: 25px;
  padding: 5px;
  transition: all 0.2s;
  padding-left: 15px;
  margin-top: 15px;

}

.search-bar:focus {
  border: 4px solid #218e76ce;
  outline: none;
  color: #218e76ce;
}
</style>