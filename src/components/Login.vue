<script setup lang="ts">

const emits = defineEmits(['close']);

const closeModal = () => {
    emits('close');
};
</script>
