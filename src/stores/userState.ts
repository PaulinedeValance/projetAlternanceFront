import type { UserInfo } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const id = ref<string | null>(null); // Initialement défini à null
  const username = ref('');
  const email = ref('');

  function setUser(user: UserInfo) {
    id.value = user.id;
    email.value = user.email;
    username.value = user.username;
  }

  function getUser() {
    return { id: id.value, email: email.value, username: username.value };
  }

  return { id, username, email, setUser, getUser };
});
