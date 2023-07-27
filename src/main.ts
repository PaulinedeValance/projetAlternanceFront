import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEye,
  faEyeSlash,
  faCameraRetro,
  faPuzzlePiece,
  faList,
  faRotateRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import '@fortawesome/fontawesome-free/css/all.css';

import App from './App.vue';
import router from './router';

import './assets/main.css';

// Ajout des icônes que j'aimerais utiliser à la bibliothèque Font Awesome
library.add(faEye, faEyeSlash, faCameraRetro, faPuzzlePiece, faList, faRotateRight);

const app = createApp(App);

app.use(createPinia());
app.use(router);

// J'enregistre le composant FontAwesomeIcon pour pouvoir l'utiliser dans mon app
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
