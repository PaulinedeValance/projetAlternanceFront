<script setup lang="ts">
defineProps<{

    name: string
}>()

</script>

<template>
    <div>
        <button @click="">{{ name }}</button>
    </div>
</template>