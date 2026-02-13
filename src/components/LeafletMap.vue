<template>
  <div class="map-container">
    
    <l-map
      ref="map"
      v-model:zoom="zoom"
      :center="markerPosition"
      :use-global-leaflet="false"
      class="leaflet-map"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a style="font-size: 10px" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        layer-type="base"
        name="OpenStreetMap"
      />
      
      <l-marker
        :lat-lng="markerPosition"
        :draggable="false"
      >
        <l-popup>
          <div>
            <strong> Restaurant Webtechquila (FOM Düsseldorf)</strong><br>
            Lat: {{ markerPosition.lat.toFixed(6) }}<br>
            Lng: {{ markerPosition.lng.toFixed(6) }}
          </div>
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';

// Default position FOM Düsseldorf
const defaultPosition = { lat: 51.2439498, lng: 6.7946395 };

// Reactive state
const zoom = ref(15);
const markerPosition = ref({ ...defaultPosition });

</script>

<style scoped>
.map-container {
  width: 100%;
  height: 70vh;
  display: flex;
  flex-direction: column;
}

.leaflet-map {
  flex: 1;
  z-index: 0;
}
</style>