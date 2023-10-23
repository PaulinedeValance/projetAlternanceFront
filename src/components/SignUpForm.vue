<script setup lang="ts">
import Button from "./Button.vue";
import Input from "./Input.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const username = ref<string>("");
const email = ref<string>("");
const emailError = ref<string>('');
const password = ref<string>("");
const passwordRepeat = ref<string>("");
const passwordError = ref<string>("");
const showPassword = ref(false);
const router = useRouter();

const validateEmail = () => {
  // Regex pour vérifier le format de l'email
  const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // On vérifie si la valeur de l'e-mail match la regex
  const isValid = emailValidation.test(email.value);
  emailError.value = isValid ? '' : "L'e-mail n'est pas valide.";
  return isValid;
};

const validatePassword = () => {
  if (password.value.length < 8) {
    passwordError.value = "Password must be at least 8 characters long.";
    return false;
  } else {
    passwordError.value = "";
    return true;
  }
};


const createAccount = () => {
  const isEmailValid = validateEmail();

  if (!isEmailValid) {
    // Si l'e-mail n'est pas valide, je ne fais pas la redirection
    return;
  }

  const isPasswordValid = validatePassword();

  if (!isPasswordValid || password.value !== passwordRepeat.value) {
    passwordError.value = "Le mot de passe doit contenir minimum 8 caractères";
    return;
  }

  if (password.value !== passwordRepeat.value) {
    passwordError.value = "Les deux mots de passe ne correspondent pas.";
    return;
  }

  const userData = {
    username: username.value,
    email: email.value,
    password: password.value,
  };

  fetch("http://localhost:5000/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (response.ok) {
        router.push({ name: "home" });
      }
    })
    .catch((error) => {
      console.log("Erreur :", error);
    });
};
</script>

<template>
  <form class="contact-form" @submit.prevent="">
    <h1>Créez votre compte</h1>
    <div class="form-input">
      <Input v-model="username" :placeholder="'Username'" :label-content="'Username'" :type="'text'" />
    </div>
    <div class="form-input">
      <Input v-model="email" placeholder="Email" labelContent="E-mail" type="email" @blur="validateEmail" />
      <div v-if="emailError" class="error-message">{{ emailError }}</div>
    </div>
    <div class="form-input">
      <div class="password-input-wrapper">
        <Input v-model="password" :placeholder="'password'" :label-content="'Mot de passe'"
          :type="showPassword ? 'text' : 'password'" />
        <span @click="showPassword = !showPassword">
          <font-awesome-icon :icon="showPassword ? 'eye-slash' : 'eye'" class="password-toggle-icon" />
        </span>
      </div>
    </div>
    <div class="form-input">
      <div class="password-input-wrapper">
        <Input v-model="passwordRepeat" :placeholder="'password'" :label-content="'Répéter le mot de passe'"
          :type="showPassword ? 'text' : 'password'" />
        <span @click="showPassword = !showPassword">
          <font-awesome-icon :icon="showPassword ? 'eye-slash' : 'eye'" class="password-toggle-icon" />
        </span>
      </div>
    </div>
    <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
    <Button :name="'Créer compte'" @click="createAccount"></Button>
  </form>
</template>

<style scoped>
form {
  width: 550px;
  border: 1px solid #ccc;
  padding: 20px;
  box-sizing: border-box;
}

.contact-form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 4vh auto 0;
  border-radius: 10px;
  box-shadow: 5px 5px 15px -1px rgba(0, 0, 0, 0.75);
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

.error-message {
  color: crimson;
  font-weight: bold;
  font-size: 18px;
  margin-top: 5px;
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
