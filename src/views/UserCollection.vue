<script setup lang="ts">
import { useUserStore } from "@/stores/userState";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import type { Games } from "@/types";
import { ref } from 'vue';
import GameCard from "../components/GameCard.vue"
import jsPDF from 'jspdf';

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

const handleGameRemoved = (gameId: string) => {
  userGames.value = userGames.value.filter(game => game._id !== gameId);
};

const exportCollectionPDF = () => {
  const collectionData = userGames.value;
  const pdf = new jsPDF();

  // Génération du contenu du PDF à partir des données de la collection du user
  const pdfContent = collectionData.map((game) => {
    return `${game.nom}`;
  });

  // Ajout du contenu au PDF (avec sa position sur le document)
  pdf.text(pdfContent, 10, 10);

  // Téléchargement du fichier au format PDF
  pdf.save('MaCollection.pdf');
};

</script>
<template>
  <DashboardLayout>

    <div class="dashboard-container">
      <div class="page-container">
        <div class="title-button-container">
          <h2 class="collection-title">Ma collection</h2>
          <button class="pdf-button" @click="exportCollectionPDF">Exporter en PDF</button>
        </div>
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
.dashboard-container {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  color: #218e76ce;
}

.title-button-container {
  text-align: center;
}

.collection-title {
  font-size: 37px;
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
  margin: 0 auto;

}

.pdf-button:hover {
  background-color: #218e76ce;
  color: white;
}
</style>

