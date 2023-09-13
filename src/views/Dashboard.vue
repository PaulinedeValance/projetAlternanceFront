<script setup lang="ts">
import router from "@/router";
import type { UserInfo } from '@/types';
import DashboardLayout from "../layouts/DashboardLayout.vue";
import SearchBar from "@/components/SearchBar.vue";
import type { Games } from "@/types";
import { useUserStore } from "@/stores/userState";
import { onMounted, ref } from "vue";
import GameCard from "../components/GameCard.vue"

const store = useUserStore();
const allGames = ref<Games[]>([]);
const filteredGames = ref<Games[]>([]);

const fetchGames = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/games", {
      credentials: "include",
    });
    allGames.value = await response.json();

    filteredGames.value = allGames.value;

  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await fetchGames();

})


const userStore = useUserStore(); // Instance du store

// Je récupère les autres informations de l'utilisateur à partir du local storage
const storedUserId = localStorage.getItem('userId');

// Je crée un objet userInfo en utilisant les valeurs récupérées dans le local storage
const storedUserInfo: UserInfo = {
  id: storedUserId || '', // string vide  par défaut si id n'est pas présent
  email: localStorage.getItem('userEmail') || '', // string vide  par défaut si email n'est pas présent
  username: localStorage.getItem('userName') || '',
};


if (storedUserId) {
  // Je mets à jour le store avec les informations de l'utilisateur
  userStore.setUser({
    id: storedUserId,
    email: storedUserInfo.email,
    username: storedUserInfo.username,
  });
}

const isDropdownOpen = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const logout = () => {
  // Appel à l'API de déconnexion
  fetch('"http://localhost:5000/api/logout"', {
    method: 'GET',
  })
    .then(response => {
      if (response.ok) {
        // Déconnexion réussie, j'utilise router.push pour la redirection
        router.push('/'); // Redirection vers la page d'accueil
      } else {
        // En cas d'erreur
        console.error('Échec de la déconnexion');
      }
    })
    .catch(error => {
      console.error('Erreur lors de la déconnexion', error);
    });
};

const handleSearch = (searchQuery: string) => {
  if (!searchQuery) {
    // Si la recherche est vide, ça affiche tous les jeux depuis allGames
    filteredGames.value = allGames.value;
  } else {
    // Je filtre les jeux en fonction de la recherche dans allGames
    filteredGames.value = allGames.value.filter(game =>
      game.nom.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  }
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
          <p>Bonjour, {{ store.username }}</p>
          <button @click="logout">Déconnexion</button>
        </div>
      </div>
    </div>
    <div class="search-bar-container">
      <SearchBar v-on:search="handleSearch" />
    </div>
    <div class="page-container">
      <GameCard v-for="game in filteredGames" :key="game._id" :game="game" :displayTrashIcon="false"
        :displayHeartIcon="true" :displayPlusIcon="true" />
    </div>
  </DashboardLayout>
</template>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bellota+Text:wght@700&family=Cabin+Sketch:wght@700&family=Didact+Gothic&family=Handlee&family=Londrina+Shadow&family=Pacifico&family=Patrick+Hand+SC&family=Rampart+One&family=Sue+Ellen+Francisco&display=swap');

.search {
  display: flex;
  justify-content: center;
  /* Centrez horizontalement */
  align-items: center;
  /* Centrez verticalement */

}

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

.search-bar-container {
  display: flex;
  justify-content: center;
}
</style>
