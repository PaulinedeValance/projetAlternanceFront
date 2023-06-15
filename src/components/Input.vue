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
    <label for="firstname">{{ labelContent }}</label>
    <input
      class="input-contact"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
  </div>
</template>
