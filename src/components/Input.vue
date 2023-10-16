<script setup lang="ts">
defineProps<{
  placeholder: string;
  labelContent: string;
  modelValue: string;
  type: string;
}>();
</script>

<template>
  <div>
    <label for="">{{ labelContent }}</label>
    <input class="input-contact" :type="type" :placeholder="placeholder" :value="modelValue" @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
  </div>
</template>
<style scoped>
.input-contact {
  padding: 7px;
  margin-left: 10px;
  border: solid 1px #2B4573;
  color: #2B4573;
}
</style>
