<template lang="pug">
  q-page
    div(style="margin-top: -56px")
      q-carousel(
        height="100dvh"
        animated
        v-model="slide"
        navigation
        infinite
        :autoplay="autoplay"
        arrows
        transition-prev="slide-right"
        transition-next="slide-left"
      )
        q-carousel-slide(:name="1" img-src="/stockfootage/main1.jpg")
        q-carousel-slide(:name="2" img-src="/stockfootage/main2.jpg")
        q-carousel-slide(:name="3" img-src="/stockfootage/main3.jpg")
        q-carousel-slide(:name="4" img-src="/stockfootage/main4.jpg")
        q-carousel-slide(:name="5" img-src="/stockfootage/main5.jpg")
        q-carousel-slide(:name="6" img-src="/stockfootage/main6.jpg")
        q-carousel-slide(:name="7" img-src="/stockfootage/main7.jpg")
      
      div.logo-overlay(tabindex="0")
        h5 Webtechquila
        p Geschmack <span style="font-style: italic; letter-spacing: 2px; padding: 0.25em; margin-left: 2px"> fom </span> aller Feinsten
    
    q-separator 
    .content
      h1(tabindex="0") Webtechquila
      p(tabindex="0") Willkommen im Webtechquila Restaurant, dem kulinarischen Hotspot im Herzen von Düsseldorf. 
      br
      p(tabindex="0") Das Restaurant verbindet moderne Kreativität mit feinster Kochkunst zu einem einzigartigen Genusserlebnis. 
        | Jedes Gericht wird mit Liebe zum Detail und ausgesuchten Zutaten der höchsten Qualität zubereitet.
        | Vom aromatischen Start über den raffinierten Hauptgang bis hin zum süßen Finale.
      br
      p(tabindex="0") Die Atmosphäre im Webtechquila vereint elegantes Design mit einem Hauch digitaler Innovation. 
        | Perfekt für Genießer, die das Außergewöhnliche suchen. Ob für ein romantisches Dinner, ein Geschäftsessen oder einen besonderen Abend mit Freunden.
        | Bei uns erwartet dich Service auf höchstem Niveau und Geschmack, der in Erinnerung bleibt.
      br
      p(tabindex="0") Zentral gelegen in Düsseldorf, ist das Webtechquila der ideale Ort für alle, die exklusive Küche und urbanes Flair lieben. 
        | Hier trifft Genuss auf Stil. Jeder Besuch wird zu einem Erlebnis.

    q-separator.divider

    .card-btn-wrapper
      .card-btn
        p Wir bieten viele verschiedene Speisen und Getränke an. Finde bereits im Vorfeld deine Favorites.  
        q-btn(class="primary-button-outlined" label="Zur Speisekarte" @click="navToDishmenu()")
      .card-btn
        p Auch wenn wir zentral gelegen sind, hilft es zu wissen wo wir genau sind. Unsere Öffnungszeiten findest du hier.
        q-btn(class="primary-button-outlined" label="Zur Anfahrt" @click="navToDirection()")
      .card-btn
        p Reservier dir jetzt deinen Sitzplatz. Egal ob für ein Geschäftsessen oder mit der Freundesgruppe.
        q-btn(class="primary-button" label="Tisch reservieren" @click="navToReservation()")

  q-dialog(v-model="globalUserWarningDialog" persistent transition-show="scale" transition-hide="scale")
    q-card(style="width: 400px; max-width: 80vw; border-radius: 12px;")
      q-card-section.row.items-center.q-pb-none
        .text-h6.text-primary
          q-icon.q-mr-sm(name="visibility_off" size="md")
          | Hinweise zu dem Demoprojekt
        q-space

      q-card-section.q-pt-md
        p.text-grey-10
          | Auf dieser Seite werden keine personenbezogenen Daten dauerhaft gespeichert. 
          | Ihre Eingaben bei der Reservierungsseite werden mit Beispielwerten überschrieben.
          | Das Projekt dient lediglich zur Demonstration.
        q-separator
        p.text-grey-10
          | Weiterhin ist es vorgesehen, dass dieses Demoprojekt E-mails versenden soll. 
          | Da keine Emailadressen gespeichert werden, werden die Anweisungen der E-mails zusätzlich dem Nutzer dargestellt. 
          | Die Anweisungen sind in grünen Kästen gekennzeichnet.
        
      q-card-actions.q-pa-md(align="right")
        q-btn(
          label="Verstanden" 
          color="primary" 
          rounded 
          unelevated 
          v-close-popup
        )


</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const slide = ref(1)
const autoplay = ref(true)
const globalUserWarningDialog = ref(true)

const router = useRouter()

function navToDishmenu() {
  router.push("/menucard")
}
function navToDirection() {
  router.push("/direction")
}
function navToReservation() {
  router.push("/reservation")
}


</script>


<style scoped>

h1 {
  font-size: 3em;
}
h1:focus-visible {
  outline: 2px solid var(--secondary);
  outline-offset: 0.5rem;
  width: fit-content;
  border-radius: 1rem;
}
h5 {
  font-weight: 700;
  margin: 0;
  margin-bottom: 8px;
  text-decoration: underline;
}
p {
  font-size: 1.25em;
}
p:focus-visible {
  outline: 2px solid var(--secondary);
  outline-offset: 0.5rem;
  width: fit-content;
  border-radius: 1rem;
}
.action-button {
  background-color: var(--bg-light);
  color: var(--text);
}
.q-carousel :deep(.q-btn) {
  background-color: var(--secondary);
}

.logo-overlay {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  pointer-events: none; /* optional */
  display: flex;
  flex-direction: column;
  padding: 1em;
  color: white;
  background-color: #00000080;
  border-radius: 1rem;

  p {
    margin: 0;
    font-size: 1em;
  }
}

.nav-button {
  background-color: var(--bg);
  color: var(--text);
}
.btn-container {
  display: flex;
  gap: 1rem;
}
.primary-button {
  background-color: var(--primary);
  color: var(--text-action);
  width: fit-content;
}
.primary-button-outlined {
  border: 2px solid var(--primary);
  color: var(--text);
  width: fit-content;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem 20%;
  padding: 1rem;
  background-color: var(--bg);
  border-radius: 1rem;
}
.card-btn-wrapper {
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem 20%;
}
.card-btn {
  flex: 1;
  background-color: var(--bg);
  border-radius: 1rem;
  padding: 1rem;
  min-width: 330px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.divider {
  margin-right: 20%; 
  margin-left: 20%;
  margin-top: 2em;
  margin-bottom: 2em;
}
@media (max-width: 1000px) {
  .content {
    margin: 1em;
  }
  .card-btn-wrapper {
    margin: 1em;
    flex-wrap: wrap;
  }
  .divider {
    margin: 1em;
  }
}
</style>