<template>
  <div class="">
    <navigation class="" />
    <notifications />
    <router-view> </router-view>
  </div>
</template>

<script>

import Navigation from './components/store/Navigation.vue'
export default {
  components: { Navigation },

}
</script>

<style lang="css" >
body {
  height: 100%;
}
</style>