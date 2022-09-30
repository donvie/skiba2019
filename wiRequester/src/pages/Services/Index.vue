<template>
  <q-page padding>
    <q-modal v-model="opened" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <q-modal-layout>
        <q-toolbar slot="header">
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
        </q-toolbar>

        <q-toolbar slot="footer">
          <q-toolbar-title>
            Footer
          </q-toolbar-title>
        </q-toolbar>

        <div class="layout-padding">
          <h1>Modal</h1>

          <q-btn
            color="primary"
            v-close-overlay
            label="Close"
          />

          <p>This is a Modal presenting a Layout.</p>
        </div>
      </q-modal-layout>
    </q-modal>

    <div class="row gutter-sm">
      <div class="col-12">
        <q-card>
          <q-card-media>
            <q-carousel
              color="white"
              arrows
              quick-nav
              quick-nav-icon="favorite"
              infinite
              autoplay
              height="300px"
            >
              <q-carousel-slide img-src="statics/donuts.png" />
              <q-carousel-slide img-src="statics/quasar-logo.png" />
              <q-carousel-slide img-src="statics/donuts.png" />
            </q-carousel>
          </q-card-media>
          <q-card-title>
            <span class="text-weight-bold">Home Cleaning</span>
          </q-card-title>
           <q-card-separator />
          <q-card-actions class="justify-center">
            <q-btn @click.native="Service('Home Cleaning')" color="purple" label="View more" />
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-12">
        <q-card>
          <q-card-media>
            <img src="~assets/donuts.png">
          </q-card-media>
          <q-card-title>
            <span class="text-weight-bold">Massage / Spa</span>
          </q-card-title>
           <q-card-separator />
          <q-card-actions>
            <q-btn flat class="full-width" color="purple" label="View more" />
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-12">
        <q-card>
          <q-card-media>
            <img src="~assets/donuts.png">
          </q-card-media>
          <q-card-title>
            <span class="text-weight-bold">Aircon Cleaning</span>
          </q-card-title>
           <q-card-separator />
          <q-card-actions>
            <q-btn flat class="full-width" color="purple" label="View more" />
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-12">
        <q-card>
          <q-card-media>
            <img src="~assets/donuts.png">
          </q-card-media>
          <q-card-title>
            <span class="text-weight-bold">Food Delivery</span>
          </q-card-title>
           <q-card-separator />
          <q-card-actions>
            <q-btn flat class="full-width" color="purple" label="View more" />
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-12">
        <q-card>
          <q-card-media>
            <img src="~assets/donuts.png">
          </q-card-media>
          <q-card-title>
            <span class="text-weight-bold">Bills Payment</span>
          </q-card-title>
           <q-card-separator />
          <q-card-actions>
            <q-btn flat class="full-width" color="purple" label="View more" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      opened: false
    }
  },
  methods: {
    Service (val) {
      this.$store.commit('user/service', val)
      this.$router.push('/home_cleaning')
    }
  }
}
</script>
