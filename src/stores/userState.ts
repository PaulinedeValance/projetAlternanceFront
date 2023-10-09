import type { UserInfo } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const id = ref<string | null>(null); // Initialement défini à null
  const username = ref<string>('');
  const email = ref<string>('');

  function setUser(user: UserInfo) {
    if (user.id !== null && user.email !== null && user.username !== null) {
      id.value = user.id;
      email.value = user.email;
      username.value = user.username;
      // Je sauvegarder l'ID du user dans le localStorage
      localStorage.setItem('userId', user.id);
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userName', user.username);
    }
  }

  function getUser() {
    return { id: id.value, email: email.value, username: username.value };
  }

  // Initialisez l'ID utilisateur à partir du stockage local lors du chargement du store
  const storedUserId = localStorage.getItem('userId');
  if (storedUserId) {
    id.value = storedUserId;
  }

  return { id, username, email, setUser, getUser };
});
