<template lang="pug">

div(class="impressum-container")
  
  h3 Impressum
  h4 Privatperson

  p Andreas Ivanov
  p Stahlenhauser Straße 39
  p 40699 Erkrath
  
  h4 Kontaktmöglichkeiten
  p E-mail-Adresse: andreasivanov80@gmail.com

  h4 Weitere Kontaktmöglichkeiten 
  p LinkedIn
    
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';

onMounted(() => {

  
})
</script>

<style scoped>
h3 {
  font-weight: 700;
  font-size: 2rem;
  line-height: 2rem;
  letter-spacing: normal;
}
h4 {
  font-weight: 700;
  font-size: 1.55rem;
  line-height: 1.5rem;
  letter-spacing: normal;
}
p {
  font-size: 16px;
}
.impressum-container{
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  margin: auto;
  padding: 1rem;
}
.a11y:focus-visible {
  outline: 2px solid var(--secondary);
  outline-offset: 0.5rem;
  border-radius: 0.5rem;
}
</style>
