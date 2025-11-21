<template lang="pug">

div(style="display: flex; justify-content: center")
  h4 Tisch Reservieren 
div(:class="seatPreferenceCheckbox ? 'content-wrapper-double' : 'content-wrapper-single' " )
  div(class="form-wrapper")
    q-form(class="input-container")
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
    div(class="grid-container")
      // use pagination for available timeslots.
      div(v-for="i in 10")
        div(class="time-slot")
          p {{ i }}

    q-separator(class="mini-separator")
    div(class="input-container")
      div(class="individual-input-container")
        label Sitzplatz
        q-checkbox(v-model="seatPreferenceCheckbox") Ich möchte aussuchen, wo ich sitze

    div(class="order-btn-container" v-if="!seatPreferenceCheckbox")
      q-btn(class="btn-primary") Reservieren

  transition(name="slide-card")
    div(v-if="seatPreferenceCheckbox")
      div(class="svg-container")
        RestaurantFloor()
</template>

<script setup>
import RestaurantFloor from 'src/components/reservation/RestaurantFloor.vue';
import { ref, onMounted, computed } from 'vue';

const activeTab = ref('a')

const seatPreferenceCheckbox = ref(false)

const reservationData = ref({
  guests: null,
  date: new Date(),
  time: new Date(),
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
  { value: 9, label: "9 oder mehr"},
]

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


onMounted(() => {

  // building todays date, and casting it into german format DD.MM.YYYY
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();

  const todayAsGermanDate = `${day}.${month}.${year}`

  reservationData.value.date = todayAsGermanDate

  // declaring the allowed range, in which resrevatios can be taken
  let end = new Date()
  end.setDate(end.getDate() + 90)
  end.setHours(0, 0, 0, 0)

  allowedStartDate = today.setHours(0, 0, 0, 0)
  allowedEndDate = end

})

</script>

<style scoped>

.individual-input-container{
  display: flex;
  flex-direction: column;
}
.input-container{
  display: flex;
  gap: 1rem;
}

.content-wrapper-single{
  display: flex; 
  flex-wrap: wrap; 
  align-items: stretch; 
  gap: 1rem; 
  padding: 1rem; 
  padding-left: 10%;  
  min-height: 100vh;
  /* justify-content: center; */

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
  padding: 1rem;
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
.tab-content{
  background-color: var(--bg);
  border: 2px solid var(--primary);
  border-radius: 1rem;
  padding: 1rem;
}
.q-tab-panel{
  padding: 0 !important;
  margin: auto;
}
.q-tab-panels{
  background-color: var(--bg);
  padding: 0.5rem;
}

.mini-separator{
  margin: 0rem;
  width: 100%;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  /* margin: auto; */
  max-height: 250px;
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
.time-slot{
  display: flex; 
  align-items: center;
  justify-content: center; 
  border-radius: 1rem; 
  padding: 0.5rem; 
  background-color: var(--bg-dark);
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


</style>