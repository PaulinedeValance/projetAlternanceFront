<script setup lang="ts">
import router from "@/router";
import { useCollectionStore } from "@/stores/gamesCollectionState";
import { useUserStore } from "@/stores/userState";
import type { Games } from "@/types";

const collectionStore = useCollectionStore()
const userStore = useUserStore();
const userId = userStore.id;

defineProps<{ game: Games }>();

const openDetail = (id: string) => {
    router.push(`/game/${id}`)
}

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
</script>

<template>
    <div class="image-container">
        <img :src="game.imageURL" alt="Image du jeu" class="game-image" @click="openDetail(game._id)">
    </div>
    <div class="game-name">{{ game.nom }}</div>
    <font-awesome-icon :icon="'plus'" class="add-icon" @click="addToCollection(game._id)" />
    <!-- <font-awesome-icon :icon="'heart'" class="add-icon" @click="addToWishlist(game._id)" /> -->
</template>

<style>
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

.game-name {
    font-size: 20px;
    margin-bottom: 30px;
    font-family: 'Bellota Text', cursive;
}

.add-icon {
    cursor: pointer;
    padding: 7px;
    transition: transform 0.3s ease-in-out;
}

.add-icon:hover {
    transform: scale(1.7);
}
</style>