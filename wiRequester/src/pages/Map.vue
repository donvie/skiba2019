<template>
  <q-page>
    <l-map ref="map" :zoom="zoom" :center="center" style="min-height: calc(100vh - 145px);">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker @click="yourLocation" :icon="wiRequesterIcon" :lat-lng="center"></l-marker>
      <l-marker @click="viewwiSkiller(wiSkiller)" v-for="(wiSkiller, i) in wiSkillers" :key="i" :lat-lng="[wiSkiller.longlat._lat, wiSkiller.longlat._long]" :icon="wiSkillerIcon"></l-marker>
    </l-map>
  </q-page>
</template>

<script>
require('leaflet/dist/leaflet.css')
require('leaflet-routing-machine/dist/leaflet-routing-machine.css')
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import L from 'leaflet'
import 'leaflet-routing-machine'
import wiRequester from 'src/assets/wiRequester-pin.png'
import wiSkiller from 'src/assets/wiSkiller-pin.png'

let wiRequesterIcon = L.icon({
  iconUrl: wiRequester,
  iconSize: [48, 48]
})

let wiSkillerIcon = L.icon({
  iconUrl: wiSkiller,
  iconSize: [48, 48]
})

export default {
  name: 'index',
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data () {
    return {
      wiSkiller: null,
      wiSkillers: null,
      wiRequesterIcon,
      wiSkillerIcon,
      zoom: 13,
      center: L.latLng(14.5790947, 121.0541893),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }
  },
  mounted () {
    this.$binding('wiSkillers', this.$firebaseapp.firestore().collection('wiSkillers'))
  },
  methods: {
    viewwiSkiller (wiSkiller) {
      let wiSkillerData = {
        displayName: wiSkiller.displayName,
        emailAddress: wiSkiller.emailAddress,
        photoURL: wiSkiller.photoURL,
        age: wiSkiller.age,
        address: wiSkiller.address,
        uid: wiSkiller.uid
      }

      this.$store.commit('user/wiSkiller', wiSkillerData)
      this.$router.push('/wiskillerprofile')
    },
    yourLocation () {
      this.$q.dialog({
        title: 'Your Location',
        ok: {
          push: false,
          color: 'purple',
          label: 'ok'
        }
      }).catch(() => {
      })
    }
  }
}
</script>
<style>
.leaflet-bottom.leaflet-right {
  display: none;
}
</style>
