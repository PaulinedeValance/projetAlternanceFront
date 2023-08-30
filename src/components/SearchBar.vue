<script setup lang="ts">
import { ref } from 'vue';

const searchQuery = ref('');

const search = () => {

};
</script>

<template>
  <div>
    <input v-model="searchQuery" @input="search" type="text" placeholder="Rechercher..." />
    <button @click="search">Rechercher</button>
  </div>
</template>