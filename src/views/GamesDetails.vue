<script setup lang="ts">
import router from '@/router';
import type { Games } from '@/types';
import { onMounted, ref } from 'vue';
import DashboardLayout from "../layouts/DashboardLayout.vue";

    type GameDetails = Games & {
        description?:string
        nbJoueurs:number
        dureePartie:number
        categorie:string
        imageURL:string

    }
    const game = ref<GameDetails>()

    onMounted(async () => {
    const reqDetails = await fetch(`http://localhost:5000/api/games/${router.currentRoute.value.params.id}`)
    game.value = await reqDetails.json()
    console.log(game.value);
    })


</script>
<template>
    <DashboardLayout>
    </DashboardLayout>
   
    <div class="page-container">
      <h2>{{ game?.nom }}</h2>
      <div class="subInfo"><h4>Joueurs : {{ game?.nbJoueurs }}</h4> </div>
      <h4>Durée d'une partie : {{ game?.dureePartie }}</h4>
      <p>{{ game?.description }}</p>
      <img :src="game?.imageURL" alt="Image du jeu" />

    </div>


</template>

<style scoped>
.page-container {
    margin-left: 270px;
    font-family: 'Bellota Text', cursive;
}
.subInfo{
    display: flex;
    gap: 10px;
}

</style>