<script setup lang="ts">
import router from "@/router";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import type { Games } from "@/types";
import { useUserStore } from "@/stores/userState";
import { onMounted, ref } from "vue";
import { useFetch } from '@vueuse/core';

const store = useUserStore();
onMounted(async () => {
  if (store.id) {
    
    await store.fetchUserDetails(store.id);
    console.log(store.username);
    console.log(store.email);
  }
});


const games = ref<Games[]>([]);

const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/games", {
      credentials: "include",
    });
    games.value = await response.json();
    console.log(games.value);
    
  } catch (error) {
    console.error(error);
  }
};
fetchData();

const openDetail = (id:string) => {
  router.push(`/game/${id}`)
  console.log(id);
  
}

const isDropdownOpen = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// const logout = () => {
//   const { isFetching, error, data } = useFetch('/api/logout', {
//     method: 'GET',
//   });
// }

const logout = () => {
  // Appel à l'API de déconnexion
  fetch('/api/logout', {
    method: 'GET', // 
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
  </DashboardLayout>
<div class="dashboard-container">
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
      <div v-for="game in games" :key="game._id" class="game-card">
        <div class="game-name">{{ game.nom }}</div>
        <div class="image-container">
          <img :src="game.imageURL" alt="Image du jeu" class="game-image" @click="openDetail(game._id)">
        </div>
        <!-- <font-awesome-icon :icon="'plus'" class="add-icon" @click="addToCollection(game._id)" /> -->
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>

.dashboard-container {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
}

.dashboard-avatar {
  width: 39px;
  height: 39px;
  border-radius: 50%;
  background-color: #3498db;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #fff;
  margin-right: 10px;
  margin-top: 10px;
  cursor: pointer;
}

.page-container {
  margin-left: 270px;
  
}
.game-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 120px;
}

.game-card {
  width: 400px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}

.game-name {
  font-weight: bold;
  margin-bottom: 30px;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.game-image {
  max-width: 300px;
  max-height: 100%;
  width: 100%;
}

.add-icon {
  cursor: pointer;
}
</style>
