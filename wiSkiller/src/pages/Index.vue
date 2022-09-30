<template>
  <q-page>
    <q-dialog
      v-model="viewBook"
      stack-buttons
    >
      <span slot="title">Book</span>

      <div v-if="wiSkiller.Request" slot="body" class="text-black">
        <p>Service: {{wiSkiller.Request.serviceName}}</p>
        <p>Type: {{wiSkiller.Request.type}}</p>
        <p>Duration: {{wiSkiller.Request.duration}}</p>
        <p>wiSkiller: {{wiSkiller.Request.wiSkiller}}</p>
        <p>Cost: {{wiSkiller.Request.cost}} Php</p>
      </div>

      <template slot="buttons" slot-scope="props">
        <q-btn color="positive" label="OK" @click="viewBook = false" />
      </template>
    </q-dialog>

    <l-map ref="map" style="min-height: calc(100vh - 98px)">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <q-layout-footer v-if="wiSkiller.Request && wiSkiller.Request.displayName" class="fixed-bottom bg-white">
        <q-card>
          <q-card-title>
            <img class="avatar" :src="wiSkiller.Request.photoURL"> <br>
            {{wiSkiller.Request.displayName}}
            <q-rating slot="subtitle" v-model="rating" :max="5" />
            <div slot="right" class="row items-center">
              <q-btn @click="viewBook = true" label="View Book" no-caps flat color="purple" />
            </div>
          </q-card-title>
          <q-card-separator />
          <q-card-actions class="bg-positive text-white justify-center">
            <span style="font-size: 16px;">Ongoing</span>
          </q-card-actions>
        </q-card>
      </q-layout-footer>
    </l-map>
  </q-page>
</template>

<script>
import L from 'leaflet'
import 'leaflet-routing-machine'
require('leaflet/dist/leaflet.css')
require('leaflet-routing-machine/dist/leaflet-routing-machine.css')
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'

import _wiRequester from 'src/assets/wiRequester-pin.png'
import _wiSkiller from 'src/assets/wiSkiller-pin.png'

let wiRequesterIcon = L.icon({
  iconUrl: _wiRequester,
  iconSize: [48, 48]
})

let wiSkillerIcon = L.icon({
  iconUrl: _wiSkiller,
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
      wiSkiller: [],
      wiRequester: [],
      wiSkillers: [],
      rating: 5,
      zoom: 13,
      viewBook: false,
      wiRequesterIcon,
      wiSkillerIcon,
      center: L.latLng(14.5790947, 121.0541893),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }
  },
  mounted () {
    this.$binding('wiSkiller', this.$firebaseapp.firestore().collection('wiSkillers').doc(this.wiSkillerData.uid))
    this.$binding('wiRequester', this.$firebaseapp.firestore().collection('wiRequesters'))
    let options = { profile: 'mapbox/driving-traffic' }
    let self = this
    L.Routing.control({
      show: false,
      draggableWaypoints: false,
      router: L.Routing.mapbox('pk.eyJ1IjoiZG9udmllIiwiYSI6ImNqaTFxaDgxMTBoOTkzcW9heHV1bm54ZmsifQ.pNfXE9J6HLLFjfdg72E_Cg', options),
      waypoints: [
        L.latLng(14.5790947, 121.0691893),
        L.latLng(14.5790947, 121.0541893)
      ],
      lineOptions: {
        styles: [
          {color: 'white', opacity: 0.9, weight: 9},
          {color: 'purple', opacity: 1, weight: 5}
        ]
      },
      createMarker: function (i, wp, nWps) {
        if (i === 0) {
          return L.marker(wp.latLng, { icon: self.wiSkillerIcon, draggable: false, bounceOnAdd: false }).on('click', self.yourLocation)
        } else if (i === nWps - 1) {
          return L.marker(wp.latLng, { icon: self.wiRequesterIcon, draggable: false, bounceOnAdd: false }).on('click', self.wiSkillerLocation)
        }
      }
    }).addTo(this.$refs.map.mapObject)
  },
  computed: {
    wiSkillerData () {
      return this.$store.getters['user/currentUser']
    },
    mapSize () {
      if (this.wiSkiller) {
        if (this.wiSkiller.Request) {
          return this.wiSkiller.Request.displayName
        }
      }
    }
  },
  methods: {
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
    },
    wiSkillerLocation () {
      this.$q.dialog({
        title: 'wiRequester Location',
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
