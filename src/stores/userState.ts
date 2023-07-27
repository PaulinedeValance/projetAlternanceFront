import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const id = ref("Pauline La Boss");
  const gameList = ref<string[]>([]);
  const addGame = (label: string) => {
    gameList.value.push(label);
  };

  return { id, addGame, gameList };
});
