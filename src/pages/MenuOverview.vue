<template>

  <q-page padding>
  
<div class="content-wrapper" >
  <h1>Speisekarte</h1>
  <p>Unsere Speisekarte bietet eine Auswahl an verschiedenen Gerichten und Getränken.</p>

   <q-input
      v-model="search"
      label="Gericht suchen"
      outlined
      clearable
    />
  <q-btn-toggle
      v-model="selectedType"
      toggle-color="primary"
      text-color="black"
      :options="[
        { label: 'Alle', value: 'all' },
        { label: 'Vegan', value: 'vegan' },
        { label: 'Vegetarisch', value: 'vegetarisch' },
        { label: 'Fleisch', value: 'fleisch' }
    ]"
  
/>



<q-expansion-item default-opened v-model="filterModel.vorspeise">

  <!-- Header -->
 <template v-slot:header>
  <div class="accordion-title">
    Vorspeisen
  </div>
</template>


  <div class="q-gutter-md">

    <q-card
      v-for="dish in filteredDishes.filter(d => d.category === 'Vorspeise')"
      :key="dish.id"
      bordered
    >

      <!-- Name + Badges -->
      <q-card-section class="row items-center justify-between">

        <div class="text-subtitle1">
          {{ dish.name }}
        </div>

        <div class="row items-center q-gutter-sm no-wrap">
          <q-badge class="text-primary" outline>
            {{ dish.type }}
          </q-badge>

          <q-badge class="text-primary" outline>
            {{ dish.price }} €
          </q-badge>
        </div>

      </q-card-section>

      <!-- Beschreibung -->
      <q-card-section class="pt-none">
        <div class="text-caption text-grey-7">
          {{ dish.description }}
        </div>
      </q-card-section>

    </q-card>

  </div>
</q-expansion-item>


<q-expansion-item default-opened v-model="filterModel.hauptspeise">

  <template v-slot:header>
    <div class="accordion-title">
      Hauptspeisen
    </div>
  </template>

  <div class="q-gutter-md">

    <q-card
      v-for="dish in filteredDishes.filter(d => d.category === 'Hauptspeise')"
      :key="dish.id"
      bordered
    >

      <q-card-section class="row items-center justify-between">

        <div class="text-subtitle1">
          {{ dish.name }}
        </div>

        <div class="row items-center q-gutter-sm no-wrap">
          <q-badge class="text-primary" outline>
            {{ dish.type }}
          </q-badge>

          <q-badge class="text-primary" outline>
            {{ dish.price }} €
          </q-badge>
        </div>

      </q-card-section>

      <q-card-section class="pt-none">
        <div class="text-caption text-grey-7">
          {{ dish.description }}
        </div>
      </q-card-section>

    </q-card>

  </div>
</q-expansion-item>

<q-expansion-item default-opened v-model="filterModel.nachspeise">

  <template v-slot:header>
    <div class="accordion-title">
      Nachspeisen
    </div>
  </template>

  <div class="q-gutter-md">

    <q-card
      v-for="dish in filteredDishes.filter(d => d.category === 'Nachspeise')"
      :key="dish.id"
      bordered
    >

      <q-card-section class="row items-center justify-between">

        <div class="text-subtitle1">
          {{ dish.name }}
        </div>

        <div class="row items-center q-gutter-sm no-wrap">
          <q-badge class="text-primary" outline>
            {{ dish.type }}
          </q-badge>

          <q-badge class="text-primary" outline>
            {{ dish.price }} €
          </q-badge>
        </div>

      </q-card-section>

      <q-card-section class="pt-none">
        <div class="text-caption text-grey-7">
          {{ dish.description }}
        </div>
      </q-card-section>

    </q-card>

  </div>
</q-expansion-item>

<q-expansion-item default-opened v-model="filterModel.getraenke">

  <template v-slot:header>
    <div class="accordion-title">
      Getränke
    </div>
  </template>

  <div class="q-gutter-md">

    <q-card
      v-for="drink in drinks"
      :key="drink.id"
      bordered
    >

      <q-card-section class="row items-center justify-between">

        <div class="text-subtitle1">
          {{ drink.name }}
        </div>

        <div class="row items-center q-gutter-sm no-wrap">
          <q-badge class="text-primary" outline>
            {{ drink.type }}
          </q-badge>

          <q-badge class="text-primary" outline>
            {{ drink.price }} €
          </q-badge>
        </div>

      </q-card-section>

      <q-card-section class="pt-none">
        <div class="text-caption text-grey-7">
          {{ drink.description }}
        </div>
      </q-card-section>

    </q-card>

  </div>
</q-expansion-item>





</div>

</q-page>


</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const selectedType = ref('all')
const filterModel = ref({
  vorspeise:true, 
  hauptspeise:true, 
  nachspeise:true,
  getraenke:true,
})

const filteredDishes = computed(() => {
  const q = (search.value || '').trim().toLowerCase()
  const t = selectedType.value

  return dishes.filter(dish => {
    const matchesSearch = !q || dish.name.toLowerCase().includes(q)
    const matchesType = t === 'all' || dish.type === t
    filterModel.value.vorspeise=true
    filterModel.value.hauptspeise=true
    filterModel.value.nachspeise=true
    return matchesSearch && matchesType
  })
})




const dishes = [
  // Vorspeisen
  { id: 1, name: 'Tomatensuppe', category: 'Vorspeise', type: 'vegan', price: 4.90, description: 'Fruchtige Tomatensuppe mit frischen Kräutern' },
  { id: 2, name: 'Bruschetta', category: 'Vorspeise', type: 'vegetarisch', price: 5.50, description: 'Geröstetes Brot mit Tomaten, Knoblauch und Olivenöl' },
  { id: 3, name: 'Vitello Tonato', category: 'Vorspeise', type: 'fleisch', price: 9.80, description: 'Kalbfleisch mit cremiger Thunfisch-Kapern-Sauce' },
  { id: 4, name: 'Gemischter Salat', category: 'Vorspeise', type: 'vegan', price: 4.70, description: 'Frischer Blattsalat mit saisonalem Gemüse' },
  { id: 5, name: 'Caprese', category: 'Vorspeise', type: 'vegetarisch', price: 6.20, description: 'Tomaten mit Mozzarella, Basilikum und Olivenöl' },

  // Hauptspeisen
  { id: 6, name: 'Pasta Napoli', category: 'Hauptspeise', type: 'vegan', price: 11.90, description: 'Pasta mit klassischer Tomatensauce und Kräutern' },
  { id: 7, name: 'Wiener Schnitzel', category: 'Hauptspeise', type: 'fleisch', price: 16.50, description: 'Paniertes Kalbsschnitzel mit Zitronenspalte' },
  { id: 8, name: 'Spaghetti Bolognese', category: 'Hauptspeise', type: 'fleisch', price: 13.90, description: 'Spaghetti mit herzhafter Hackfleischsauce' },
  { id: 9, name: 'Lasagne', category: 'Hauptspeise', type: 'fleisch', price: 14.20, description: 'Überbackene Lasagne mit Fleischragout und Bechamel' },
  { id: 10, name: 'Gemüsepfanne', category: 'Hauptspeise', type: 'vegan', price: 12.80, description: 'Gebratenes saisonales Gemüse mit Kräutern' },

  // Nachspeisen
  { id: 11, name: 'Tiramisu', category: 'Nachspeise', type: 'vegetarisch', price: 6.50, description: 'Klassisches Dessert mit Mascarpone und Kaffee' },
  { id: 12, name: 'Obstsalat', category: 'Nachspeise', type: 'vegan', price: 4.90, description: 'Frische Früchte der Saison' },
  { id: 13, name: 'Panna Cotta', category: 'Nachspeise', type: 'vegetarisch', price: 5.80, description: 'Sahnedessert mit fruchtigem Fruchtspiegel' },
  { id: 14, name: 'Schokokuchen', category: 'Nachspeise', type: 'vegetarisch', price: 5.60, description: 'Saftiger Schokoladenkuchen mit Puderzucker' },
  { id: 15, name: 'Sorbet', category: 'Nachspeise', type: 'vegan', price: 4.50, description: 'Erfrischendes Fruchtsorbet' }
]

const drinks = [
  // Alkoholfreie Getränke
  { id: 101, name: 'Mineralwasser', category: 'Getränk', type: 'alkoholfrei', price: 2.90, description: 'Still oder sprudelnd, 0,5l' },
  { id: 102, name: 'Apfelschorle', category: 'Getränk', type: 'alkoholfrei', price: 3.20, description: 'Erfrischende Apfelsaftschorle, 0,5l' },
  { id: 103, name: 'Cola', category: 'Getränk', type: 'alkoholfrei', price: 3.00, description: 'Klassisches Erfrischungsgetränk, 0,33l' },
  { id: 104, name: 'Orangensaft', category: 'Getränk', type: 'alkoholfrei', price: 3.50, description: 'Fruchtiger Saft aus Orangen, 0,3l' },

  // Heißgetränke
  { id: 105, name: 'Kaffee', category: 'Getränk', type: 'alkoholfrei', price: 2.80, description: 'Frisch gebrühter Filterkaffee' },
  { id: 106, name: 'Cappuccino', category: 'Getränk', type: 'alkoholfrei', price: 3.40, description: 'Espresso mit heißer Milch und Milchschaum' },
  { id: 107, name: 'Tee', category: 'Getränk', type: 'alkoholfrei', price: 2.60, description: 'Verschiedene Sorten zur Auswahl' },

  // Alkoholische Getränke
  { id: 108, name: 'Pils', category: 'Getränk', type: 'alkoholisch', price: 3.80, description: 'Frisches Bier vom Fass, 0,4l' },
  { id: 109, name: 'Weißwein', category: 'Getränk', type: 'alkoholisch', price: 5.50, description: 'Trockener Hauswein, 0,2l' },
  { id: 110, name: 'Rotwein', category: 'Getränk', type: 'alkoholisch', price: 5.50, description: 'Kräftiger Hauswein, 0,2l' }
]


</script>


<style>

.accordion-title {
  font-size: 26px;
  font-weight: 500;
  padding: 8px 0;
}

.content-wrapper{
  max-width: 800px;
  padding: 16px;
}

.q-card {
  border-radius: 12px;
}

</style>