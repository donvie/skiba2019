<template>
  <div class="fullscreen layout-padding bg-purple-5 column">
    <div class="col-6 row">
      <div class="col-12 text-center self-center">
        <img style="height:auto; width:280px;" src="~assets/skiba.png">
      </div>
    </div>
    <div class="col-6 row">
      <div class="col-12 self-start">
        <q-btn :loading="loading" @click.native="facebookLogin" icon="mdi-facebook" label="LOG IN WITH FACEBOOK" size="lg" color="primary" class="full-width q-mb-sm">
          <q-spinner-oval slot="loading" />
        </q-btn>
        <q-btn @click.native="googleLogin" icon="mdi-google" label="LOG IN WITH GOOGLE" size="lg" color="red" class="full-width" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      loading: false
    }
  },
  mounted () {
    this.$firebaseapp.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$firebaseapp.firestore().collection('wiSkillers').doc(user.uid).get().then(snapshot => {
          if (snapshot.exists === false) {
            this.$firebaseapp.firestore().collection('wiSkillers').doc(user.uid).set({
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
              email: user.email,
              age: 0,
              address: '',
              phoneNumber: '',
              secretCode: '',
              topUp: 0,
              hasBook: false,
              Request: {},
              longlat: new this.$firestore.GeoPoint(0, 0)
            }).then(() => {
              this.$router.push('/')
            }).catch(error => {
              console.error('Error writing document: ', error)
            })
            // this.$router.push('/verify_account')
          } else {
            this.$store.dispatch('user/setUser', user)
            this.$router.push('/')
          }
        })
      } else {
        this.$store.dispatch('user/setUser', null)
        this.$router.push('/login')
      }
    })
  },
  methods: {
    async facebookLogin () {
      this.loading = true
      await this.$firebaseapp.auth().signInWithRedirect(new this.$auth.FacebookAuthProvider())
      this.loading = false
    },
    googleLogin () {
      this.$firebaseapp.auth().signInWithRedirect(new this.$auth.GoogleAuthProvider())
    }
  }
}
</script>

<style>

</style>
