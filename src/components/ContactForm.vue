<script setup lang="ts">
import Button from './Button.vue'
import Input from './Input.vue'
import Footer from "@/components/Footer.vue";

</script>

<template>
    <form class="contact-form" @submit.prevent="">
        <h1>Contactez nous</h1>
        <div class="form-input">
            <Input :type="'text'" :placeholder="'Nom de famille'" :labelContent="''" :modelValue="''" />
            <label class="sr-only">Nom de famille</label>
        </div>
        <div class="form-input">
            <Input :type="'text'" :placeholder="'Prénom'" :labelContent="''" :modelValue="''" />
            <label class="sr-only">Prénom</label>
        </div>
        <div class="form-input">
            <Input :type="'text'" :placeholder="'email'" :labelContent="''" :modelValue="''" />
            <label class="sr-only">Email</label>
        </div>
        <div class="form-input">
            <textarea type="email" placeholder="Message"></textarea>
        </div>

        <Button :name="'Envoyer'"></Button>

    </form>
    <Footer />
</template>

<style scoped>
form {
    width: 450px;
    border: 1px solid #ccc;
    padding: 20px;
    box-sizing: border-box;
}

.contact-form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 1vh auto 0;
    border-radius: 10px;
    box-shadow: 5px 5px 15px -1px rgba(0, 0, 0, 0.75);

}

.form-input {
    margin-bottom: 20px;


}

textarea {
    width: 100%;
    height: 100px;
}

@media (max-width: 767px) {
    .contact-form {
        width: 100%;
        border: none;
        box-shadow: none;
        padding: 0;
        border-radius: 0;
        margin-top: 50px;
    }
}
</style>