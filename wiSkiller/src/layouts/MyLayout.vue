<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="purple"
        :flat="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >

        <q-toolbar-title>
          <span class="text-weight-bold">
            {{this.$route.name}}
          </span>
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="justify" inverted  underline-color="purple" color="purple">
        <q-route-tab slot="title" icon="home" to="/" class="capitalize" />
        <q-route-tab slot="title" icon="list_alt" to="/earning" class="capitalize" />
        <q-route-tab slot="title" icon="history" to="/history" class="capitalize" />
        <q-route-tab slot="title" icon="person" to="/account" class="capitalize" />
      </q-tabs>

    </q-layout-header>

    <!-- <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>Essential Links</q-list-header>
        <q-item @click.native="openURL('http://quasar-framework.org')">
          <q-item-side icon="school" />
          <q-item-main label="Docs" sublabel="quasar-framework.org" />
        </q-item>
        <q-item @click.native="openURL('https://github.com/quasarframework/')">
          <q-item-side icon="code" />
          <q-item-main label="GitHub" sublabel="github.com/quasarframework" />
        </q-item>
        <q-item @click.native="openURL('https://discord.gg/5TDhbDg')">
          <q-item-side icon="chat" />
          <q-item-main label="Discord Chat Channel" sublabel="https://discord.gg/5TDhbDg" />
        </q-item>
        <q-item @click.native="openURL('http://forum.quasar-framework.org')">
          <q-item-side icon="record_voice_over" />
          <q-item-main label="Forum" sublabel="forum.quasar-framework.org" />
        </q-item>
        <q-item @click.native="openURL('https://twitter.com/quasarframework')">
          <q-item-side icon="rss feed" />
          <q-item-main label="Twitter" sublabel="@quasarframework" />
        </q-item>
      </q-list>
    </q-layout-drawer> -->

    <q-page-container>

      <q-dialog
        v-if="wiSkiller && wiSkiller.Request"
        v-model="wiSkiller.hasBook"
        stack-buttons
        prevent-close
      >
        <span slot="title">
          <center><img style="height: 72px; width: 72px;" class="avatar" :src="wiSkiller.photoURL"></center>
        </span>
        <span slot="message"><center><b>{{wiSkiller.displayName}}</b></center></span>

        <div slot="body">
          <p>Service: {{wiSkiller.Request.serviceName}}</p>
          <p>Type: {{wiSkiller.Request.type}}</p>
          <p>Duration: {{wiSkiller.Request.duration}}</p>
          <p>wiSkiller: {{wiSkiller.Request.wiSkiller}}</p>
          <p>Cost: {{wiSkiller.Request.cost}} Php</p>
        </div>

        <template slot="buttons" slot-scope="props">
          <q-btn color="positive" label="Accept" @click="bookAccept()" />
          <q-btn color="negative" label="Decline" @click="bookNowCancel()" />
        </template>
      </q-dialog>

      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      wiSkiller: []
    }
  },
  mounted () {
    this.$firebaseapp.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$binding('wiSkiller', this.$firebaseapp.firestore().collection('wiSkillers').doc(user.uid))
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
    },
    wiSkillerData () {
      return this.$store.getters['user/currentUser']
    }
  },
  methods: {
    bookAccept () {
      this.$firebaseapp.firestore().collection('wiRequesters').doc(this.wiSkiller.Request.wiRequesterUID).update({
        hasBook: false,
        declined: false
      }).then(() => {
        this.$firebaseapp.firestore().collection('wiSkillers').doc(this.wiSkiller.uid).set({
          Request: {
            status: 'Arrived'
          },
          hasBook: false,
          realtimeBooking: true
        }, { merge: true }).then(() => {
        }).catch(error => {
          console.error('Error updating document: ', error)
        })

        this.$firebaseapp.firestore().collection('wiRequesters').doc(this.wiSkiller.Request.wiRequesterUID).update({
          hasBook: false,
          realtimeBooking: true,
          Request: {
            status: 'Arrived',
            wiSkillerUID: this.wiSkiller.uid,
            displayName: this.wiSkiller.displayName,
            photoURL: this.wiSkiller.photoURL,
            serviceName: this.wiSkiller.Request.serviceName,
            type: this.wiSkiller.Request.type,
            cost: this.wiSkiller.Request.cost,
            duration: this.wiSkiller.Request.duration,
            wiSkiller: this.wiSkiller.Request.wiSkiller
          }
        }).then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'Booking Accepted',
            timeout: 3000
          })
          this.$router.push('/')
        }).catch(error => {
          console.error('Error updating document: ', error)
        })
      }).catch(error => {
        console.error('Error updating document: ', error)
      })
    },
    bookNowCancel () {
      this.$firebaseapp.firestore().collection('wiRequesters').doc(this.wiSkiller.Request.wiRequesterUID).update({
        hasBook: false,
        declined: true
      }).then(() => {
        this.$firebaseapp.firestore().collection('wiSkillers').doc(this.wiSkiller.uid).update({
          hasBook: false,
          Request: {}
        }).then(() => {
        }).catch(error => {
          console.error('Error updating document: ', error)
        })
      }).catch(error => {
        console.error('Error updating document: ', error)
      })
    }
  }
}
</script>

<style>
</style>
