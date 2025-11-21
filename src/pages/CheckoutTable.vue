<template lang="pug">

  q-stepper(
    v-model="activeStep"
  )
  div(style="background-color: aqua; padding: 2rem")
    p im checkout page

    q-btn(class="action-button" @click="navToReservation()" label="route nav")
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import { useCheckoutStore } from 'src/stores/checkoutStore';
const store = useCheckoutStore()

const router = useRouter()

function navToReservation(){
  return router.push("/reservation")
}

const activeStep = ref(1)


const isEarlyLeave = ref(true)

// 1. Browser reload/close protection
const beforeUnloadHandler = (event) => {

  console.log("event im berfore unload handler ", event)

  if (!isEarlyLeave.value) return
  event.preventDefault()
  event.returnValue = ""
}

// 2. In-app navigation protection
onBeforeRouteLeave((to, from, next) => {
  
  console.log(to, from, next)
  if (!isEarlyLeave.value) return next()
  
  const answer = confirm(
    "You have unsaved changes. If you leave now, your progress will be lost."
  )
  next(answer)
})

onMounted(() => {
  console.log("checkoutTable.vue file - store: ", store.getOrderId())

  window.addEventListener("beforeunload", beforeUnloadHandler)
})

onUnmounted(() => {
  window.removeEventListener("beforeunload", beforeUnloadHandler)
})

</script>

<style scoped>

</style>