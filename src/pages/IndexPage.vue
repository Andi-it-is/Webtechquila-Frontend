<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
    <q-btn class="action-button" @click="navToReservation()" label="Klick mich zur Reservier Page"/>
  </q-page>



</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

function navToReservation(){
  return router.push("/reservation")
}
</script>


<style>
.action-button {
  background-color: var(--bg-light);
  color: var(--text);
}
</style>