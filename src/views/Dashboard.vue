<script setup lang="ts">
import router from "@/router";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import type { Games } from "@/types";
import { useUserStore } from "@/stores/userState";
import { onMounted, ref } from "vue";

const store = useUserStore();
onMounted(async () => {
  console.log('La fonction onMounted a été exécutée !');
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

// const addToCollection = (id:string) => {
//   console.log("cliqué");
  
// }

</script>
<template>
  <DashboardLayout>
  </DashboardLayout>
<div class="dashboard-container">
  <div class="dashboard-avatar">
    <p>{{ store.username.charAt(0).toUpperCase() }}</p>
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
        <font-awesome-icon :icon="'plus'" class="add-icon" @click="addToCollection(game._id)" />
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
