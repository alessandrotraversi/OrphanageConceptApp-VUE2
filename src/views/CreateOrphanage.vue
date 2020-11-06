<template>
  <div id="page-create-orphanage">
    <Sidebar/>

    <main>
      <form class="create-orphanage-form" v-on:submit.prevent="handleSubmit">
        <fieldset>
          <legend>Dados</legend>

          <LMap 
            :center="[-27.2092052,-49.6401092]" 
            style="width: '100%'; height: 280"
            :zoom="15"
            v-on:click="handleMapClick"
          >
            <LTileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <LMarker
              v-if="position.latitude !== 0"
              interactive="false" 
              :icon="mapIcon" 
                :lat-lng="[
                position.latitude,
                position.longitude
              ]" 
              />        
          </LMap>

          <div class="input-block">
            <label for="name">Nome</label>
            <input
              id="name"
              v-model="name"
            />
          </div>

          <div class="input-block">
            <label for="about">Sobre <span>Máximo de 300 caracteres</span></label>
            <textarea
              id="about"
              maxLength={300}
              v-model="about"
            />
          </div>

          <div class="input-block">
            <label for="images">Fotos</label>

            <div class="images-container" v-if="previewImages">
              <img v-for="(image, index) in previewImages" :key="index" :src="image" alt="image uploaded" />
              <label for="image[]" class="new-image">
                <font-awesome-icon icon="plus" style="color: #15b6d6; font-size:24px" />
              </label>                
            </div>
            <input type="file" id="image[]" multiple @change="handleSelectImages($event)" />            
          </div>
        </fieldset>

        <fieldset>
          <legend>Visitação</legend>

          <div class="input-block">
            <label for="instructions">Instruções</label>
            <textarea
              id="instructions"
              v-model="instructions"
            />
          </div>

          <div class="input-block">
            <label for="opening_hours">Horario de funcionamento</label>
            <input
              id="opening_hours"
              v-model="opening_hours"
            />
          </div>

          <div class="input-block">
            <label for="open_on_weekends">Atende fim de semana</label>

            <div class="button-select">
              <button
                type="button"
                v-bind:class="[ open_on_weekends ? 'active' : '' ]"
                v-on:click="open_on_weekends = true"
              >
                  Sim
              </button>
              <button
                type="button"
                v-bind:class="[ !open_on_weekends ? 'active' : '' ]"
                v-on:click="open_on_weekends = false"
              >
                  Não
              </button>
            </div>
          </div>
        </fieldset>

        <button class="confirm-button" type="submit">
          Confirmar
        </button>
      </form>
    </main>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import { LeafletMouseEvent } from 'leaflet'

import Sidebar from "../components/sidebar/Sidebar.vue";

import mapIcon from '../utils/mapIcons'
import api from '../services/api'


@Component({
  components: {
    Sidebar,
    LMap, LTileLayer, LMarker
  }
})
export default class OrphanageCreateComponent extends Vue {
  position = {
    latitude: 0,
    longitude: 0
  }  
  name: string = ""
  about: string = ""
  instructions: string = ""
  opening_hours: string = ""
  open_on_weekends: boolean = true
  images: string[] = []
  previewImages: string[] = []

  handleMapClick (event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng
    this.position.latitude = lat
    this.position.longitude = lng
  }

  handleSelectImages (event: any) {
    if (!event.target.files) {
      return
    }

    //TODO: image data flux
    
    const selectedImages = Array.from(event.target.files)

    const selectedImagesPreview = selectedImages.map( image => {
      return URL.createObjectURL(image)
    })

    this.previewImages = selectedImagesPreview
    this.images = selectedImagesPreview
  }

  async handleSubmit (event: any) {
    event.preventDefault()

    const { latitude, longitude } = this.position

    const data = new FormData()
    data.append('name', this.name)
    data.append('about', this.about)
    data.append('latitude', String(this.position.latitude))
    data.append('longitude', String(this.position.longitude))
    data.append('instructions', this.instructions)
    data.append('opening_hours', this.opening_hours)
    data.append('open_on_weekends', String(this.open_on_weekends))
    this.images.forEach(image => {
      data.append('images', image)
    })
    
    await api.post('orphanages', data)

    alert('Cadastro realizado com sucesso!')

    this.$router.push({ name: 'home'})
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/__PAGES__/OrphanageCreate";
</style>