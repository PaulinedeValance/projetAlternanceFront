<script setup lang="ts">
import router from '@/router';
import type { Games } from '@/types';
import { onMounted, ref } from 'vue';
import DashboardLayout from "../layouts/DashboardLayout.vue";

type GameDetails = Games & {
    description?: string
    nbJoueurs: number
    dureePartie: number
    categorie: string
    imageURL: string
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
        <h2 class="game-title">{{ game?.nom }}</h2>
        <div class="game-details-container">
            <img :src="game?.imageURL" alt="Image du jeu" class="game-image" />
            <div class="game-details">
                <h4>Nombre de joueurs : {{ game?.nbJoueurs }}</h4>
                <h4>Durée d'une partie : {{ game?.dureePartie }} minutes</h4>
                <p>{{ game?.description }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.page-container {
    margin-left: 270px;
    font-family: 'Bellota Text', cursive;
}

.games-details {
    flex: 1;
}

.game-details-container {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-right: 60px;
    text-align: justify;

}


.game-title {
    text-align: center;
    font-size: 32px;
}

.game-image {
    width: 25%;
    height: auto;
    margin-top: 10px;
    margin-left: 30px;
}

@media screen and (max-width: 768px) {
    .page-container {
        margin-left: 0;
        padding-right: 20px;
    }

    .game-image {
        width: 60%;
        margin: 0 auto;
    }

    .game-details-container {
        flex-direction: column;
        align-items: flex-start;
        margin-right: 0;

    }
}
</style>