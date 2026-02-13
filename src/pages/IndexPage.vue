<template lang="pug">
  q-page
    div(style="margin-top: -56px")
      q-carousel(
        height="100dvh"
        animated
        v-model="slide"
        navigation
        infinite
        :autoplay="autoplay"
        arrows
        transition-prev="slide-right"
        transition-next="slide-left"
      )
        q-carousel-slide(:name="1" img-src="/stockfootage/main1.jpg")
        q-carousel-slide(:name="2" img-src="/stockfootage/main2.jpg")
        q-carousel-slide(:name="3" img-src="/stockfootage/main3.jpg")
        q-carousel-slide(:name="4" img-src="/stockfootage/main4.jpg")
        q-carousel-slide(:name="5" img-src="/stockfootage/main5.jpg")
        q-carousel-slide(:name="6" img-src="/stockfootage/main6.jpg")
        q-carousel-slide(:name="7" img-src="/stockfootage/main7.jpg")
      
      div.logo-overlay(tabindex="0")
        h5 Webtechquila Restaurant
        p Geschmack <span style="font-style: italic; letter-spacing: 1px; padding: 0.25em; margin-left: 2px"> fom </span> aller Feinsten
    
    h1 Startseite

</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const slide = ref(1)
const autoplay =  ref(true)

const router = useRouter()

</script>


<style>

h5 {
  font-weight: 700;
  margin: 0;
  margin-bottom: 8px;
  text-decoration: underline;
}
.action-button {
  background-color: var(--bg-light);
  color: var(--text);
}
.q-carousel {
  
  .q-btn {
    background-color: var(--secondary);

  }
}
.logo-overlay {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  pointer-events: none; /* optional */
  display: flex;
  flex-direction: column;
  padding: 1em;
  color: white;
  background-color: #00000080;
  border-radius: 1rem;

  p {
    margin: 0;
    font-size: 1em;
  }
}
</style>