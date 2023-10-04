<script setup lang="ts">
import router from "@/router";
import { useCollectionStore } from "@/stores/gamesCollectionState";
import { useUserStore } from "@/stores/userState";
import type { Games } from "@/types";
import { ref, watch } from "vue";

type GameDetails = Games & {
    description?: string
    nbJoueurs: number
    dureePartie: number
    categorie: string
    imageURL: string;
}

//const game = ref<GameDetails>()

const emit = defineEmits(['game-removed']);

const collectionStore = useCollectionStore()
const userStore = useUserStore();
const userId = userStore.id;

const userGames = ref<Games[]>([])

const gameAdded = ref(false);

const addFlashClass = () => {
    gameAdded.value = true;
    setTimeout(() => {
        gameAdded.value = false;
    }, 3000); // Durée de l'animation, 3 secondes
};

watch(gameAdded, (newValue: any) => {
    if (newValue) {
        addFlashClass();
    }
});

defineProps<{
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
            gameAdded.value = true;

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

const removeFromWishlist = async (gameId: any) => {
    try {
        const response = await fetch(`http://localhost:5000/api/user/wishlist/${userId}/${gameId}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (response.ok) {
            userGames.value = userGames.value.filter(game => game._id !== gameId);
            console.log('Jeu supprimé de la wishlist');
        } else {
            console.error('Échec de la suppression du jeu de la wishlist');
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du jeu', error);
    }
};


const removeFromCollectionOrWishlist = (gameId: any) => {
    removeFromCollection(gameId);
    removeFromWishlist(gameId);
}

</script>

<template>
    <div class="game-container">
        <div class="card-container">
            <div class="myCard" @click="openDetail(game._id)">
                <font-awesome-icon v-if="displayTrashIcon" :icon="'trash'" class="add-icon"
                    @click.stop="removeFromCollectionOrWishlist(game._id)" />
                <font-awesome-icon v-if="displayPlusIcon" :icon="'plus'" class="add-icon"
                    @click.stop="addToCollection(game._id)"
                    :class="{ 'flash-animation': gameAdded, 'color-change-animation': gameAdded, }" />
                <font-awesome-icon v-if="displayHeartIcon" :icon="'heart'" class="add-icon"
                    @click.stop="addToWishlist(game._id)" />

                <div class="innerCard">
                    <div class="frontSide">
                        <div class="image-container">
                            <img :src="game.imageURL" alt="Image du jeu" class="game-image">
                        </div>
                        <hr class="card-divider">
                        <h3 class="game-name">{{ game.nom }}</h3>
                    </div>
                    <div class="backSide">
                        <h2 class="game-name">{{ game.nom }}</h2>
                        <!-- <img src="images/sablier.png" class="icon-cards" alt="sablier"> -->
                        <h4>Durée d'une partie : {{ game.dureePartie }} minutes</h4>
                        <h4>Nombre de joueurs : {{ game.nbJoueurs }}</h4>
                        <h4>Catégorie : {{ game.categorie }}</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

  

<style>
/* Permet de résoudre le problème sous Firefox avec le hover des cards  */
@-moz-document url-prefix() {
    .innerCard {
        backface-visibility: hidden;
    }
}


.image-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

hr {
    border: none;
    border-top: 3px double #218e76ce;
    color: #333;
    overflow: visible;
    text-align: center;
    height: 5px;
}

hr:after {
    background: #fff;
    content: 'o';
    padding: 0 4px;
    position: relative;
    top: -13px;
    color: #218e76ce;
}

.card-divider {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    border: none;
    border-top: 1px solid #218e76ce;
}

.card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-left: 50px;
}

.myCard {
    background-color: transparent;
    width: 250px;
    height: 387px;
    perspective: 1000px;
    margin-bottom: 30px;
    margin-top: 67px;
    margin-right: 10px;
}


.title {
    font-size: 1.5em;
    font-weight: 900;
    text-align: center;
    margin: 0;
}


.innerCard {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    -webkit-transition: -webkit-transform 0.8s;
    transition: -webkit-transform 0.8s;
    -o-transition: transform 0.8s;
    transition: transform 0.8s;
    transition: transform 0.8s, -webkit-transform 0.8s;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    cursor: pointer;
}


.myCard:hover .innerCard {
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);
}


.frontSide,
.backSide {
    position: absolute;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: space-evenly;
    -ms-flex-pack: space-evenly;
    justify-content: space-evenly;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border: 1px solid #218e76ce;
    border-radius: 1rem;
    color: #218e76ce;
    font-weight: 700;
}


.backSide {
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);
}

.frontSide::before,
.backSide::before {
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    content: '';
    width: 110%;
    height: 110%;
    position: absolute;
    z-index: -1;
    border-radius: 1em;
}


.game-image {
    max-width: 100%;
    max-height: 180px;
}

.icon-cards {
    color: dodgerblue;
}

.add-icon {
    cursor: pointer;
    padding: 7px;
    transition: transform 0.3s ease-in-out;
    color: #218e76ce;
    margin-bottom: 10px;
}

.add-icon:hover {
    transform: scale(1.7);
}

@media screen and (max-width: 768px) {
    .game-container {
        margin: 0 auto;
    }


    .myCard {
        margin-right: 0;
    }

}

@media screen and (max-width: 1024px) {
    .card-container {
        margin-left: 0px;
    }
}




@keyframes flash {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.flash-animation {
    animation: flash 1s infinite;
    color: crimson;
}
</style>