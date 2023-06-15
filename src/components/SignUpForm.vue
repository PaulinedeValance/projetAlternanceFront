<script setup lang="ts">
import Button from "./Button.vue";
import Input from "./Input.vue";
import { ref } from "vue";

const username = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");
const repeatPassword = ref<string>("");
const showPassword = ref(false);

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
        :type="'text'"
      />
    </div>
    <div class="form-input">
      <Input
        v-model="email"
        :placeholder="'email'"
        :label-content="'Email'"
        :type="'email'"
      />
    </div>
    <div class="form-input">
      <div class="password-input-wrapper">
        <Input
          v-model="password"
          :placeholder="'password'"
          :label-content="'Mot de passe'"
          :type="showPassword ? 'text' : 'password'"
        />
        <span @click="showPassword = !showPassword">
          <font-awesome-icon
            :icon="showPassword ? 'eye-slash' : 'eye'"
            class="password-toggle-icon"
          />
        </span>
      </div>
    </div>
    <div class="form-input">
      <div class="password-input-wrapper">
        <Input
          v-model="repeatPassword"
          :placeholder="'password'"
          :label-content="'Répéter le mot de passe'"
          :type="'password'"
        />
        <span @click="showPassword = !showPassword">
          <font-awesome-icon
            :icon="showPassword ? 'eye-slash' : 'eye'"
            class="password-toggle-icon"
          />
        </span>
      </div>
    </div>

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

.password-input-wrapper {
  position: relative;
}

.password-toggle-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
}
</style>
