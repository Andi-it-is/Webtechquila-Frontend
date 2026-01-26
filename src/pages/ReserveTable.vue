<template lang="pug">

div(class="stockfootage-container")
  div(v-for="link in stockfootage" :key="link" class="img-wrapper")
    img(:src="link")
    
div(style="display: flex; justify-content: center")
  h2 Tisch Reservieren 
div(class="content-wrapper-single")
  div(class="info-container")
    div
      p(style="font-weight: 700; font-size: 1.125rem") Kontakt
      p <strong>Restaurant Webtechquila </strong> 
      p Toulouser Allee 53,<br> 40476 Düsseldorf
      p(style="margin-bottom: 0px") Telefon: +49 1234 567890 
      p
        | Mail:
        a( href="mailto:mail@mail.de" style="font-size: 14px; text-decoration: underline; margin-left: 4px") mail@mail.de
    div
      p(style="font-weight: 700; font-size: 1.125rem") Öffnungszeiten
      p <strong>Montag & Dienstag</strong> <br/> Ruhetag
      p <strong>Mittwoch bis Sonntag</strong> <br/> 15:00 bis 23:00
div(class="content-wrapper-single")
  div(class="form-wrapper")
    q-form(
      class="input-container" 
      ref="formRef" 
      @submit="onSubmit"
    )
      div(class="individual-input-container")
        label Personen
        q-select(
          v-model="reservationData.guests" 
          dense outlined
          style="width: 200px"
          :options="guestsOptions"
          :display-value="`${reservationData.guests ? reservationData.guests.label : '-'}`"
          :rules="[ val => val || 'Anzahl der Personen auswählen']"
        )
      div(class="individual-input-container")
        label Datum
        q-input(
          v-model="reservationData.date" 
          :rules="[validateGermanDate]" 
          mask="##.##.####" fill-mask dense outlined
          style="width: 200px"
        )
          template(v-slot:append)
            q-icon(name="event" class="cursor-pointer")
              q-popup-proxy(cover transition-show="scale" transition-hide="scale")
                q-date(
                  v-model="reservationData.date"
                  mask="DD.MM.YYYY"
                  locale="de-DE"
                  today-btn
                  :options="dateOptions"
                )
                  div()
                    q-btn(v-close-popup label="Schließen" color="primary" flat)
    div(:class="seatPreferenceCheckbox ? 'disabled-timeslot-container' : 'timeslot-container'")
      a(tabindex="0" style="width: fit-content; padding: 4px").hint {{ bestFitReservation.timeSlots.length && tableOptions.wasUserInput ? `${bestFitReservation.timeSlots.length} Ergebnisse` : '' }}
      //- p {{ !bestFitReservation.timeSlots.length && !tableOptions.wasUserInput ? 'Keine verfügbaren Zeiträume an diesem Tag' : 'Bitte Gäste und Datum wählen' }}
      div(class="grid-container")
        div(v-for="option in bestFitReservation.timeSlots" :key="option.time")
          div(:class="option.selected ? 'time-slot-selected' : 'time-slot'" tabindex="0" @click="selectTimeSlot(option)")
            p(style="margin: 0") {{ option.time }}

    q-separator(class="mini-separator")
    div(class="individual-input-container")
      q-checkbox(v-model="seatPreferenceCheckbox" :disable="!enableCheckbox" style="width: fit-content") Ich möchte aussuchen, wo ich sitze

    div(class="order-btn-container" v-if="!seatPreferenceCheckbox")
      q-btn(class="btn-primary" type="submit" @click="onSubmit()") Reservieren

  transition(name="slide-card")
    div(v-if="seatPreferenceCheckbox")
      div(class="svg-container")
        RestaurantFloor(
          v-model:tableData="tableOptions.data" 
          @orderData="handleEmit" 
        )

</template>

<script setup>
import RestaurantFloor from 'src/components/reservation/RestaurantFloor.vue';
import { useCheckoutStore } from 'src/stores/checkoutStore';
import { ref, onMounted, computed, onUnmounted, watch, reactive } from 'vue';
import { useRouter, onBeforeRouteLeave } from 'vue-router';
import { api } from 'src/boot/axios';

const store = useCheckoutStore()

const router = useRouter()

const seatPreferenceCheckbox = ref(false)
const enableCheckbox = ref(false)

const reservationData = ref({
  guests: null,
  date: null,
})
const guestsOptions = [
  { value: 1, label: "1"},
  { value: 2, label: "2"},
  { value: 3, label: "3"},
  { value: 4, label: "4" },
  { value: 5, label: "5"},
  { value: 6, label: "6 "},
  { value: 7, label: "7"},
  { value: 8, label: "8" },
  // { value: 9, label: "9 oder mehr"},
]
const showManyGuestsWarning = ref(false)
const tableOptions = reactive({
  wasUserInput: false,
  data: {}
})
const bestFitReservation = ref({
  timeSlots: [],
  selectedTimeSlot: ''
})

// start date (usually today) and end date range, in which the user is allowed to make a seat reservation
let allowedStartDate;
let allowedEndDate; 

/**
 * @param date quasar date to validate against
 */
function dateOptions(date) {

  const [y, m, d] = date.split('/').map(Number)
  const current = new Date(y, m - 1, d)

  return current >= allowedStartDate && current <= allowedEndDate

}

function parseGermanDateToDate(germanDateStr) {
  const [day, month, year] = germanDateStr.split('.').map(Number)
  return new Date(year, month - 1, day)
}


function validateGermanDate(val) {

  // empty date, that matches the mask or empty value
  if (val === '__.__.____' || !val) {
    return 'Bitte ein Datum eingeben'
  }

  const regex = /^(\d{2})\.(\d{2})\.(\d{4})$/

  if (!regex.test(val)) {
    return 'Bitte TT.MM.JJJJ verwenden.'
  }

  // checking if the given date is an actual date (i.e. leap years or short months)
  const [day, month, year] = val.split('.').map(Number)
  const parsedDate = new Date(year, month - 1, day)

  // Example usage
  const valDate = parseGermanDateToDate(val)

  if (valDate < allowedStartDate || valDate > allowedEndDate) {
    return 'Zeitraum muss zwischen heute und 90 Tage in der Zukunft liegen'
  }

  const isValid =
    parsedDate.getFullYear() === year &&
    parsedDate.getMonth() === month - 1 &&
    parsedDate.getDate() === day

  return isValid || 'Ungültiges Datum'
}

/**
 * Function to handle event emit from a component. when resrving table through this component, nav to checkout
 * @param data data from RestaurantFloor Component
 */
function handleEmit(data) {
  const tableId = data.tableId
  store.setOrderId(tableId)

  navToCheckout()
}

async function navToCheckout() {

  store.setOrderData(reservationData.value)

  const result = await api.get('/hello')
  router.push(`/reservation/checkout`)

}

const formRef = ref(null)
let mapCounter = 0

function onSubmit() {

  formRef.value.validate().then(valid => {
    if (!valid) return

    else {
      navToCheckout()
    }
  })
}

// watch changes in user input, get new timeslot results
watch(reservationData.value, () => {
  getAvailableTimeslots()
}, { deep: true }
)
async function getAvailableTimeslots() {

  // api call only if both user inputs are not empty
  if (reservationData.value.guests && reservationData.value.date) {

    // if form is invalid (i.e. invalid but not empty date, return), clear table data and disable svg view
    const valid = await formRef.value.validate()
    if (!valid) {
      seatPreferenceCheckbox.value = false
      bestFitReservation.value.timeSlots = []
      bestFitReservation.value.selectedTimeSlot = ""
      tableOptions.value = []

      console.log('Form invalid:', valid)
      return
    }

    const reqObj = {
      guests: reservationData.value.guests.value,
      date: reservationData.value.date
    }
    if (reqObj.guests > 8) {
      showManyGuestsWarning.value = true
      return
    }
    showManyGuestsWarning.value = false

    const response = await (await api.post('/timeslots', reqObj)).data

    tableOptions.wasUserInput = true
    enableCheckbox.value = true

    // filling table svg
    const svgTableOptions = response.sizeOptimizedTables
    tableOptions.data = svgTableOptions // data for defineModel in Component. Might need all data?

    // filling data for non-svg reservations
    bestFitReservation.value = response.bestFit
    bestFitReservation.value.timeSlots = bestFitReservation.value.timeSlots.map(time => ({
      time,
      selected: false
    }))
  } else {
    enableCheckbox.value = false
  }
}

function selectTimeSlot(timeSlot) {
  bestFitReservation.value.timeSlots.forEach((t) => {
    t.selected = false
  })
  bestFitReservation.value.selectedTimeSlot = timeSlot.time
  timeSlot.selected = true
}

onMounted(() => {

  // building todays date, and casting it into german format DD.MM.YYYY
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();

  const todayAsGermanDate = `${day}.${month}.${year}`

  // reservationData.value.date = todayAsGermanDate

  // declaring the allowed range, in which resrevatios can be taken
  let end = new Date()
  end.setDate(end.getDate() + 90)
  end.setHours(0, 0, 0, 0)

  allowedStartDate = today.setHours(0, 0, 0, 0)
  allowedEndDate = end

})

onBeforeRouteLeave((to, from, next) => {
  if (to.path === '/reservation/checkout') {
    next()
  } else {
    store.clear()
    next()
  }
})

const stockfootage = [
  "https://picsum.photos/id/488/300/200",
  "https://picsum.photos/id/999/300/200",
  "https://picsum.photos/id/292/300/200",
  "https://picsum.photos/id/225/300/200",
]

const pageNumber = ref(1)

</script>

<style scoped>

.individual-input-container{
  display: flex;
  flex-direction: column;
}
.input-container{
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.content-wrapper-single{
  display: flex; 
  flex-wrap: wrap; 
  align-items: stretch; 
  gap: 1rem; 
  padding: 1rem; 
  justify-content: center;

}

.content-wrapper-double{
  display: flex; 
  flex-wrap: wrap; 
  align-items: stretch; 
  gap: 1rem; 
  padding: 1rem; 
  justify-content: center;
  transition: padding 0.3s ease-out;
  min-height: 100vh;
}

.form-wrapper{
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  background-color: var(--bg);
  margin-top: 1rem;
  max-width: fit-content;
  max-height: fit-content;
  border-radius: 1rem;
  align-self: flex-start;   /* prevents parent flex from stretching. used because container looks different in chrome vs firefox */

}

.svg-container{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.75rem;
  width: fit-content;
  height: fit-content;
  background-color: oklch(0.96 0.02 264);
  margin: auto;
  margin-top: 1rem;
  border-radius: 1rem;
}
.filter-bar-container{
  background-color: var(--bg);
  display: flex;
  margin: auto;
}
.mini-separator{
  margin: 0rem;
  width: 100%;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  max-height: 150px;
  overflow-y: scroll;
}
.order-btn-container{
  display: flex;
  width: 100%;
  justify-content: end;
}
.btn-primary{
  background-color: var(--primary);
  color: var(--text-action);
}

.disabled-timeslot-container {
  cursor: not-allowed;
  opacity: 0.3;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  pointer-events: none;
}
.timeslot-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.time-slot{
  display: flex; 
  align-items: center;
  justify-content: center; 
  border-radius: 1rem; 
  padding: 0.5rem; 
  background-color: var(--bg-dark);
}
.time-slot-selected{
  display: flex; 
  align-items: center;
  justify-content: center; 
  border-radius: 1rem; 
  padding: 0.5rem; 
  background-color: var(--secondary);
  color: var(--text-action);
}
.time-slot:hover {
  cursor: pointer;
}

.slide-card-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}
.slide-card-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.slide-card-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.slide-card-leave-from {
  opacity: 1;
  transform: translateX(0px);
}
.slide-card-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.slide-card-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.stockfootage-container{
  display: flex; 
  width: 100%; 
  flex: 1 1 100%; 
  margin-bottom: 2rem; 
  justify-content: center;
  padding-top: 1rem;
  gap: 0.5rem;
}  

h2 {
  font-size: 2.25rem;
  font-weight: 700;
}

.info-container{
  background-color: var(--bg); 
  border-radius: 1rem; 
  display: flex; 
  width: fit-content; 
  margin: auto; 
  gap: 4rem; 
  padding: 2rem;
}
.hint{
  font-size: 1em;
}
@media (max-width: 1300px) {
  .img-wrapper:nth-child(n + 4) {
    display: none;
  }
}
@media (max-width: 1000px) {
  .img-wrapper:nth-child(n + 3) {
    display: none;
  }
}

/* expand upon this mediq query to mobile views. adjust the spacing from the input menu card and the restaurant floor svg */
@media (max-width: 700px) {
  .img-wrapper:nth-child(n + 2) {
    display: none;
  }

  .grid-container{
    grid-template-columns: repeat(3, 1fr);
  }

  .info-container{
    gap: 1rem;
    padding: 1rem;
    padding-top: 2rem;
  }

  .svg-container{
    aspect-ratio: 4/3;
  }
}
</style>