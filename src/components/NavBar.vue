<script setup lang="ts">
</script>

<template>
  <nav>
    <div class="navbar-container">
      <ul class="nav-link">
        <li class="navbar-link">
          <router-link to="/contact">Contact</router-link>
        </li>
        <li class="navbar-link">
          <router-link to="/signup">Créer un compte</router-link>
        </li>
      </ul>
      <img src="/images/logo-bleu.png" alt="Logo" class="logo-navbar" />
    </div>
  </nav>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bellota+Text:wght@700&family=Cabin+Sketch:wght@700&family=Didact+Gothic&family=Handlee&family=Londrina+Shadow&family=Pacifico&family=Patrick+Hand+SC&family=Rampart+One&family=Sue+Ellen+Francisco&display=swap');

.navbar-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 10px;

}

.nav-link {
  list-style: none;
  padding: 0;
  font-family: 'Bellota Text', cursive;
  padding-top: 20px;
  padding-right: 25px;
}

.navbar-link {
  margin-right: 40px;
}

.logo-navbar {
  width: 40%;
  margin-right: 40px;
}

a {
  text-decoration: none;
  color: #2B4573;
  font-size: 22px;
}

.nav-link {
  display: flex;
}
</style>
