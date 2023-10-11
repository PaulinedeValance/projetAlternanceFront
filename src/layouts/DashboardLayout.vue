<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref } from "vue";


const showMenu = ref(false);
const sidebarOpen = ref(false)

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

</script>

<template>
  <div class="dashboard-layout">
    <div class="flex-container">
      <div class="menu-icon" @click="toggleMenu">
        <span :class="{ 'active': sidebarOpen }"></span>
        <span :class="{ 'active': sidebarOpen }"></span>
        <span :class="{ 'active': sidebarOpen }"></span>
      </div>
      <!-- Menu déroulant de mon burger menu -->
      <ul class="menu-items" :class="{ 'show-menu': showMenu }">
        <li class="navbar-link"><router-link to="/usercollection"><font-awesome-icon :icon="'puzzle-piece'"
              class="icon-camera" />Ma collection</router-link></li>
        <li class="navbar-link"><router-link to="/userwishlist"><font-awesome-icon :icon="'list'"
              class="icon-camera" />Wish list</router-link></li>
        <!-- <li><a href="gamesgenerator"><font-awesome-icon :icon="'rotate-right'" class="icon-camera" />Générateur</a></li> -->
      </ul>

      <div class="sidebar">
        <router-link to="/dashboard">
          <div class="logo-container">
            <img src="/images/logo-white.png" alt="Logo" class="logo-img" />
          </div>
        </router-link>
        <ul>
          <li class="navbar-link"><router-link to="/usercollection"><font-awesome-icon :icon="'puzzle-piece'"
                class="icon-camera" />Ma collection</router-link></li>
          <li class="navbar-link"><router-link to="/userwishlist"><font-awesome-icon :icon="'list'"
                class="icon-camera" />Wish list</router-link></li>
          <!-- <li><a href="gamesgenerator"><font-awesome-icon :icon="'rotate-right'" class="icon-camera" />Générateur</a></li> -->
        </ul>
        <!-- <router-link to="/dashboard">
          <div class="logo-container">
            <img src="/images/logo-gris.png" alt="Logo" class="logo-img" />
          </div>
        </router-link> -->
      </div>
      <div class="page-container">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style>
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;
}

.logo-img {
  width: 230px;
  height: auto;
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

/* .sidebar {
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
} */

.sidebar {
  background-color: #218e76ce;
  width: 255px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.sidebar ul {
  padding: 15px 40px 40px 40px;
  flex-grow: 1;
}

.icon-camera {
  color: white;
  margin-right: 15px;
}


.flex-container {
  display: flex;
}

/* Règle spécifique pour désactiver "display: flex" en mode mobile */
@media screen and (max-width: 768px) {
  .flex-container {
    display: block;
  }
}



@media screen and (min-width: 769px) and (max-width: 1024px) {
  .flex-container {
    display: block;
  }
}

.page-container {
  flex: 1;
  padding-left: 20px;

}

.menu-icon {
  margin: 20px auto;
  width: 30px;
  height: 20px;
  cursor: pointer;
  position: relative;
  display: none;
  margin-left: 20px;
}

.menu-icon span {
  background-color: #218e76ce;
  height: 2px;
  position: absolute;
  width: 100%;
  left: 0;
  transition: all 0.3s ease;
}

.menu-icon span:first-child {
  top: 0;
}

.menu-icon span:nth-child(2) {
  top: 8px;
}

.menu-icon span:last-child {
  top: 16px;
}

.menu-items {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  margin-top: 15px;
}

.menu-items a {
  color: #218e76ce;
}

.show-menu {
  max-height: 200px;
}


@media screen and (min-width: 200px) and (max-width: 1024px) {
  .menu-icon {
    display: inline-block;

  }

  .page-container {
    margin-left: 0;
    padding-left: 0;

  }

  .sidebar {
    transform: translateX(-255px);

  }

  .sidebar.closed {
    transform: translateX(-255px);

  }
}

@media screen and (min-width: 769px) {
  .back-to-dashboard-link {
    display: none;
  }
}

/* Aligner le lien avec le burger menu en mode responsive */
@media screen and (max-width: 768px) {
  .back-to-dashboard-link {
    display: block;
    margin-top: 20px;
  }
}
</style>
