<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@font-face {
  font-family: Inconsolata;
  src: url(~assets/Inconsolata-Regular.ttf)
}

body {
  font-family: Inconsolata;
}
.leaflet-top {
  font-family: Inconsolata;
}
</style>
