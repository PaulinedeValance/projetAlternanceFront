<script setup lang="ts">
import Button from './Button.vue'
import Input from './Input.vue'

//const formData = ref()
</script>

<template>

    <form class="contact-form" @submit.prevent="">
        <fieldset>
            <h1>Contactez nous</h1>

            <Input :placeholder="'Nom de famille'" :label-content="'Nom'" />
            <Input :placeholder="'Prénom'" :label-content="'Prénom'" />
            <Input :placeholder="'email'" :label-content="'Email'" />
            <textarea type="email" placeholder="Message"></textarea>

            <Button :name="'Envoyer'"></Button>

        </fieldset>
    </form>

</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Didact+Gothic&family=Pacifico&display=swap');

form {
  font-family: 'Didact Gothic', sans-serif;
}
</style>