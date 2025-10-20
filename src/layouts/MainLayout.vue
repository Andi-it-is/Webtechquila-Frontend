<template lang="pug">
  q-layout(view="hHh LpR lFr")

    q-header(class="brand-header")

      div(class="header-container")
        div(class="theme-switch-container")
          q-btn(class="darkmode-button" flat round @click="toggleDarkMode()") darkmode
        div(class="navigation-button-container")
          q-btn(class="nav-button" unelevated @click="navToIndex()") IndexPage
          q-btn(class="nav-button" unelevated) text
          q-btn(class="primary-button" unelevated style="margin-left: 0.5rem" @click.prevent="navToIndex('contact')") reservieren

    q-page-container()
      router-view()

      q-separator()

      div(class="legal-container")
        p.sharp Zuletzt aktualisiert am {{ today }}
        div(style="display: flex; gap: 1rem")
          router-link(to="/impressum" aria-label="Impressum") Impressum
          router-link(to="/datenschutz" aria-label="Datenschutz") Datenschutz
</template>


<script lang="js" setup>
import { ref, watch, nextTick, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar, Dark } from 'quasar'


const router = useRouter()
const $q = useQuasar()
const isDark = computed(() => {
  return $q.dark.isActive
})
function toggleDarkMode() {
  $q.dark.toggle()
  $q.localStorage.set("darkmode", isDark.value)
}

const today = computed(() => { 
  return new Date().toLocaleDateString('de')
})
function navToIndex(){
  return router.push("/")
}

onMounted(() => {

  try {
    const theme = $q.localStorage.getItem("darkmode")
    $q.dark.set(theme)

  } catch {
    console.log("no preference settings found in localstorage")
  }


})

</script>

<style scoped>
.brand-header {
  background-color: var(--bg-nav) !important;
  color: var(--text);
}
.q-header {
  background-color: var(--bg-nav-topbar);
  color: white !important;

  .q-toolbar__title {
    color: white !important;
  }
}

.darkmode-button {
  background-color: var(--bg-dark);
  color: var(--text);
}
.action-button {
  background-color: var(--bg-light);
  color: var(--text);
}
.nav-button {
  background-color: var(--bg);
  color: var(--text);
}
.theme-button {
  background-color: var(--bg);
  color: var(--text);
}
p {
  margin: 0;
  margin-left: 0.25rem;
}
.selected-language {
  outline: 2px solid var(--primary);
}
.outlined-button{
  background-color: var(--bg-dark);
  border: 2px solid var(--primary) !important;
  color: var(--text);
}
.primary-button{
  background-color: var(--primary);
}
.primary-button:hover {
  transform: translateY(-2px);
  transition: 0.25s;
}

.header-container{
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.navigation-button-container{
  display: flex;
  gap: 0.5rem;
}
.dropdown-container{
  padding: 1rem;
  margin-top: 0.5rem;
  background-color: var(--bg-light);
}
.dropdown-options{
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
.item-sub-container{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
}
.theme-switch-container{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
}
.sharp{
  color:  var(--text);
  font-size: 16px;
  margin-left: 0;
}
.legal-container{
  display: flex;
  justify-content: space-between;
  padding-left: 2rem;
  padding-right: 2rem;
  margin-bottom: 6rem;
}
@media (max-width: 800px) {
  .nav-button {
    display: none;
  }
  .primary-button:hover {
    transform: none;
  }
  .legal-container{
    flex-direction: column;
    margin: auto;
    margin-bottom: 2rem;
  }
}
</style>
