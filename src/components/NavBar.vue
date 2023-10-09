<script setup lang="ts">
</script>

<template>
  <nav>
    <ul class="navbar-display">
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
@import url('https://fonts.googleapis.com/css2?family=Bellota+Text:wght@700&family=Cabin+Sketch:wght@700&family=Didact+Gothic&family=Handlee&family=Londrina+Shadow&family=Pacifico&family=Patrick+Hand+SC&family=Rampart+One&family=Sue+Ellen+Francisco&display=swap');

.navbar-display {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.navbar-link {
  list-style: none;
  padding: 20px;
  font-family: 'Bellota Text', cursive;
}

a {
  text-decoration: none;
  color: black;
  font-size: 22px;
}
</style>
