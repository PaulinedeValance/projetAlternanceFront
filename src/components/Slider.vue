<script setup lang="ts">
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";

const slides = [
  { id: "1", title: "Ark Nova", img: "/images/ark-nova.jpg" },
  { id: "2", title: "Greenville 1989", img: "/images/greenville-1989.jpg" },
  { id: "3", title: "Living Forest", img: "/images/living-forest.jpg" },
  { id: "4", title: "Pandémie", img: "/images/pandemie.jpg" },
];
</script>

<template>
  <div class="carousel-container">
    <Carousel :wrap-around="true" :autoplay="4000" style="width: 500px;" class="custom-carousel">
      <Slide v-for=" slide  in  slides " :key="slide.id">
        <div class="carousel__item">
          <h3 class="carousel-title">{{ slide.title }}</h3>
          <img :src="slide.img" alt="Carousel Image" />
        </div>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>

<style >
@import url("https://fonts.googleapis.com/css2?family=Didact+Gothic&family=Pacifico&display=swap");

.carousel-container {
  display: flex;
  justify-content: center;
}

.carousel__item {
  min-height: 200px;
  width: 100%;
  font-size: 20px;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
}

.carousel__slide {
  padding: 10px;
}

.carousel-title {
  font-family: "Didact Gothic", sans-serif;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
}

@media (max-width: 1329px) {
  .carousel-container {
    display: none;
  }
}
</style>
