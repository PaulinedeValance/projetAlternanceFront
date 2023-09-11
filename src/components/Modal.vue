<script setup lang="ts">
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core'

defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])
const content = ref(null)
onClickOutside(content, (event) => emits('update:modelValue', false))

</script>

<template>
  <Transition name="modal">

    <div class="modale" v-if="modelValue">

      <div ref="content">
        <slot></slot>

      </div>

    </div>
  </Transition>
</template>

<style scoped>
.modale {
  display: flex;
  width: 100%;
  height: 100%;
  top: 0;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 9999;
  backdrop-filter: blur(1px);
  background-color: #00000040;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>