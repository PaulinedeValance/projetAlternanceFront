<script setup lang="ts"></script>

<template>
  <nav>
    <ul class="navbar-display">
      <li class="navbar-link"><router-link to="/">Home</router-link></li>
      <li class="navbar-link">
        <router-link to="/jeux">Les jeux</router-link>
      </li>
      <li class="navbar-link">
        <router-link to="/contact">Contact</router-link>
      </li>
      <li class="navbar-link">
        <router-link to="/signup">Créer un compte</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Koulen&family=Lato&family=Nunito&family=Playfair+Display:ital@1&family=Prata&family=Raleway:ital,wght@1,100&family=Roboto&family=Roboto+Condensed&family=Teko&display=swap");
.navbar-display {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.navbar-link {
  list-style: none;
  padding: 20px;
}

a {
  text-decoration: none;
  color: black;
  font-size: 22px;
  font-family: "Didact Gothic", sans-serif;
}
</style>
