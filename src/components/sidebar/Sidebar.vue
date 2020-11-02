<template>
  <aside
    aria-label="main-sidebar"
    v-bind:class="[ sizeClass === 'bigger' ? 'bigger' : 'smaller app-sidebar' ]"
  >
    <header>
      <img src="../../images/map-marker.svg" alt="Happy" />
      <slot v-if="sizeClass === 'bigger'" name="header"></slot>
    </header>

    <footer>
      <span v-if="sizeClass === 'bigger'">
        <slot  name="footer"></slot>
      </span>
      <button v-else type="button" v-on:click="goBack" aria-label="main-sidebar-btn">
        <font-awesome-icon icon="fa-arrow-right" style="color: #fff; font-size:24px" />
      </button>        
    </footer>
  </aside>
</template>

<script>
export default {
  props: {
    sizeClass: {
      type: String,
      default: '',
      required: false
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>