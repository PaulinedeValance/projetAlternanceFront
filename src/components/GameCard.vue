<script setup lang="ts">
import router from "@/router";
import { useCollectionStore } from "@/stores/gamesCollectionState";
import { useUserStore } from "@/stores/userState";
import type { Games } from "@/types";
import { ref } from "vue";
import { defineEmits } from 'vue';

const emit = defineEmits(['game-removed']);

const collectionStore = useCollectionStore()
const userStore = useUserStore();
const userId = userStore.id;

//const { emit } = useContext()

const userGames = ref<Games[]>([])

const props = defineProps<{
    game: Games,
    displayHeartIcon?: Boolean,
    displayPlusIcon?: Boolean,
    displayTrashIcon?: Boolean,
}>();


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
            const addedGame = await response.json();
            collectionStore.addToWishlist(addedGame);

        } else {
            console.error('Échec de l\'ajout à la collection');
        }
    } catch (error) {
        console.error('Erreur lors de l\'ajout à la collection', error);
    }
}

const removeFromCollection = async (gameId: any) => {
    try {
        const response = await fetch(`http://localhost:5000/api/user/collection/${userId}/${gameId}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (response.ok) {
            console.log('Game removed successfully');

            userGames.value = userGames.value.filter(game => game._id !== gameId);
            console.log('Updated userGames:', userGames.value);

            // J'emets l'événement 'game-removed' avec l'ID du jeu en tant que données
            emit('game-removed', gameId);
        } else {
            console.error('Échec de la suppression du jeu de la collection');
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du jeu', error);
    }
};
</script>

<template>
    <div class="game-container">
        <div class="game-card">
            <div class="image-container">
                <img :src="game.imageURL" alt="Image du jeu" class="game-image" @click="openDetail(game._id)">
            </div>
            <div class="game-name">{{ game.nom }}</div>
            <font-awesome-icon v-if="displayTrashIcon" :icon="'trash'" class="add-icon"
                @click="removeFromCollection(game._id)" />
            <font-awesome-icon v-if="displayHeartIcon" :icon="'heart'" class="add-icon" @click="addToWishlist(game._id)" />
            <font-awesome-icon v-if="displayPlusIcon" :icon="'plus'" class="add-icon" @click="addToCollection(game._id)" />
        </div>
    </div>
</template>

<style>
.image-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.game-card {
    width: 220px;
    margin: 30px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
}

/* .game-card {
    width: 100px;
    margin: 20px;
    padding: 40px;
    text-align: center;
    border-radius: 30px;
    box-shadow: 15px 15px 30px #bebebe, -15px -15px 30px #ffffff;
} */

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

.game-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 30px;
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