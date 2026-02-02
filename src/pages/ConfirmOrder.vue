<template lang="pug">
  div(
    v-if="success"
    style="background-color: var(--bg); border: 1px solid var(--secondary); padding: 1rem; border-radius: 1rem; text-align: center; max-width: 600px; margin: auto; font-size: 1.25rem; margin-top: 4rem"
  )
    strong Danke für das Reservieren, {{ person }} !
    p(style="margin:8px 0 0;font-size: 14px;")
      | Du kannst diese Seite jetzt schließen. Du erhälst im Anschluss eine Bestätigungsmail.
  div(
    v-else
  )
    p etwas ist schief gelaufen

</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { api } from 'src/boot/axios';

const router = useRouter()
const route = useRoute()

const person = ref('')
const success = ref(false)

onMounted(async () => {

  // full reservation order. check if keys arent empty
  // const reservation = await (api.get("/reservation", { params: { aid: route.query.aid } }))

  const reservation = await (api.get("/reservation", { params: { aid: route.query.aid } }))

  /**
   * ! check expires at date
   */
  const data = reservation.data.data.reservation
  person.value = `${data.firstName} ${data.lastName}`

  const confirmOrder = await (api.get("/confirm/checkoutAttempt", {
    params: {
      aid: route.query.aid,
      rid: route.query.rid
  }}))

  // validate order and shit
  success.value = true 

  // add time to leave the page
})

</script>


<style>

</style>