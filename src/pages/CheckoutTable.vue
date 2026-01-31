<template lang="pug">


div(v-if="isLoaded" style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap-reverse")
  div(style="background-color: var(--bg); padding: 2rem; max-width: 600px; gap: 2rem; display: flex; flex-direction: column; border-radius: 1rem; max-width: 460px")
    q-form(
      style="display: flex; flex-direction: column; gap: 1rem"
      ref="formRef" 
      @submit="onSubmit"
      greedy
    )
      div(style="display: flex; gap: 1rem")
        div(style="width: 100%")
          label Vorname
          q-input(
            v-model="checkoutData.firstname" dense outlined 
            :rules="[ val => val.length != 0 || 'Vorname eingeben' ]"
          )
        div(style="width: 100%")
          label Nachname
          q-input(
            v-model="checkoutData.lastname" dense outlined
            :rules="[ val => val.length != 0 || 'Nachname eingeben' ]"
          )
      div(style="width: 100%")
        label E-mail
        q-input(
          v-model="checkoutData.email" dense outlined
          :rules="[ val => val.length != 0 || 'E-mail eingeben' ]"
        )
      div(style="width: 100%")
        label Telefonnummer
        q-input(
          v-model="checkoutData.tel" dense outlined
          :rules="[ val => val.length != 0 || 'Telefonnummer eingeben' ]"
        )
      div(style="width: 100%")
        label Notiz an das Restaurant (Optional)
        q-input(v-model="checkoutData.note" dense outlined type="textarea")
    div(style="display: flex; justify-content: space-between; margin-top: 1rem")
      q-btn(class="action-button" unelevated @click="navToReservation()") Abbrechen
      q-btn(class="btn-primary" tyoe="submit" @click="onSubmit()") Tisch reservieren

    

  div(style="background-color: var(--bg); padding: 1rem; align-self: flex-end; display: flex; flex-direction: column; border-radius: 1rem")
    // condition based on if vue store has a table nummer (i.e. user wants to decide where to sit)
    p.hint {{ tableId }}
    h4 Reservierungsdetails
    div(style="display: flex; flex-wrap: wrap; gap: 4px")
      div(style="min-width: 100px")
        .read-only-label Datum
        p {{ reservationData.date }}
      div(style="min-width: 100px")
        .read-only-label Uhrzeit
        p {{ reservationData.time }}
      div(style="min-width: 100px")
        .read-only-label Personen
        p {{ reservationData.guests }}

pre() {{ order }}
pre ---------
pre() {{ chk }}

</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import { useRouter, onBeforeRouteLeave, useRoute } from 'vue-router'
import { useCheckoutStore } from 'src/stores/checkoutStore';
import { api } from 'src/boot/axios';
const store = useCheckoutStore()

const router = useRouter()
const route = useRoute()

const isLoaded = ref(false)

const isEarlyLeave = ref(true)
const formRef = ref(null)

const order = ref()
const chk = ref()

const checkoutData = ref({
  firstname: '',
  lastname: '',
  email: '',
  tel: '',
  note: '',
})
const reservationData = ref({
  guests: null,
  date: null,
  time: null,
})
const tableId = computed(() => {
  if (order.value.prefferedSeat) {
    return `Tischnummer ${order.value.tableId}`
  }
})

function navToReservation(){
  return router.push("/reservation")
}
function onSubmit() {

  formRef.value.validate().then(valid => {
    if (!valid) return

    else {

      console.log('forrm submitted, hier den 2. Teil des Checkout Prozesses starten (mail mit validate und so)')


      // api request to start email confirmation process
    }
  })
}

function isoToGermanDate(isoDate) {
  const date = new Date(isoDate)
  if (isNaN(date.getTime())) return ''

  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const yyyy = date.getFullYear()

  return `${dd}.${mm}.${yyyy}`
}
function formatTimeToGerman(time) {
  const match = time?.match(/^(\d{2}):(\d{2})/)
  if (!match) return ''

  return `${match[1]}:${match[2]} Uhr`
}


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

onMounted( async() => {

  window.addEventListener("beforeunload", beforeUnloadHandler)

  const reservation = await (api.get("/reservation", { params: { aid: route.query.aid } }))

  order.value = reservation.data.data.reservation
  chk.value = reservation.data.data

  isLoaded.value = true

  // setInterval(() => {
  //   console.log(tableId.value)
  // }, 3000)

  reservationData.value.date = isoToGermanDate(order.value.date)
  reservationData.value.time = formatTimeToGerman(order.value.time)
  reservationData.value.guests = order.value.guests
})

onUnmounted(() => {
  window.removeEventListener("beforeunload", beforeUnloadHandler)

  store.clear()
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

.action-button {
  background-color: var(--bg-light);
  color: var(--text);
}
.btn-primary{
  background-color: var(--primary);
  color: var(--text-action);
}
</style>