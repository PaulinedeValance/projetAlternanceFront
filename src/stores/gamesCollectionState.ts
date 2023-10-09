import type { Games } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCollectionStore = defineStore('collection', () => {
  const userCollection = ref<Games[]>([]);

  function addToCollection(game: Games) {
    userCollection.value.push(game);
  }

  function getUserCollection() {
    return userCollection.value;
  }

  function addToWishlist(game: Games) {
    userCollection.value.push(game);
  }

  function getUserWishlist() {
    return userCollection.value;
  }

  return {
    userCollection,
    addToCollection,
    getUserCollection,
    addToWishlist,
    getUserWishlist,
  };
});
