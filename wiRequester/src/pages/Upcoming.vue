<template>
  <q-page padding>
    <q-list separator highlight sparse>
      <q-list-header>Realtime Booking</q-list-header>
      <q-item v-if="wiRequester && wiRequester.Request" @click.native="$router.push('transaction')">
        <q-item-side :avatar="wiRequester.Request.photoURL" />
        <q-item-main :sublabel="wiRequester.Request.serviceName" :label="wiRequester.Request.displayName" />
      </q-item>
      <q-item-separator />
      <q-list-header>Advance Booking</q-list-header>
      <q-item>
        <q-item-side avatar="statics/quasar-logo.png" />
        <q-item-main label="Jack Doe" />
      </q-item>
      <q-item>
        <q-item-side avatar="statics/quasar-logo.png" />
        <q-item-main label="Jim Doe" />
      </q-item>
      <q-item>
        <q-item-side avatar="statics/quasar-logo.png" />
        <q-item-main label="Jim Doe" />
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      wiRequester: null
    }
  },
  mounted () {
    this.$binding('wiRequester', this.$firebaseapp.firestore().collection('wiRequesters').doc(this.wiRequesterData.uid))
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
