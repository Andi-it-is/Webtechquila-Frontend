<template lang="pug">
  div(
    v-if="success"
    style="background-color: var(--bg); border: 1px solid var(--secondary); padding: 1rem; border-radius: 1rem; text-align: center; max-width: 600px; margin: auto; font-size: 1.25rem; margin-top: 4rem"
  )
    strong Danke für das Reservieren, {{ person }} !
    p(style="margin:8px 0 0;font-size: 14px;")
      | Du kannst diese Seite jetzt schließen. Du erhälst im Anschluss eine Bestätigungsmail.
    q-separator
    div(style="background-color: lightgreen; padding: 4px")
      p(style="font-size: 14px") Das hier ist der Inhalt der Bestätigunsmail.
      .reservation-summary
        p.text-weight-bold Zusammenfassung der Reservierung
        dl.summary-grid
          dt Datum
          dd {{ summaryData.date }}
          
          dt Uhrzeit
          dd {{ summaryData.time }} Uhr
          
          dt Gäste
          dd {{ summaryData.guests }}
          
          dt Kunde
          dd {{ summaryData.firstName }} {{ summaryData.lastName }}
          
          dt(v-if="summaryData.tableId") Tisch
          dd(v-if="summaryData.tableId") {{ summaryData.tableId }}
          
          dt(v-if="summaryData.customerNote") Notiz
          dd(v-if="summaryData.customerNote") {{ summaryData.customerNote }}

    

  div(v-else)
    pre etwas ist schief gelaufen 

  q-btn(@click="navToIndex()" label=" Zurück zur Startseite" class="primary-button")
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { api } from 'src/boot/axios';

const router = useRouter()
const route = useRoute()

const person = ref('')
const success = ref(false)

function navToIndex(){
  return router.push("/")
}

const summaryData = ref()

onMounted(async () => {

  // full reservation order. check if keys arent empty
  // const reservation = await (api.get("/reservation", { params: { aid: route.query.aid } }))

  const reservation = await (api.get("/reservation", { params: { aid: route.query.aid } }))

  const data = reservation.data.data.reservation
  person.value = `${data.firstName} ${data.lastName}`

  const confirmOrder = await (api.get("/confirm/checkoutAttempt", {
    params: {
      aid: route.query.aid,
      rid: route.query.rid
    }
  }))

  summaryData.value = confirmOrder.data.key
  
  // validate order and shit
  success.value = true 

  // add time to leave the page
})

</script>


<style scoped>
.primary-button-outlined {
  border: 2px solid var(--primary);
  color: var(--text);
  width: fit-content;
  background-color: var(--bg-dark);
}
.summary-grid {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 8px 16px;
}
dt { color: #000000; font-weight: 500; }
dd { margin: 0; font-weight: 400; }
.primary-button{
  background-color: var(--primary);
  color: var(--text-action);
}
</style>