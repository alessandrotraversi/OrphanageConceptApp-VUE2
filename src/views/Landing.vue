<template>
  <div id="page-landing">
    <div class="content-wrapper">
      <img src="../assets/images/logo.svg" alt="Happy" />

      <main>
        <h1>Leve felicidade para o mundo</h1>
        <p>Visite orfanatos e mude o dia de muitas crianças.</p>
      </main>

      <div class="location">
        <strong>Rio do Sul</strong>
        <span>Santa Catarina</span>
      </div>

      <router-link :to="{ name: 'map' }" class="enter-app">
        <font-awesome-icon icon="arrow-right" style="color: rgba(0,0,0,0.6); font-size:24px" />
      </router-link>
    </div>
  </div>
</template>


<style lang="scss" scoped>
@import "../assets/scss/__PAGES__/Landing";
</style>