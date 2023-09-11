<script setup lang="ts">
import router from "@/router";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import type { Games } from "@/types";
import { useUserStore } from "@/stores/userState";
import { onMounted, ref } from "vue";
import GameCard from "../components/GameCard.vue"


const store = useUserStore();
const games = ref<Games[]>([]);


const fetchGames = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/games", {
      credentials: "include",
    });
    games.value = await response.json();

  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await fetchGames();

})

const isDropdownOpen = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

//console.log('store.username:', store.username);


const logout = () => {
  // Appel à l'API de déconnexion
  fetch('"http://localhost:5000/api/logout"', {
    method: 'GET',
  })
    .then(response => {
      if (response.ok) {
        // Déconnexion réussie, utilisez router.push pour la redirection
        router.push('/'); // On redirige vers la page d'accueil
      } else {
        // En cas d'erreur
        console.error('Échec de la déconnexion');
      }
    })
    .catch(error => {
      console.error('Erreur lors de la déconnexion', error);
    });
};

</script>

<template>
  <DashboardLayout>
    <div class="dashboard-container">
      <p class="welcome-title">Bienvenue sur le site de la Ruche Ludique, {{ store.username }}</p>
      <div class="dashboard-dropdown" @click="toggleDropdown">
        <div class="dashboard-avatar">
          <p>{{ store.username.charAt(0).toUpperCase() }}</p>


        </div>
        <div v-if="isDropdownOpen" class="dropdown-content">
          <p>Bonjour, {{ store.username }} !</p>
          <button @click="logout">Déconnexion</button>
        </div>
      </div>
    </div>

    <div class="page-container">
      <div>
        <div class="game-container">
          <GameCard v-for="game in games" :key="game._id" :game="game" :displayTrashIcon="false" :displayHeartIcon="true"
            :displayPlusIcon="true" />
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bellota+Text:wght@700&family=Cabin+Sketch:wght@700&family=Didact+Gothic&family=Handlee&family=Londrina+Shadow&family=Pacifico&family=Patrick+Hand+SC&family=Rampart+One&family=Sue+Ellen+Francisco&display=swap');

.welcome-title {
  font-family: 'Patrick Hand SC', cursive;
  margin: 6px 10px 0 auto;
  font-size: 32px;
}

.page-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-top: 20px;
  margin-left: 270px;
}

.dashboard-container {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  color: #218e76ce;
}

.dashboard-avatar {
  width: 39px;
  height: 39px;
  border-radius: 50%;
  background-color: #218e76ce;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #fff;
  margin-right: 10px;
  margin-top: 10px;
  cursor: pointer;
}
</style>
