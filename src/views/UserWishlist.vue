<script setup lang="ts">
import { useUserStore } from "@/stores/userState";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import GameCard from "../components/GameCard.vue"
import type { Games } from "@/types";
import { ref } from 'vue';
import jsPDF from 'jspdf';

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

const handleGameRemoved = (gameId: string) => {
  userGames.value = userGames.value.filter(game => game._id !== gameId);
};

const exportWishlistPDF = () => {
  const wishlistData = userGames.value;
  const pdf = new jsPDF();

  // Génération du contenu du PDF à partir des données de la collection du user
  const pdfContent = wishlistData.map((game) => {
    return `${game.nom}`;
  });

  // Ajout du contenu au PDF (avec sa position sur le document)
  pdf.text(pdfContent, 10, 10);

  // Téléchargement du fichier au format PDF
  pdf.save('MaWishlist.pdf');
};


</script>

<template>
  <DashboardLayout>
    <div class="dashboard-container">
      <div class="page-container">
        <router-link to="/dashboard">
          <p class="dashboard-link">Retour Dashboard</p>
        </router-link>
        <div class="title-button-container">
          <h2 class="wishlist-title">Ma wishlist</h2>
          <button class="pdf-button" @click="exportWishlistPDF">Exporter en PDF</button>
        </div>
        <div class="game-cards-container">
          <!-- J'utilise GameCard dans ma boucle v-for -->
          <GameCard v-for="game in userGames" :key="game._id" :game="game" :displayTrashIcon="true"
            :displayHeartIcon="false" :displayPlusIcon="false" @game-removed="handleGameRemoved" />
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>
<style scoped>
.dashboard-container {
  display: flex;
  justify-content: flex-end;
  color: #218e76ce;
  align-items: center;
  text-align: center;
}

.title-button-container {
  text-align: center;
}

.wishlist-title {
  font-size: 37px;
}

.game-cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  margin-left: 50px;
}

.pdf-button {
  background-color: white;
  border-radius: 28px;
  border: 1.9px solid #218e76ce;
  display: inline-block;
  cursor: pointer;
  color: #347d6de6;
  font-family: Arial;
  font-size: 15px;
  padding: 12px 17px;
}

.pdf-button:hover {
  background-color: #218e76ce;
  color: white;
}

.dashboard-link {
  color: #218e76ce;
  font-style: italic;
  font-size: 17px;
  text-align: center;
}
</style>
