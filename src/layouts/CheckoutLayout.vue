<template lang="pug">

  q-layout(view="hHh LpR lFr")

    q-page-container()
      p das ist das layout von checkout
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
