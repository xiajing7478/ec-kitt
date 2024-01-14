<script setup lang="ts">
import HomeCategory from './components/HomeCategory.vue'
import HomeBanner from './components/HomeBanner.vue'
import HomeNew from './components/HomeNew.vue'
import HomeHot from './components/HomeHot.vue'
import homeProduct from './components/HomeProduct.vue'
// import HomePanel from './components/HomePanel.vue'
</script>

<template>
  <div class="container">
    <HomeCategory />
    <HomeBanner />
  </div>
  <HomeNew />
  <HomeHot />
  <homeProduct />

  <!-- <HomePanel title="A" sub-title="a">
    <h1>HomePanel1</h1>
  </HomePanel>
  <HomePanel title="B" sub-title="b">
    <h1>HomePanel2</h1>
  </HomePanel> -->
</template>

<style scoped lang="scss">
// .container {
//   // position: relative;
//   // width: 100%;
// }
</style>
