<script setup lang="ts">
import { useUserStore } from "@/stores/userState";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import type { Games } from "@/types";
import { ref } from 'vue';

const userStore = useUserStore();
const userId = userStore.id

const userGames = ref<Games[]>([])

const fetchUserGames = async () => {
  try {
    console.log('userId:', userId)
    const response = await fetch(`http://localhost:5000/api/user/collection/${userId}`, {
      method: 'GET',
      credentials: 'include',
    });

    if (response.ok) {
      const userGamesData = await response.json();
      userGames.value = userGamesData.games; // Je mets à jour la liste des jeux

    } else {
      console.error('Échec de récupération de la collection utilisateur');
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de la collection utilisateur', error);
  }
};

fetchUserGames()

const removeFromCollection = async (gameId: any) => {
  try {
    const response = await fetch(`http://localhost:5000/api/user/collection/${userId}/${gameId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (response.ok) {
      userGames.value = userGames.value.filter(game => game._id !== gameId);
    } else {
      console.error('Échec de la suppression du jeu de la collection');
    }
  } catch (error) {
    console.error('Erreur lors de la suppression du jeu', error);
  }
};
</script>

<template>
  <DashboardLayout>
    <div class="dashboard-container">
      <div class="page-container">
        <div class="game-container">
          <div v-for="game in userGames" :key="game._id" class="game-card">
            <div class="game-name">{{ game.nom }}</div>
            <div class="image-container">
              <img :src="game.imageURL" alt="Image du jeu" class="game-image">
              <font-awesome-icon :icon="'trash'" class="add-icon" @click="removeFromCollection(game._id)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>
<style scoped>
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


.add-icon {
  color: #218e76ce
}
</style>

