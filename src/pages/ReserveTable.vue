<template lang="pug">

div(class="content-wrapper")

  div(class="input-container")
    div(class="individual-input-container")
      label Personen
      q-input(v-model="reservationData.people" dense outlined)
    div(class="individual-input-container")
      label Datum
      q-input(v-model="reservationData.date" :rules="[validateGermanDate]" mask="##.##.####" fill-mask dense outlined)
        template(v-slot:append)
          q-icon(name="event" class="cursor-pointer")
            q-popup-proxy(cover transition-show="scale" transition-hide="scale")
              q-date(
                v-model="reservationData.date"
                mask="DD.MM.YYYY"
                locale="de-DE"
                today-btn
              )
                div()
                  q-btn(v-close-popup label="Schließen" color="primary" flat)
  div(class="grid-container")
    div(v-for="i in 15")
      p {{ i }}

  
  q-separator(class="mini-separator")
  div(class="input-container")
    div(class="individual-input-container")
      label Sitzplatz
      q-checkbox(v-model="seatPreferenceCheckbox") Ich möchte aussuchen, wo ich sitze

  div(class="order-btn-container" v-if="!seatPreferenceCheckbox")
    q-btn(class="btn-primary") Reservieren

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
  people: 2,
  date: new Date(),
  time: new Date(),
})


function validateGermanDate(val) {
  if (!val) return 'Bitte ein Datum eingeben'

  const regex = /^(\d{2})\.(\d{2})\.(\d{4})$/

  if (!regex.test(val)) {
    return 'Bitte TT.MM.JJJJ verwenden.'
  }

  // checking if the given date is an actual date (i.e. leap years or short months)
  const [day, month, year] = val.split('.').map(Number)
  const parsedDate = new Date(year, month - 1, day)

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

  console.log("toooo", todayAsGermanDate)

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

.content-wrapper{
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  background-color: var(--bg);
  /* align-items: flex-start;
  padding-left: 20%; */
  align-items: flex-start;
  max-width: fit-content;
  margin: auto;
  margin-top: 1rem;
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
  margin: auto;
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
</style>
