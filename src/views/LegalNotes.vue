<script setup lang="ts">
import Footer from "@/components/Footer.vue";
</script>

<template>
    <div class="legales-notes">
        <h2 class="legal-title">Mentions légales</h2>
        <div class="paragraph-style">
            <h3>La Ruche Ludique</h3>
            <p>Société par actions simplifiée au capital de [capital de la société] euros</p>
            <p>Siège social : [adresse du siège social]</p>
            <p>Immatriculée au RCS de [ville d'immatriculation] sous le numéro [numéro RCS]</p>
            <p>Numéro de TVA intracommunautaire : [numéro de TVA]</p>
        </div>
        <div class="paragraph-style">
            <h3>Directeur de la publication :</h3>
            <p>Pauline de Valance</p>
        </div>



        <div class="paragraph-style">
            <h3>Contact :</h3>
            <p>[Adresse e-mail de contact]</p>
        </div>

        <div class="paragraph-style">
            <h3>Hébergement :</h3>
            <p>Le site est hébergé par [nom de l'hébergeur]</p>
            <p>Adresse de l'hébergeur : [adresse de l'hébergeur]</p>
            <p>Téléphone de l'hébergeur : [numéro de téléphone de l'hébergeur]</p>
        </div>

        <div class="paragraph-style">
            <h3>Propriété intellectuelle :</h3>
            <p>L'ensemble du contenu de ce site (textes, images, vidéos, etc.) est protégé par le droit d'auteur et autres
                droits de propriété intellectuelle. Toute reproduction, distribution ou utilisation non autorisée du contenu
                est
                strictement interdite.</p>
        </div>
        <div class="paragraph-style">
            <h3>Collecte de données personnelles :</h3>
            <p>Nous collectons des données personnelles uniquement dans le cadre de la gestion de nos activités et de la
                fourniture de nos services. Les données collectées peuvent inclure des informations telles que le nom,
                l'adresse, l'adresse e-mail, etc. Nous nous engageons à protéger la confidentialité de ces données
                conformément
                à la réglementation en vigueur. Pour plus d'informations sur notre politique de confidentialité, veuillez
                consulter notre page dédiée à la vie privée.</p>
        </div>

        <div class="paragraph-style">
            <h3>Droit applicable :</h3>
            <p>Les présentes mentions légales sont soumises au droit français. Tout litige relatif à l'interprétation ou à
                l'exécution des présentes mentions légales sera de la compétence exclusive des tribunaux français.</p>
        </div>

        <div class="paragraph-style">
            <h3>Modification des mentions légales :</h3>
            <p>Nous nous réservons le droit de modifier ces mentions légales à tout moment. Toute modification sera publiée
                sur
                cette page.</p>

            <p>Dernière mise à jour : 25/10/2023</p>
        </div>


        <Footer />
    </div>
</template>
  
<style>
h3 {
    text-decoration: underline;
}

.legal-title {
    text-align: center;
}

.paragraph-style {
    margin-left: 20px;
    margin-bottom: 40px;
}
</style>
  