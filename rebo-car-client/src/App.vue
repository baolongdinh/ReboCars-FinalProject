<template>
  <div class = "ml-28 mr-28">
    <navigation/>
    <router-view> </router-view>
  </div>
</template>

<script>

import Product from './components/products/Product.vue'
import Navigation from './components/store/Navigation.vue'
export default {
  components: { Product, Navigation },

}
</script>

<style lang="css" >
body {
  height: 100%;
}
</style>