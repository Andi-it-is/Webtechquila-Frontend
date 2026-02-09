<template lang="pug">

.content-wrapper
  .map-container
    h4 Anfahrtsbeschreibung
    .info-container
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
    q-separator
    .description-container
      .address-btn-wrapper
        p 
          b Adresse
          br
          | {{ address }}
        q-btn(unelevated icon="content_copy" size="small" @click="copyAdressToClipboard()" style="border-radius: 999px")
      br
      p 
        b Parkmöglichkeiten
        br
        | Parkplätze stehen in der Tiefgarage im Gebäude zur Verfügung. 
        | Nutze die Einfahrten für Parkebene 1 und Parkebene 2, diese erreichst du über die Toulouser Allee oder über die Marc-Chagall-Straße.
      p 
        br
        b Mit den öffentlichen Verkehrsmitteln
        | Den in unmittelbarer Nähe zum Hochschulzentrum gelegenen S-Bahnhof Düsseldorf Derendorf erreichst du vom Hauptbahnhof mit den S-Bahnlinien S1, S6 und S11. 
        | Darüber hinaus steuern die Buslinien 733, 752, 754, 756, 758, 807, 834 und SB55 Düsseldorf-Derendorf an.

    q-separator
    LeafletMap()
</template>

<script lang="js" setup>

import { ref } from 'vue';
import LeafletMap from 'src/components/LeafletMap.vue';
import { useQuasar } from 'quasar';

const address = ref('Toulouser Allee 53, 40476 Düsseldorf')
const $q = useQuasar()

function copyAdressToClipboard() {

  // Copy the text inside the text field
  navigator.clipboard.writeText(address.value);

  $q.notify({
    type: 'info',
    message: 'Adresse in Zwischenablage gespeichert'
  })
  
}
</script>

<style scoped>

h4 {
  margin: auto; 
  padding-top: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.content-wrapper {
  margin: auto;
  padding: 0.5rem;
  padding-top: 2rem;
}
.map-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--bg);
  padding: 0.5rem;
  max-width: 1200px;
  border-radius: 1rem;
  margin:auto;
}

.description-container {
  margin: auto; 
  max-width: 70%;
}

.info-container{
  background-color: var(--bg); 
  border-radius: 1rem; 
  display: flex; 
  width: fit-content; 
  margin: auto; 
  gap: 2em; 
  padding: 0.5rem;
  padding-top: 2rem;
}

.address-btn-wrapper {
  display: flex; 
  align-items: center;
}
</style>