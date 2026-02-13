<template lang="pug">

  q-layout(view="hHh LpR lFr")
  
    q-page-container(style="padding: 1rem; padding-top: 4rem")
      router-view()
</template>


<script lang="js" setup>
import { ref, onMounted, computed } from 'vue';

onMounted(() => {

  console.log("checkout layout verwendet")

})

</script>

<style scoped>

</style>
