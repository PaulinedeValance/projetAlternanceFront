<script setup lang="ts">
import Footer from '@/components/Footer.vue';
import Slider from "@/components/Slider.vue";
import Button from "../components/Button.vue";
import Navbar from "../components/NavBar.vue"
import Input from "../components/Input.vue";
import Modal from "../components/Modal.vue";
import Login from "../components/Login.vue"
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userState";

const router = useRouter();
const showModal = ref(false);
const email = ref<string>("toto@free.fr");
const password = ref<string>("toto");

const store = useUserStore();

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const login = async () => {

  try {
    const response = await fetch("http://localhost:5000/api/login/user", {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        username: email.value,
        password: password.value,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (response.ok) {

      const userData = (await response.json()).user
      store.setUser({ email: userData.email, username: userData.username, id: userData._id })

      router.push({ name: "dashboard" });
    } else {
      console.log("la réponse n'est pas ok");

    }
  } catch (error) {
    console.log("Erreur lors de la connexion :", error);
  }
};
</script>

<template>
  <Navbar />


  <div class="homepage-bloc">
    <h1>Bienvenue sur La Ruche Ludique</h1>
    <p class="text-homepage">
      L' Application Web pour vos jeux de société Simple, intuitive,
      performante, multi-support, collaborative et GRATUITE ! Connectez-vous ou
      créez un compte pour commencer.
    </p>
    <Button :name="'Se connecter à la ludothèque'" @click="openModal"></Button>
  </div>

  <img src="images/test.svg" alt="Shape" />

  <Modal v-model="showModal">

    <Login @close="showModal = false" />

    <div class="modal-content">
      <button @click="closeModal" class="close-button-modale">X</button>
      <!-- <Button :name="'X'" @click="closeModal" class="custom-button"></Button> -->
      <h2>Connexion</h2>
      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <Input :type="'text'" placeholder="Email" v-model="email" :label-content="'Email/Pseudo'" />
        </div>

        <div class="form-group">
          <Input :type="'password'" placeholder="Mot de passe" v-model="password" :label-content="'Mot de passe'" />
        </div>
        <button class="custom-button">Se connecter</button>
      </form>
    </div>
  </Modal>

  <Slider />
  <Footer />
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bellota+Text:wght@700&family=Cabin+Sketch:wght@700&family=Handlee&family=Pacifico&family=Patrick+Hand+SC&family=Sue+Ellen+Francisco&display=swap');

.homepage-bloc {
  margin-left: 30px;
}

.modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.close-button-modale {
  font-size: 19px;
  color: #26517d;
  position: absolute;
  border: none;
  background: none;
  position: absolute;
  top: 15px;
  right: 10px;
  transition: ease filter, transform 0.3s;
  cursor: pointer;
  transform-origin: center;
}

.modal-content {
  position: relative;
  padding: 1rem 3rem;
  background: white;
  max-width: 400px;
  height: 250px;
  border-radius: 20px;
  border: 2px solid #26517d;
  box-shadow: 0 5px 30px 0 rgba(167, 97, 97, 0.1);
  animation: fadeIn 1s ease both;
  font-family: 'Bellota Text', cursive;

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

.text-homepage {
  width: 500px;
}

/* .close-button-modale:focus {
	outline: solid 0 transparent;
	box-shadow: 0 0 0 2px #a9afb3
}

.close-button-modale:hover {
  background: rgba(29, 161, 142, .1)
} */
</style>
