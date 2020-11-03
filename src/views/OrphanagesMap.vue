<template>
  <div id="page-map">
      <Sidebar sizeClass="bigger">
        <template v-slot:header>
          <span>
            <h2>Escolha um orfanato no mapa</h2>
            <p>Muitas crianças estao esperando a sua visitas :)</p>
          </span>
        </template>
        <template v-slot:footer>
          <span>
            <strong>Rio do Sul</strong>
            <div>Santa Catarina</div>
          </span> 
        </template>
      </Sidebar>

      <LMap
        :center="[-27.2092052,-49.6401092]"
        :zoom="15"
        style="height: 100%; width: 100%"
      >
        <LTileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <LMarker
          v-for="orphanage in orphanages"
          :key="orphanage.id"
          :icon="mapIconObj"
          :lat-lng="[orphanage.latitude,orphanage.longitude]"              
        >
          <LPopup closeButton="false" minWidth="240" maxWidth="240" class="map-popup">
            {{orphanage.name}}
            <router-link :to="{ name: 'show', params: { id: orphanage.id } }">
              <font-awesome-icon icon="arrow-right" style="color: #fff; font-size:20px" />
            </router-link>
          </LPopup>
        </LMarker>
        
      </LMap>

      <router-link :to="{ name: 'create' }" class="create-orphanage o-btn--blue-lt">
        <font-awesome-icon icon="plus" style="color: #fff; font-size:32px" />
      </router-link>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet'

import Sidebar from "../components/sidebar/Sidebar.vue";

import mapIcon from '../utils/mapIcons'
import api from '../services/api'

interface Orphanage{
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

@Component({
  // Specify `components` option.
  // See Vue.js docs for all available options:
  // https://vuejs.org/v2/api/#Options-Data
  components: {
    Sidebar,
    LMap, LTileLayer, LMarker, LPopup
  }
})
export default class OrphanagesMap extends Vue {
  orphanages: Orphanage[] = []
  mapIconObj = mapIcon

  mounted () {
    api.get('/orphanages').then((response) => {
      this.orphanages = response.data
    })
  }
}
</script>

<style lang="sass" scoped>
@import "../assets/scss/__PAGES__/OrphanageMap";
</style>
