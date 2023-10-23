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
  display: flex;
}

.navbar-link {
  margin-right: 40px;
}

.nav-link li a:hover {
  color: #218C75;
}

.logo-navbar {
  width: 33%;
  margin-right: 40px;
  margin-bottom: 10px;
}

a {
  text-decoration: none;
  color: #2B4573;
  font-size: 22px;
}


@media only screen and (min-width: 768px) and (max-width: 1024px) {
  a {
    font-size: 35px;
  }
}

@media (max-width: 1329px) {
  .navbar-container {
    flex-direction: column;
    align-items: center;
  }

  .nav-link {
    padding-top: 10px;
    padding-right: 0px;
    text-align: center;
    display: block;
  }

  .navbar-link {
    margin: 5px 0;
  }

  .logo-navbar {
    display: none;
  }

}
</style>
