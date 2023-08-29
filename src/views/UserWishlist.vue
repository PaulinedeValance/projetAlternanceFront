<script setup lang="ts">
import { useUserStore } from "@/stores/userState";
import type { Games } from "@/types";
import { ref } from 'vue';

const userStore = useUserStore();
const userId = userStore.id

const userGames = ref<Games[]>([])

const fetchUserGames = async () => {
  try {
    console.log('userId:', userId)
    const response = await fetch(`http://localhost:5000/api/user/wishlist/${userId}`, {
      method: 'GET',
      credentials: 'include',
    });

    if (response.ok) {
      const userGamesData = await response.json();
      userGames.value = userGamesData.games; // Je mets à jour la liste des jeux
    
    } else {
      console.error('Échec de récupération de la wishlist utilisateur');
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de la wishlsit utilisateur', error);
  }
};

fetchUserGames()

const removeFromWishlist = async (gameId: any) => {
  try {
    const response = await fetch(`http://localhost:5000/api/user/wishlist/${userId}/${gameId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (response.ok) {
      userGames.value = userGames.value.filter(game => game._id !== gameId);
      console.log('Jeu supprimé de la wishlist');
    } else {
      console.error('Échec de la suppression du jeu de la wishlist');
    }
  } catch (error) {
    console.error('Erreur lors de la suppression du jeu', error);
  }
};

</script>

<template>
  <div>
    <h1>Ma wishlist</h1>
    <div class="game-container">
      <div v-for="game in userGames" :key="game._id" class="game-card">
        <div class="game-name">{{ game.nom }}</div>
        <div class="image-container">
          <img :src="game.imageURL" alt="Image du jeu" class="game-image">
          <font-awesome-icon :icon="'trash'" class="add-icon" @click="removeFromWishlist(game._id)" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.add-icon {
  color: #218e76ce
}
</style>
