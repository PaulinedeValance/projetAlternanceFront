<script setup lang="ts">

</script>
<template>
    <footer class="footer">
        <div class="footer-left">
            <p>&copy; 2023 - La Ruche Ludique</p>
        </div>
        <div class="footer-right">
            <router-link to="/faq">FAQ</router-link>
            <router-link class="mentions-legales-link" to="/legalnotes">Mentions légales</router-link>
        </div>
    </footer>
</template>
<style>
.footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #26517d;
    color: white;
    display: flex;
    align-items: center;
}

.footer-left {
    flex-grow: 1;
    text-align: left;
    margin-left: 52px;
}

.footer-right {
    display: flex;
    gap: 20px;
    list-style: none;
    margin-right: 67px;
}

.footer-right router-link {
    color: white;
    text-decoration: none;
    font-weight: bold;
}

@media (max-width: 768px) {
    footer {
        font-size: 16px;
    }
}
</style>
  
