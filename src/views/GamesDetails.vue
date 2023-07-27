<script setup lang="ts">
import router from '@/router';
import type { Games } from '@/types';
import { onMounted, ref } from 'vue'

    type GameDetails = Games & {
        description?:string
        nbJoueurs:number
        dureePartie:number
        categorie:string
    }
    const game = ref<GameDetails>()

    onMounted(async ()=> {
    const reqDetails = await fetch(`http://localhost:5000/api/games/${router.currentRoute.value.params.id}`)
    game.value = await reqDetails.json()
    console.log(game.value);
    })

    
    

</script>
<template>
   
    <div>
      <h2>{{ game?.nom }}</h2>
      <div class="subInfo"><h4>joueurs: {{ game?.nbJoueurs }}</h4> <h4>durée {{ game?.dureePartie }}</h4></div>
      <p>{{ game?.description }}</p>

    </div>

</template>

<style scoped>
.subInfo{
    display: flex;
    gap: 10px;
}
</style>