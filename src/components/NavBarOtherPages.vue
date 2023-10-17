<script setup lang="ts">
</script>

<template>
    <nav>
        <div class="navbar-container">
            <router-link to="/">
                <img src="/images/logo-bleu.png" alt="Logo" class="logo-navbar" />
            </router-link>
            <ul class="nav-link">
                <li class="navbar-link">
                    <router-link to="/contact">Contact</router-link>
                </li>
                <li class="navbar-link">
                    <router-link to="/signup">Créer un compte</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>
  
<style scoped>
.navbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo-container {
    display: flex;
    align-items: center;
}

.nav-link {
    list-style: none;
    padding: 0;
    font-family: 'Bellota Text', cursive;
    padding-right: 25px;
}

.navbar-link {
    margin-right: 40px;
}

.logo-navbar {
    width: 40%;
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
  