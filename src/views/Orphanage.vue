<template>
  <div id="page-orphanage">
    <Sidebar sizeClass="smaller" />
    <main v-if="!orphanage">
      <p>Carregando...</p>
    </main>
    <main v-else>
      <div class="orphanage-details">
        <img :src="orphanage.images[activeImageIndex].url" :alt="orphanage.name" />

        <div class="images">
          <button
            v-for="(image, index) in orphanage.images"
            :key="image.id"
            v-bind:class="[ activeImageIndex === index ? 'active image-button' : 'image-button' ]"
            type="button"
            v-on:click="activeImageIndex = index"
          >
            <img :src="image.url" :alt="orphanage.name" />
          </button>
        </div>
        
        <div class="orphanage-details-content">
          <h1>{{orphanage.name}}</h1>
          <p>{{orphanage.about}}</p>

          <div class="map-container">
            <LMap 
              :center="[orphanage.latitude,orphanage.longitude]" 
              :zoom="16" 
              style="width: '100%'; height: 280px;"
              dragging="false"
              touchZoom="false"
              zoomControl="false"
              scrollWheelZoom="false"
              doubleClickZoom="false"
            >
              <LTileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              />
              <LMarker interactive="false" :icon="mapIconObj" :lat-lng="[orphanage.latitude,orphanage.longitude]" />
            </LMap>

            <footer>
              <a :href="`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`" target="_blank" rel="noopener noreferrer">Ver rotas no Google Maps</a>
            </footer>
          </div>

          <hr />

          <h2>Instruções para visita</h2>
          <p>{{orphanage.instructions}}</p>

          <div class="open-details">
            <div class="hour">
              <font-awesome-icon icon="clock" style="color: #15B6D6; font-size:32px" />
              Segunda à Sexta <br />
              {{orphanage.opening_hours}}
            </div>
            <div class="open-on-weekends" v-if="orphanage.open_on_weekends">
              <font-awesome-icon icon="info" style="color: #39CC83; font-size:32px" />
              Atendemos <br />
              fim de semana
            </div>
            <div class="open-on-weekends dont-open" v-else>
              <font-awesome-icon icon="info" style="color: #ff669d; font-size:32px" />
              Nao atendemos <br />
              fim de semana
            </div>            
          </div>

          <button type="button" class="contact-button">
            <!--<font-awesome-icon :icon="['fab', 'faWhatsapp']" style="color: #fff; font-size:20px" />-->
            Entrar em contato
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'

import Sidebar from "../components/sidebar/Sidebar.vue";

import mapIcon from '../utils/mapIcons'
import api from '../services/api'

interface Orphanage {
  latitude?: number;
  longitude?: number;
  name?: string;
  about?: string;
  instructions?: string;
  opening_hours?: string;
  open_on_weekends?: string;
  images?: Array<{
    id: number;
    url: string;
  }>;
}

@Component({
  // Specify `components` option.
  // See Vue.js docs for all available options:
  // https://vuejs.org/v2/api/#Options-Data
  components: {
    Sidebar,
    LMap, LTileLayer, LMarker
  }
})
export default class OrphanageComponent extends Vue {
  orphanage: Orphanage = {}
  activeImageIndex: Number = 0
  mapIconObj = mapIcon

  mounted () {
    api.get('/orphanages/'+this.$route.params.id).then((response) => {
      this.orphanage = response.data
    })
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/__PAGES__/Orphanage";
</style>