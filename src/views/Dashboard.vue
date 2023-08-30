<script setup lang="ts">
import router from "@/router";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import type { Games } from "@/types";
import { useUserStore } from "@/stores/userState";
import { ref } from "vue";
import { useCollectionStore } from "@/stores/gamesCollectionState"
import GameCard from "../components/GameCard.vue"


const userStore = useUserStore();
const userId = userStore.id;

const store = useUserStore();
const collectionStore = useCollectionStore()

const addToCollection = async (gameId: any) => {
  try {
    const response = await fetch(`http://localhost:5000/api/collection`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, gameId }), // Envoie de l'ID du jeu et l'ID du user dans le body de ma requête
    });

    if (response.ok) {
      const addedGame = await response.json(); // Si l'API renvoie des informations sur le jeu ajouté
      collectionStore.addToCollection(addedGame); // Le store est mis à jour avec le jeu ajouté

    } else {
      console.error('Échec de l\'ajout à la collection');
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout à la collection', error);
  }
}

const addToWishlist = async (gameId: any) => {
  try {
    const response = await fetch(`http://localhost:5000/api/wishlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, gameId }), // Envoie de l'ID du jeu et l'ID du user dans le body de ma requête
    });

    if (response.ok) {
      const addedGame = await response.json(); // Si l'API renvoie des informations sur le jeu ajouté
      collectionStore.addToWishlist(addedGame); // Le store est mis à jour avec le jeu ajouté

    } else {
      console.error('Échec de l\'ajout à la collection');
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout à la collection', error);
  }
}


const games = ref<Games[]>([]);

const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/games", {
      credentials: "include",
    });
    games.value = await response.json();

  } catch (error) {
    console.error(error);
  }
};
fetchData();

const openDetail = (id: string) => {
  router.push(`/game/${id}`)
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
          <div v-for="game in games" :key="game._id" class="game-card">
            <div class="image-container">
              <img :src="game.imageURL" alt="Image du jeu" class="game-image" @click="openDetail(game._id)">
            </div>
            <div class="game-name">{{ game.nom }}</div>
            <font-awesome-icon :icon="'plus'" class="add-icon" @click="addToCollection(game._id)" />
            <font-awesome-icon :icon="'heart'" class="add-icon" @click="addToWishlist(game._id)" />
          </div>
        </div>
      </div>
    </div>

    <GameCard>

    </GameCard>

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

.game-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 120px;
}

/* TEST DE DESIGN DE CARD */

/* .game-card {
  width: 400px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
} */

/* .game-card {
  width: 400px;
   margin: 10px;
  padding: 10px;
  text-align: center;
  border-radius: 30px;
  box-shadow: 15px 15px 30px #bebebe,
             -15px -15px 30px #ffffff;
} */

.game-name {
  font-size: 20px;
  margin-bottom: 30px;
  font-family: 'Bellota Text', cursive;
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
  padding: 7px;
  transition: transform 0.3s ease-in-out;
}

.add-icon:hover {
  transform: scale(1.7);
}

.add-icon.clicked {
  transform: scale(1.7);
  color: green;
}
</style>
