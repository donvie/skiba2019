<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="purple"
        :flat="$q.theme === 'mat'"
        :inverted="$route.name === 'Transaction'"
      >

        <q-btn
          v-show="$route.name === 'Transaction'"
          flat
          round
          size="lg"
          dense
          @click="$router.push('/upcoming')"
          icon="arrow_back"
        />

        <q-toolbar-title>
          <span class="text-weight-bold">
            {{this.$route.name}}
          </span>
        </q-toolbar-title>

        <!-- <q-btn
          v-show="$route.name === 'Transaction'"
          flat
          round
          dense
          @click="$router.push('/upcoming')"
          icon="chat"
        /> -->
        <q-btn
          v-show="$route.name === 'Transaction'"
          icon="chat"
          size="lg"
          flat
        >
          <q-chip floating color="red">1</q-chip>
        </q-btn>

      </q-toolbar>

      <q-tabs v-if="$route.name !== 'Transaction'" align="justify" inverted  underline-color="purple" color="purple">
        <q-route-tab slot="title" icon="explore" to="/" class="capitalize" />
        <q-route-tab slot="title" icon="favorite_border" to="/favourite" class="capitalize" />
        <q-route-tab v-if="$route.name !== 'Upcoming' && $route.name !== 'Booking History'" slot="title" icon="bookmarks" to="/upcoming" class="capitalize" />
        <q-route-tab v-if="$route.name === 'Upcoming'" slot="title" icon="bookmarks" to="/upcoming" class="capitalize" />
        <q-route-tab v-if="$route.name === 'Booking History'" slot="title" icon="bookmarks" to="/booking" class="capitalize" />
        <q-route-tab slot="title" icon="person" to="/account" class="capitalize" />
      </q-tabs>

    </q-layout-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-layout-footer v-if="$route.name === 'Booking History' || $route.name === 'Upcoming' || $route.name === 'Map' || $route.name === 'Book Now'">

      <q-tabs align="justify" v-if="$route.name === 'Booking History' || $route.name === 'Upcoming'" color="purple" underline-color="white" inverted>
        <q-route-tab slot="title" icon="view_quilt" to="/upcoming" replace hide="icon" label="Upcoming" />
        <q-route-tab slot="title" icon="view_day" to="/booking" replace hide="icon" label="Past" />
      </q-tabs>

      <q-tabs align="justify" v-if="$route.name === 'Map' || $route.name === 'Book Now'" color="purple" underline-color="white" inverted>
        <q-route-tab slot="title" icon="view_quilt" to="/map" replace hide="icon" label="Map" />
        <q-route-tab slot="title" icon="view_day" to="/book_now" replace hide="icon" label="Book Now" />
      </q-tabs>
    </q-layout-footer>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
// import { firebaseapp } from 'src/firebase.js'
export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      wiRequester: []
    }
  },
  methods: {
    openURL
  },
  mounted () {
    this.$firebaseapp.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$binding('wiRequester', this.$firebaseapp.firestore().collection('wiRequesters').doc(user.uid))
        this.$store.dispatch('user/setUser', user)
      } else {
        this.$store.dispatch('user/setUser', null)
        this.$router.push('/login')
      }
    })
  },
  computed: {
    currentUser () {
      return this.$store.getters['user/currentUser']
    }
  },
  watch: {
    wiRequester (wiRequester) {
      if (wiRequester.declined === true) {
        this.$firebaseapp.firestore().collection('wiRequesters').doc(this.wiRequester.uid).update({
          declined: false
        }).then(() => {
          this.$q.notify({
            type: 'negative',
            message: 'Your Request has been declined!',
            timeout: 3000
          })
        }).catch(error => {
          console.error('Error updating document: ', error)
        })
      }
      if (wiRequester.realtimeBooking === true) {
        this.$firebaseapp.firestore().collection('wiRequesters').doc(this.wiRequester.uid).update({
          realtimeBooking: false
        }).then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'Your Request has been Accepted!',
            timeout: 3000
          })
          this.$router.push('/transaction')
        }).catch(error => {
          console.error('Error updating document: ', error)
        })
      }
    }
  }
}
</script>

<style>
</style>
