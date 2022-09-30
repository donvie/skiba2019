<template>
  <q-page padding>
    <q-modal v-model="opened" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <q-modal-layout>
        <q-page>
          <q-page-sticky style="z-index: 999" position="top-left" :offset="[6, -90]">
            <q-btn round size="lg" flat color="white" @click="opened = false" icon="arrow_back_ios" />
          </q-page-sticky>
          <q-card flat>
            <q-card-media>
              <img style="height: 180px" :src="wiSkiller.photoURL">
            </q-card-media>
            <q-card-main>
              <div class="row gutter-sm">
                <div class="col-12">
                  <q-input readonly v-model="wiSkiller.displayName" />
                </div>
                <div class="col-12">
                  <q-input readonly v-model="wiSkiller.email" />
                </div>
              </div>
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
      wiSkiller: [],
      opened: false
    }
  },
  mounted () {
    if (this.wiSkillerData) {
      this.$binding('wiSkiller', this.$firebaseapp.firestore().collection('wiSkillers').doc(this.wiSkillerData.uid))
    }
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
    wiSkillerData () {
      return this.$store.getters['user/currentUser']
    }
  }
}
</script>

<style>

</style>
