<script setup lang="ts">
defineProps<{
    placeholder: string
    labelContent: string

}>()
</script>

<template>
    <div>
        <label for="firstname">{{ labelContent }}</label>
        <input class="input-contact" type="text" :placeholder="placeholder">
    </div>
</template>