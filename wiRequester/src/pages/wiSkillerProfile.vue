<template>
  <q-page style="padding: 10px 0px 40px 0px">
    <q-layout-footer v-if="wiRequester" class="no-shadow fixed-bottom bg-positive">
      <q-btn
        @click.native="wiRequester.hasBook ? bookNowCancel() : customDialogModel = true"
        color="positive"
        class="full-width"
        label="Book now"
        icon="touch_app"
        :disable="wiSkiller.hasBook || wiSkiller.realtimeBooking"
        :loading="wiRequester.hasBook"
      >
        <span slot="loading">
          <q-spinner-hourglass class="on-left" />
            CANCEL
        </span>
      </q-btn>
    </q-layout-footer>

    <q-dialog
      v-model="customDialogModel"
      stack-buttons
      prevent-close
    >
      <span slot="title">Confirmation</span>
      <span slot="message">Are you sure you want this service done Today?</span>

      <div slot="body" class="text-black">
        <p>Service: {{service.serviceName}}</p>
        <p>Type: {{service.type}}</p>
        <p>Duration: {{service.duration}}</p>
        <p>wiSkiller: {{service.wiSkiller}}</p>
        <p>Cost: {{service.cost}} Php</p>
      </div>

      <template slot="buttons" slot-scope="props">
        <q-btn color="positive" label="Confirm" @click="bookConfirm" />
        <q-btn color="negative" label="Cancel" @click="customDialogModel = false" />
      </template>
    </q-dialog>

    <q-card flat>
      <q-item class="imgProfile">
        <q-item-side :avatar="wiSkillerData.photoURL" />
      </q-item>
      <q-card-title>
        {{wiSkillerData.displayName}} <span class="text-weight-bold">Age: {{wiSkillerData.age}}</span>
        <q-rating slot="subtitle" v-model="rating" :max="5" />
      </q-card-title>
      <q-card-main>
        <p>Skills: {{service.serviceName}}</p>
        <p>Cost: {{service.cost}} Php</p>
        <p>Location: {{service.cost}} Php</p>
        <p>Credentials: TESDA</p>
        <p>Our Signature</p>
        <p>Company Name: BusyBee</p>
        <!-- <p class="text-faded">Small plates, salads & sandwiches in an intimate setting.</p> -->
      </q-card-main>
      <!-- <q-card-actions>
        <q-btn flat color="positive" class="full-width" label="Add-on Furniture?" />
      </q-card-actions> -->
    </q-card>
    <q-list no-border>
      <q-card-separator />
      <q-list-header>Reviews</q-list-header>
      <q-item v-if="reviews.length === 0" class="text-center">
        <q-item-main label="No review yet" />
      </q-item>
      <q-item v-for="(r, index) in reviews" :key="index">
        <q-item-side>
          <q-item-side :avatar="r.photoURL" />
        </q-item-side>
        <q-item-main>
          <q-item-tile label>{{r.displayName}}</q-item-tile>
          <q-item-tile sublabel>{{r.comments}}</q-item-tile>
        </q-item-main>
        <q-item-side right>
          <q-item-tile stamp>
            <vue-moments-ago prefix="" suffix="ago" :date="r.timestamp"></vue-moments-ago>
          </q-item-tile>
          <span class="text-amber">
            <q-item-tile icon="star" v-for="n in r.ratings" :key="n" />
          </span>
        </q-item-side>
      </q-item>
      <q-item v-if="parseInt(reviewsCount.length / 10) > 0">
        <q-item-main>
        </q-item-main>
        <q-pagination
          v-model="page"
          color="purple"
          :min="min"
          @input="rev"
          :max="parseInt(reviewsCount.length / 10)"
          :max-pages="minPages"
          boundary-links
          direction-links
        />
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import VueMomentsAgo from 'vue-moments-ago'
export default {
  components: {
    VueMomentsAgo
  },
  data () {
    return {
      wiSkiller: [],
      wiRequester: [],
      reviews: [],
      reviewsCount: [],
      rating: 5,
      customDialogModel: false,
      page: 1,
      min: 1,
      max: 15,
      minPages: 6
      // setTime: null
    }
  },
  mounted () {
    this.$binding('wiSkiller', this.$firebaseapp.firestore().collection('wiSkillers').doc(this.wiSkillerData.uid))
    this.$binding('wiRequester', this.$firebaseapp.firestore().collection('wiRequesters').doc(this.wiRequesterData.uid))
    this.$binding('reviews', this.$firebaseapp.firestore().collection('wiSkillers').doc(this.wiSkillerData.uid).collection('Reviews').orderBy('timestamp', 'desc').limit(10))
    this.$binding('reviewsCount', this.$firebaseapp.firestore().collection('wiSkillers').doc(this.wiSkillerData.uid).collection('Reviews'))
  },
  methods: {
    rev () {
      this.$binding('reviews', this.$firebaseapp.firestore().collection('wiSkillers').doc(this.wiSkillerData.uid).collection('Reviews').orderBy('timestamp', 'desc').startAfter(this.reviewsCount[this.page * 10].timestamp).limit(10))
    },
    bookConfirm () {
      this.customDialogModel = false
      this.$firebaseapp.firestore().collection('wiRequesters').doc(this.wiRequesterData.uid).update({
        hasBook: true
      }).then(() => {
      }).catch(error => {
        console.error('Error updating document: ', error)
      })

      this.$firebaseapp.firestore().collection('wiSkillers').doc(this.wiSkillerData.uid).update({
        hasBook: true,
        Request: {
          wiRequesterUID: this.wiRequesterData.uid,
          displayName: this.wiRequesterData.displayName,
          photoURL: this.wiRequesterData.photoURL,
          serviceName: this.service.serviceName,
          type: this.service.type,
          cost: this.service.cost,
          duration: this.service.duration,
          wiSkiller: this.service.wiSkiller
        }
      }).then(() => {
      }).catch(error => {
        console.error('Error updating document: ', error)
      })

      // this.setTime = setTimeout(() => {
      //   this.$firebaseapp.firestore().collection('wiSkillers').doc(this.wiSkillerData.uid).update({
      //     hasBook: false,
      //     Request: {}
      //   }).then(() => {
      //     this.$firebaseapp.firestore().collection('wiRequesters').doc(this.wiRequesterData.uid).update({
      //       hasBook: false
      //     }).then(() => {
      //     }).catch(error => {
      //       console.error('Error updating document: ', error)
      //     })
      //   }).catch(error => {
      //     console.error('Error updating document: ', error)
      //   })
      // }, 10000)
    },
    bookNowCancel () {
      // clearTimeout(this.setTime)
      this.$firebaseapp.firestore().collection('wiSkillers').doc(this.wiSkillerData.uid).update({
        hasBook: false,
        Request: {}
      }).then(() => {
        this.$firebaseapp.firestore().collection('wiRequesters').doc(this.wiRequesterData.uid).update({
          hasBook: false
        }).then(() => {
          this.$q.notify({
            type: 'negative',
            message: 'Cancelled',
            timeout: 800
          })
        }).catch(error => {
          console.error('Error updating document: ', error)
        })
      }).catch(error => {
        console.error('Error updating document: ', error)
      })
    }
  },
  computed: {
    service () {
      return this.$store.getters['user/service']
    },
    wiSkillerData () {
      return this.$store.getters['user/wiSkillerData']
    },
    wiRequesterData () {
      return this.$store.getters['user/currentUser']
    }
  }
}
</script>

<style>
.imgProfile {
  margin-bottom: -25px;
}
.imgProfile .q-item-avatar, .q-item-avatar img {
  width: 92px;
  height: 92px;
  border-radius: 50%;
}
</style>
