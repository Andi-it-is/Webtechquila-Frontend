<template lang="pug">


div(style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap-reverse")
  div(style="background-color: var(--bg); padding: 2rem; max-width: 600px; gap: 2rem; display: flex; flex-direction: column")
    div(style="display: flex; gap: 1rem")
      div(style="width: 100%")
        label Vorname
        q-input(dense outlined)
      div(style="width: 100%")
        label Nachname
        q-input(dense outlined)
    div(style="width: 100%")
      label E-mail
      q-input(dense outlined)
    div(style="width: 100%")
      label Telefonnummer
      q-input(dense outlined)
    div(style="width: 100%")
      label Notiz an das Restaurant (Optional)
      q-input(dense outlined type="textarea")

  div(style="background-color: var(--bg); padding: 1rem; align-self: flex-end; display: flex; flex-direction: column")
    // condition based on if vue store has a table nummer
    p.hint(v-if="condition") Tischnummer 13
    h4 Reservierungsdetails
    div(style="display: flex; flex-wrap: wrap; gap: 1rem")
      div(style="min-width: 100px")
        .read-only-label Datum
        p 24.11.2025
      div(style="min-width: 100px")
        .read-only-label Uhrzeit
        p 19:30
      div(style="min-width: 100px")
        .read-only-label Personen
        p 4

</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import { useCheckoutStore } from 'src/stores/checkoutStore';
const store = useCheckoutStore()

const router = useRouter()
const condition = ref(true)

function navToReservation(){
  return router.push("/reservation")
}

const isEarlyLeave = ref(true)


// 1. Browser reload/close protection
const beforeUnloadHandler = (event) => {

  if (!isEarlyLeave.value) return
  event.preventDefault()
  event.returnValue = ""
}

// 2. In-app navigation protection
onBeforeRouteLeave((to, from, next) => {
  
  if (!isEarlyLeave.value) return next()
  
  const answer = confirm(
    "You have unsaved changes. If you leave now, your progress will be lost."
  )
  next(answer)
})

onMounted(() => {

  window.addEventListener("beforeunload", beforeUnloadHandler)

  console.log("store. get data ", store.getOrderData())
})

onUnmounted(() => {
  window.removeEventListener("beforeunload", beforeUnloadHandler)
})

</script>

<style scoped>

h4 {
  margin: 0rem 0rem 1rem 0rem;
  font-weight: 600;
  font-size: 1.5rem;
}
.read-only-label{
  font-weight: 600;
}
.hint{
  margin: 0;
  color: var(--text-muted);
}
</style>