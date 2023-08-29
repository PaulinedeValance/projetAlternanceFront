<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

</script>

<template>
  <nav>
    <!-- <div class="logo">
      <router-link to="/dashboard">
         <img src="/images/logo.png" alt="Logo" class="logo-img" />
      </router-link>
     
    </div> -->
    <div class="sidebar">
      <ul>
        <li class="navbar-link"><router-link to="/usercollection"><font-awesome-icon :icon="'puzzle-piece'" class="icon-camera" />Ma collection</router-link></li>
        <li class="navbar-link"><router-link to="/userwishlist"><font-awesome-icon :icon="'list'" class="icon-camera" />Wish list</router-link></li>
        <li><a href="#"><font-awesome-icon :icon="'rotate-right'" class="icon-camera" />Générateur</a></li>
      </ul>
    </div>
    
  </nav>

</template>

<style scoped>
 
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.logo-img {
  width: 250px; 
  height: auto;
  margin-left: 200px;
}

nav {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  position: relative;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li {
  margin-bottom: 1rem;
}

a {
  text-decoration: none;
  color: white;
  font-size: 21px;
  font-weight: 700;
  font-family: 'Bellota Text', cursive;
  
}

.sidebar {
  background-color: #218e76ce;
  width: 255px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  color: #fff;
}

.sidebar ul {
  padding: 40px;
}

.icon-camera {
  color: white;
  margin-right: 15px;

  
}
</style>
