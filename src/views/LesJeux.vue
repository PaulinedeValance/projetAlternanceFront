<script setup lang="ts">
import type { Games } from "@/types";
import { ref } from "vue";

const games = ref<Games[]>([]);

const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/games", {
      credentials: "include",
    });
    const data = await response.json();
    games.value = data.map((game: Games) => ({
      nom: game.nom,
      id: game._id,
      imageURL: game.imageURL,
    }));
  } catch (error) {
    console.error(error);
  }
};
fetchData();
</script>

<template>
  <div>
    <div class="game-container">
      <div v-for="game in games" :key="game._id" class="game-card">
        <div class="game-name">{{ game.nom }}</div>
        <div class="image-container">
          <img :src="game.imageURL" alt="Image du jeu" class="game-image" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
</style>
