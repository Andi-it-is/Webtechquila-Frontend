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

  <h2>Vorspeisen</h2>
  <ul>
    <li
      v-for="dish in filteredDishes.filter(d => d.category === 'Vorspeise')"
      :key="dish.id"
    >
      {{ dish.name }}
    </li>
  </ul>


 <h2>Hauptspeisen</h2>
  <ul>
    <li
      v-for="dish in filteredDishes.filter(d => d.category === 'Hauptspeise')"
      :key="dish.id"
    >
      {{ dish.name }}
    </li>
  </ul>


  <h2>Nachspeisen</h2>
  <ul>
    <li
      v-for="dish in filteredDishes.filter(d => d.category === 'Nachspeise')"
      :key="dish.id"
    >
      {{ dish.name }}
    </li>
  </ul>

</q-page>


</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')

const filteredDishes = computed(() => {
  const q = search.value.trim().toLowerCase()

  if (!q) {
    return dishes
  }

  return dishes.filter(dish =>
    dish.name.toLowerCase().includes(q)
  )
})


const dishes = [
  // Vorspeisen
  { id: 1, name: 'Tomatensuppe', category: 'Vorspeise' },
  { id: 2, name: 'Bruschetta', category: 'Vorspeise' },
  { id: 8, name: 'Nutte', category: 'Vorspeise'},

  // Hauptspeisen
  { id: 3, name: 'Pasta Napoli', category: 'Hauptspeise' },
  { id: 4, name: 'Veggie Burger', category: 'Hauptspeise' },
  { id: 7, name: 'Veggie Burger', category: 'Hauptspeise' },
  { id: 4, name: 'Veggie Burger', category: 'Hauptspeise' },

  // Nachspeisen
  { id: 5, name: 'Tiramisu', category: 'Nachspeise' },
  { id: 6, name: 'Obstsalat', category: 'Nachspeise' }
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