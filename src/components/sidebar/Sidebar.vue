<template>
  <aside
    aria-label="main-sidebar"
    v-bind:class="[ sizeClass === 'bigger' ? 'bigger' : 'smaller app-sidebar' ]"
  >
    <header>
      <img src="../../assets/images/map-marker.svg" alt="Happy" />
      <slot v-if="sizeClass === 'bigger'" name="header"></slot>
    </header>

    <footer>
      <span v-if="sizeClass === 'bigger'">
        <slot  name="footer"></slot>
      </span>
      <button v-else type="button" v-on:click="goBack" aria-label="main-sidebar-btn">
        <font-awesome-icon icon="arrow-left" style="color: #fff; font-size:24px" />
      </button>        
    </footer>
  </aside>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

// Define the props by using Vue's canonical way.
const GreetingProps = Vue.extend({
  props: {
    sizeClass: {
      type: String,
      default: '',
      required: false
    }
  }
})

@Component
export default class Sidebar extends GreetingProps {

  goBack () {
    this.$router.go(-1)
  }
}
</script>