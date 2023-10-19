<script setup lang="ts">
</script>

<template>
    <nav>
        <div class="navbar-container">
            <router-link to="/">
                <img src="/images/logo-bleu.png" alt="Logo" class="logo-navbar" />
            </router-link>
            <router-link to="/">
                <img src="/images/icone-maison.png" alt="Accueil" class="home-icon" />
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
    display: flex;
}

.nav-link li a:hover {
    color: #218C75;
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

.home-icon {
    display: none;
}

@media (max-width: 820px) {
    .logo-navbar {
        display: none;
    }

    nav {
        background-color: #2B4573;
        display: flex;
        justify-content: center;
        align-items: center;

    }

    a {
        color: whitesmoke;
    }

    .nav-link {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px 0;
    }

    .navbar-link {
        margin: 0 10px;

    }

    .home-icon {
        display: inline-block;
        max-width: 40px;
        margin-right: 40px;
        margin-left: 20px;
    }
}
</style>
  