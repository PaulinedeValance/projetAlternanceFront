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
        <button @click="exportWishlistPDF">Exporter au format PDF</button>
        <div class="game-container">
          <!-- J'utilise GameCard dans ma boucle v-for -->
          <GameCard v-for="game in userGames" :key="game._id" :game="game" :displayTrashIcon="true"
            :displayHeartIcon="false" :displayPlusIcon="false" @game-removed="handleGameRemoved" />
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
