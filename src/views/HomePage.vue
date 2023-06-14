<script setup lang="ts">
import Slider from "@/components/Slider.vue";
import Button from "../components/Button.vue";
import Modal from "../components/Modal.vue";
import { ref } from "vue";

const showModal = ref(false);

const openModal = () => {
  console.log("Open Modal");
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};
</script>

<template>
  <h1>Page d'accueil</h1>
  <Button :name="'Accèder à la ludothèque'" @click="openModal"></Button>

  <div class="modal-container">
    <Modal :isOpen="showModal" @close="closeModal">
      <div class="modal-content">
        <button @click="closeModal" class="close-button-modale">X</button>
        <!-- <Button :name="'X'" @click="closeModal" class="custom-button"></Button> -->
        <h2>Connexion</h2>
        <form class="login-form">
          <div class="form-group">
            <input type="email" placeholder="Email" v-model="email" />
          </div>

          <div class="form-group">
            <input
              type="password"
              placeholder="Mot de passe"
              v-model="password"
            />
          </div>

          <div class="form-group">
            <label for="remember">
              <input type="checkbox" id="remember" v-model="remember" />
              Se souvenir de moi
            </label>
          </div>

          <div class="form-group">
            <a href="#">Mot de passe oublié</a>
          </div>

          <button class="custom-button" @click="login">Se connecter</button>
        </form>
      </div>
    </Modal>
  </div>

  <Slider />
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap");

.modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.close-button-modale {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  font-size: 22px;
  font-weight: bold;
  background-color: transparent;
  border: none;
  color: #00000094;
  cursor: pointer;
  transition: background-color 0.3s;
}

.modal-content {
  background-color: #fefefe;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid black;
  width: 570px;
  height: 360px;
  position: relative;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
  margin-top: 20px;
}

.form-group {
  display: flex;
  /* flex-direction: column; */
  align-items: center;
}

label {
  font-weight: bold;
}

input[type="email"],
input[type="password"],
input[type="checkbox"] {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

a {
  text-decoration: underline;
}

/* .close-button-modale:focus {
	outline: solid 0 transparent;
	box-shadow: 0 0 0 2px #a9afb3
}

.close-button-modale:hover {
  background: rgba(29, 161, 142, .1)
} */
</style>
