<!-- <script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

const slides = [
  { id: '1', images: '/images/ark-nova.jpg'},
  { id: '2', images: '/images/greenville-1989.jpg'},
  { id: '3', images: '/images/living-forest.jpg'},
  { id: '4', images: '/images/pandemie.jpg'},
]
</script>

<template>
    <Carousel :infinite="true">
      <Slide v-for="(slide, id) in slides" :key="id">
        <img :src="slide.images" alt="Carousel Image">
      </Slide>
      <Navigation />
    </Carousel>
  </template> -->

  <script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

const slides = [
  { id: '1', title: 'Ark Nova', img: '/images/ark-nova.jpg' },
  { id: '2', title: 'Greenville 1989', img: '/images/greenville-1989.jpg' },
  { id: '3', title: 'Living Forest', img: '/images/living-forest.jpg' },
  { id: '4', title: 'Pandémie', img: '/images/pandemie.jpg' },
]
</script>

<template>
    <Carousel>
        <Slide v-for="slide in slides" :key="slide.id">
            <div class="carousel__item">
                <h3>{{ slide.title }}</h3>
                <img :src="slide.img" alt="Carousel Image">
            </div>
        </Slide>
        <Navigation />
  </Carousel>
  </template>