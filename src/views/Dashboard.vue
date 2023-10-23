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

const logout = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/logout", {
      method: 'GET',
    });

    if (response.ok) {
      // Je supprime les données du localStorage
      localStorage.removeItem('userId');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');

      // Redirection du user vers la page d'accueil
      router.push('/');
    } else {
      console.error('Échec de la déconnexion');
    }
  } catch (error) {
    console.error('Erreur lors de la déconnexion', error);
  }
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
      <div class="top-row">
        <div class="header-content">
          <p class="welcome-title">Bienvenue sur le site de la Ruche Ludique, {{ store.username }}</p>
        </div>
        <div class="dashboard-dropdown" @click="toggleDropdown">
          <div class="dashboard-avatar">
            <p>{{ store.username.charAt(0).toUpperCase() }}</p>
          </div>
          <div v-if="isDropdownOpen" class="dropdown-content">
            <p>Bonjour, {{ store.username }}</p>
            <button class="logout-button" @click="logout">Déconnexion</button>
          </div>
        </div>
      </div>
      <a class="logout-button-responsive" @click="logout">Déconnexion</a>
      <div class="search-bar-container">
        <SearchBar v-on:search="handleSearch" />
      </div>
      <!-- Cartes des jeux -->
      <div class="game-cards-container">
        <GameCard v-for="game in filteredGames" :key="game._id" :game="game" :displayTrashIcon="false"
          :displayHeartIcon="true" :displayPlusIcon="true" />
      </div>
    </div>

  </DashboardLayout>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bellota+Text:wght@700&family=Cabin+Sketch:wght@700&family=Gabarito:wght@400;500;600&family=Handlee&family=Pacifico&family=Patrick+Hand+SC&family=Sue+Ellen+Francisco&display=swap');

.search {
  display: flex;
  justify-content: center;
  align-items: center;

}

.welcome-title {
  font-family: 'Gabarito', cursive;
  margin: 20px 10px 0 auto;
  font-size: 32px;
  color: #218e76ce;
}

.dashboard-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  align-items: center;
  text-align: center;
}

.top-row {
  display: flex;
  justify-content: center;
  align-items: center;
}

.game-cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  margin-left: 60px;
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
  margin-left: 7px;
  margin-top: 24px;
  cursor: pointer;
}

.search-bar-container {
  display: flex;
  justify-content: center;
}

.logout-link {
  color: rgb(90, 142, 90);
}

@media screen and (min-width: 200px) and (max-width: 768px) {
  .welcome-title {
    font-size: 19px;
    margin: 0;
    padding: 20px;
  }
}

@media screen and (min-width: 200px) and (max-width: 1024px) {
  .dashboard-container {
    grid-template-columns: 1fr;

  }

  .game-cards-container {
    margin-left: 0;
  }

  .dashboard-avatar {
    display: none;
  }

  .dropdown-content .logout-button {
    display: block;
  }

}

.logout-button-responsive {
  color: #218e76ce;
  font-size: 19px;
}

@media screen and (min-width: 852px) {
  .logout-button-responsive {
    display: none;
  }
}

@media screen and (min-width: 768px) and (max-width: 820px) {
  .welcome-title {
    margin: 0 auto;
    font-size: 37px;
  }
}
</style>
