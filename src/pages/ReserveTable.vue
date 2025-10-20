<template lang="pug">

div(class="svg-container")
  RestaurantFloor()

</template>

<script setup>
import RestaurantFloor from 'src/components/reservation/RestaurantFloor.vue';
</script>

<style scoped>

.svg-container{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  width: fit-content;
  height: fit-content;
  background-color: lightgray;
  margin: auto;
  margin-top: 1rem;
}
</style>