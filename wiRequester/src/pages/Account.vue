<template>
  <q-page padding>
    <q-modal v-model="opened" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <q-modal-layout>
        <!-- <q-toolbar slot="header">
          <q-btn
            flat
            round
            dense
            v-close-overlay
            icon="keyboard_arrow_left"
          />
          <q-toolbar-title>
            Header
          </q-toolbar-title>
        </q-toolbar> -->

        <q-page>
          <q-page-sticky style="z-index: 999" position="top-left" :offset="[6, -90]">
            <q-btn round size="lg" flat color="white" @click="opened = false" icon="arrow_back_ios" />
          </q-page-sticky>
          <q-card flat>
            <q-card-media>
              <img style="height: 180px" :src="wiRequester.photoURL">
            </q-card-media>
            <!-- <q-card-title>
              Personal Information
            </q-card-title> -->
            <q-card-main>
              <div class="row gutter-sm">
                <div class="col-12">
                  <q-input readonly v-model="wiRequester.displayName" />
                </div>
                <div class="col-12">
                  <q-input readonly v-model="wiRequester.email" />
                </div>
              </div>
              <!-- <p>$・Italian, Cafe</p>
              <p class="text-faded">Small plates, salads & sandwiches in an intimate setting.</p> -->
            </q-card-main>
          </q-card>
        </q-page>
      </q-modal-layout>
    </q-modal>

    <q-list no-border separator sparse>
      <q-card-separator />
      <q-item>
        <q-item-main @click.native="opened = true">
          <q-item-tile label>Profile</q-item-tile>
        </q-item-main>
      </q-item>
      <q-item>
        <q-item-main>
          <q-item-tile label>Payment Info</q-item-tile>
        </q-item-main>
      </q-item>
      <q-item @click.native="Confirm">
        <q-item-main>
          <q-item-tile label>Sign Out</q-item-tile>
        </q-item-main>
      </q-item>
      <q-card-separator />
    </q-list>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      wiRequester: [],
      opened: false
    }
  },
  mounted () {
    this.$binding('wiRequester', this.$firebaseapp.firestore().collection('wiRequesters').doc(this.wiRequesterData.uid))
  },
  methods: {
    Confirm () {
      this.$q.dialog({
        title: 'Warning!',
        message: 'Are you sure you want to Logout?',
        ok: {
          color: 'negative',
          label: 'Logout'
        },
        cancel: {
          color: 'positive',
          label: 'Cancel'
        }
      }).then(() => {
        this.logOut()
      }).catch(() => {
      })
    },
    async logOut () {
      await this.$firebaseapp.auth().signOut()
    }
  },
  computed: {
    wiRequesterData () {
      return this.$store.getters['user/currentUser']
    }
  }
}
</script>

<style>

</style>
