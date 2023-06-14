<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  isOpen: boolean
}>()

</script>

<template>
  <div class="modale" v-if="isOpen" @close="">
   
    <slot></slot>
  </div>

</template>

<style scoped>
.modale {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
</style>