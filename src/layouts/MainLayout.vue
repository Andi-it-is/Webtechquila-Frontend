<template lang="pug">
  q-layout(view="hHh LpR lFr")

    q-header(class="brand-header")

      div(class="header-container")
        div(class="navigation-button-container")
          q-btn(dense flat round icon="menu" class="primary-button-outlined text-secondary" @click="toggleLeftDrawer")
          q-btn(class="primary-button" unelevated style="margin-left: 0.5rem" @click.prevent="navToReservation()" label="Tisch reservieren")
    q-drawer(v-model="leftDrawerOpen" side="left" overlay behavior="mobile" bordered)
      q-list(bordered separator)
        div(style="margin-top: 0.25rem")
        q-item(clickable v-ripple @click="navToIndex()")
          q-item-section(avatar)
            q-icon(name="home")
          q-item-section Startseite

        q-item(clickable v-ripple @click="navToDishmenu()")
          q-item-section(avatar)
            q-icon(name="restaurant")
          q-item-section Speisekarte

        q-item(clickable v-ripple @click="navToDirection()")
          q-item-section(avatar)
            q-icon(name="map")
          q-item-section Anfahrt und Kontakt

    q-page-container()
      router-view()

      q-separator(style="margin-top: 16em")

      div(class="legal-container")
        p.sharp Zuletzt aktualisiert am {{ today }}
        div(style="display: flex; gap: 1rem")
          router-link(to="/datenschutz" aria-label="Datenschutz") Datenschutz
          router-link(to="/impressum" aria-label="Impressum") Impressum
</template>


<script lang="js" setup>
import { ref, watch, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'


const router = useRouter()
const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
const today = computed(() => { 
  return new Date().toLocaleDateString('de')
})

function navToIndex(){
  return router.push("/")
}
function navToReservation() {
  return router.push("/reservation")
}
function navToDishmenu() {
  router.push("/menucard")
}
function navToDirection() {
  router.push("/direction")
}

onMounted(() => {


})

</script>

<style scoped>
.brand-header {
  background-color: var(--bg-nav) !important;
  color: var(--text);
}
.q-header {
  background-color: #FFFFFF40 !important;
  color: white !important;

  .q-toolbar__title {
    color: white !important;
  }
}
.action-button {
  background-color: var(--bg-light);
  color: var(--text);
}
.nav-button {
  background-color: var(--bg);
  color: var(--text);
}
.primary-button{
  background-color: var(--primary);
}
.primary-button:hover {
  transform: translateY(-2px);
  transition: 0.25s;
}
.primary-button-outlined {
  border: 2px solid var(--primary);
  color: var(--text);
  width: fit-content;
  background-color: var(--bg-dark);
}
.header-container{
  display: flex;
  justify-content: space-between;
  padding: 10px 2%;
} 
.navigation-button-container{
  display: flex;
  width: 100%;
  gap: 0.5rem;
  justify-content: space-between;
}
.sharp {
  color: var(--text);
  font-size: 16px;
  margin-left: 0;
}
.legal-container {
  display: flex;
  justify-content: space-between;
  padding-left: 2rem;
  padding-right: 2rem;
  margin-bottom: 6rem;
}
@media (max-width: 800px) {
  .primary-button:hover {
    transform: none;
  }
  .legal-container{
    flex-direction: column;
    margin: auto;
    margin-bottom: 2rem;
  }
}
.q-item:focus-visible {
  outline: 2px solid var(--secondary);
  border-radius: 0.5rem;
}
.q-item {
  padding: 16px 20px;
}

</style>
