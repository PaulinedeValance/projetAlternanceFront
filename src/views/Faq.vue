<script setup lang="ts">
import Footer from "@/components/Footer.vue";

</script>

<template>
    <div class="faq">
        <h2 class="faq-title">Foire aux Questions</h2>
        <div class="paragraph-style">
            <h3 class="question">Quel est le but de la Ruche Ludique ?</h3>
            <p class="answer">La Ruche Ludique a pour objectif d'aider les passionnés de jeux. Notre plateforme vous permet
                de constituer
                votre collection de jeux en ligne, agissant comme une ludothèque virtuelle où vous pouvez organiser et gérer
                tous vos jeux. Vous pouvez également créer une liste d'envie (wishlist) pour garder une trace des jeux que
                vous aimeriez acheter un jour.</p>
        </div>
        <div class="paragraph-style">
            <h3 class="question">Je ne trouve pas un jeu pour l'ajouter à ma collection, que dois-je faire ?</h3>
            <p class="answer">Tout d'abord, vérifiez bien l'orthographe du titre (même si vous êtes sûr de vous). Si vous ne
                le trouvez toujours pas, suggérer un jeu manquant via le formulaire de contact.</p>
        </div>
        <div class="paragraph-style">
            <h3 class="question">Je n'arrive pas à me connecter ?</h3>
            <p class="answer">Il peut y avoir plusieurs raisons. Tout d'abord, ça parait stupide de le rappeler mais
                vérifiez bien votre mot de passe (minuscule / majuscule
                etc...). Si le problème persiste, rendez-vous sur la page contact.
            </p>
        </div>
        <div class="paragraph-style">
            <h3 class="question">Puis-je exporter ma collection ou ma wishlist ?</h3>
            <p class="answer">Oui ! Vous pouvez faire un export au format PDF, grâce à au bouton exporter que vous trouverez
                dans votre collection et dans votre wishlist</p>
        </div>
        <div class="paragraph-style">
            <h3 class="question">La Ruche Ludique est-il vraiment gratuit ?</h3>
            <p class="answer">Oui, l'utilisation du site est totalement gratuit.</p>
        </div>

        <Footer />
    </div>
</template>
  
<style scoped>
.faq {
    display: flex;
    flex-direction: column;
    max-width: 800px;
    margin: 0 auto;
    padding: 10px 160px;
    padding-bottom: 30px;

    @media (max-width: 768px) {
        padding-left: 25px;
        padding-right: 40px;
        text-align: center;
    }
}

.faq-title {
    margin-bottom: 25px;
    text-align: center;
}

.paragraph-style {
    margin-left: 20px;
    margin-bottom: 25px;
}

.paragraph-style:last-of-type {
    padding-bottom: 40px;
}

@media (max-width: 768px) {
    .question {
        font-size: 20px;
        color: crimson;
    }

}
</style>
  