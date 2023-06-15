<script setup lang="ts">
import Button from "./Button.vue";
import Input from "./Input.vue";
import { ref } from "vue";

const username = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");

const createAccount = () => {
  console.log("champs :", username.value, email.value, password.value);
  const userData = {
    username: username.value,
    email: email.value,
    password: password.value,
  };

  fetch("http://localhost:5027/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Compte utilisateur créé avec succès");
      } else {
        console.log("Erreur lors de la création du compte utilisateur");
      }
    })
    .catch((error) => {
      console.log("Erreur :", error);
    });
};
</script>

<template>
  <form class="contact-form center-form" @submit.prevent="">
    <h1>Créez votre compte</h1>
    <div class="form-input">
      <Input
        v-model="username"
        :placeholder="'Username'"
        :label-content="'Username'"
      />
    </div>
    <div class="form-input">
      <Input v-model="email" :placeholder="'email'" :label-content="'Email'" />
    </div>

    <Input
      v-model="password"
      :placeholder="'password'"
      :label-content="'Mot de passe'"
    />
    <Button :name="'Créer compte'" @click="createAccount"></Button>
  </form>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Didact+Gothic&family=Pacifico&display=swap");

form {
  font-family: "Didact Gothic", sans-serif;
  width: 700px;
  border: 1px solid #ccc;
  padding: 20px;
  box-sizing: border-box;
}

.contact-form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.center-form {
  margin: 0 auto;
}

.form-input {
  margin-bottom: 20px;
}
</style>
