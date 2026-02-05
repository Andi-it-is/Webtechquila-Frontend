<template>

  <q-page padding>
  

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


<<q-expansion-item label="Vorspeisen" default-opened>
  <div class="q-gutter-md">
    <q-card
      v-for="dish in filteredDishes.filter(d => d.category === 'Vorspeise')"
      :key="dish.id"
      bordered
    >
      <q-card-section class="row items-center justify-between">
        <div class="text-subtitle1">{{ dish.name }}</div>
        <q-badge outline>{{ dish.type }}</q-badge>
      </q-card-section>
    </q-card>
  </div>
</q-expansion-item>


<q-expansion-item label="Hauptspeisen" default-opened>
  <ul>
    <li
      v-for="dish in filteredDishes.filter(d => d.category === 'Hauptspeise')"
      :key="dish.id"
    >
      {{ dish.name }}
    </li>
  </ul>
</q-expansion-item>

<q-expansion-item label="Nachspeisen" default-opened>
  <ul>
    <li
      v-for="dish in filteredDishes.filter(d => d.category === 'Nachspeise')"
      :key="dish.id"
    >
      {{ dish.name }}
    </li>
  </ul>
</q-expansion-item>

</q-page>


</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const selectedType = ref('all')


const filteredDishes = computed(() => {
  const q = (search.value || '').trim().toLowerCase()
  const t = selectedType.value

  return dishes.filter(dish => {
    const matchesSearch = !q || dish.name.toLowerCase().includes(q)
    const matchesType = t === 'all' || dish.type === t

    return matchesSearch && matchesType
  })
})




const dishes = [
  // Vorspeisen
  { id: 1, name: 'Tomatensuppe', category: 'Vorspeise', type: 'vegan' },
  { id: 2, name: 'Bruschetta', category: 'Vorspeise', type: 'vegetarisch' },
  { id: 3, name: 'Vitello Tonato', category: 'Vorspeise', type: 'fleisch' },
  { id: 4, name: 'Gemischter Salat', category: 'Vorspeise', type: 'vegan' },
  { id: 5, name: 'Caprese', category: 'Vorspeise', type: 'vegetarisch' },

  // Hauptspeisen
  { id: 6, name: 'Pasta Napoli', category: 'Hauptspeise', type: 'vegan' },
  { id: 7, name: 'Wiener Schnitzel', category: 'Hauptspeise', type: 'fleisch' },
  { id: 8, name: 'Spaghetti Bolognese', category: 'Hauptspeise', type: 'fleisch' },
  { id: 9, name: 'Lasagne', category: 'Hauptspeise', type: 'fleisch' },
  { id: 10, name: 'Gemüsepfanne', category: 'Hauptspeise', type: 'vegan' },

  // Nachspeisen
  { id: 11, name: 'Tiramisu', category: 'Nachspeise', type: 'vegetarisch' },
  { id: 12, name: 'Obstsalat', category: 'Nachspeise', type: 'vegan' },
  { id: 13, name: 'Panna Cotta', category: 'Nachspeise', type: 'vegetarisch' },
  { id: 14, name: 'Schokokuchen', category: 'Nachspeise', type: 'vegetarisch' },
  { id: 15, name: 'Sorbet', category: 'Nachspeise', type: 'vegan' }
]





</script>


<style>

h4 {line-height: 0rem};
h5 {line-height: 0rem};

.headline {
  
  font-size: 32px;
  font-weight: bold;
}

</style>