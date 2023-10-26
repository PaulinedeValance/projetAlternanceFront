<script setup lang="ts">
import Footer from '@/components/Footer.vue';
import Slider from "@/components/Slider.vue";
import Button from "../components/Button.vue";
import NavBarHomepage from "../components/NavBarHomepage.vue"
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
  <div class="homepage-container">
    <div class="homepage-content">
      <div class="color-block">
        <div class="homepage-bloc">

          <h1>Bienvenue sur La Ruche Ludique</h1>
          <p class="text-homepage">
            L' Application Web pour vos jeux de société Simple, intuitive,
            performante, multi-support, collaborative et GRATUITE ! Connectez-vous ou
            créez un compte pour commencer.
          </p>
          <Button :name="'Se connecter à la ludothèque'" @click="openModal"></Button>
        </div>
        <div class="mobile-content">
          <p>... Et pleins d'autres jeux à ajouter</p>
          <img src="/images/ark-nova.jpg" alt="Image 1" />
        </div>
      </div>
    </div>
    <NavBarHomepage />
  </div>
  <img src="/images/shape2.png" class="shape1-background" alt="forme verte" />
  <Modal v-model="showModal">

    <Login @close="showModal = false" />

    <div class="modal-content">
      <button @click="closeModal" class="close-button-modale">X</button>
      <h2 class="connexion-title">Connexion</h2>
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

.homepage-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.homepage-container {
  position: relative;
  background-image: url('/images/blob-bg.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.homepage-bloc {
  position: relative;
  z-index: 1;
}

.shape1-background {
  position: absolute;
  top: -156px;
  left: -100px;
  z-index: 0;
  object-fit: cover;
  object-position: top;
  width: 40%;
}

.navbar {
  margin-left: 0;
}

.homepage-bloc {
  margin-left: 20px;
}

h1 {
  color: whitesmoke;
  font-size: 28px;
}

.connexion-title {
  color: #2B4573;
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
  color: #2B4573;
}

input {
  border: solid 1px #2B4573;
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
  width: 400px;
  font-size: 18px;
  color: whitesmoke;
}

.mobile-content {
  display: none;
}


@media (max-width: 1329px) {

  h1 {
    color: #113a74;
    margin-top: 20px;
    padding-top: 20px;
  }

  .homepage-container {
    display: flex;
    flex-direction: column-reverse;
    background: none;
  }

  .color-block {
    background-color: #FBAE3C;
    height: 280px;
    width: 100%;
    margin-top: 40px;
  }

  .homepage-bloc {
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-left: 0px;
    padding-top: 1px;
  }

  .text-homepage {
    width: auto;
    font-size: 18px;
    color: #113a74;

  }

  .shape1-background {
    display: none;
  }

  .nav-link {
    display: none;
  }

  .text-container {
    margin-top: 20px;
  }

  .text-homepage {
    font-size: 17px;
    margin-left: 15px;
    margin-right: 15px;
  }

  .mobile-content {
    display: block;
    text-align: center;

  }

  .mobile-content img {
    max-width: 100%;
    margin-bottom: 100px;
    margin-top: 20px;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1280px) {
  .text-homepage {
    font-size: 25px;
  }

  .mobile-content {
    font-size: 27px;
  }

  .modal-content {
    width: 320px;
    height: 370px;
    font-size: 27px;
  }

  .connexion-title {
    font-size: 33px;
    text-align: center;
  }

  .form-group {
    text-align: center;
  }

}
</style>
