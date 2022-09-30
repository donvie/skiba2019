// import something here
// import VueFirestore from 'vue-firestore'
import { firebaseapp, auth, firestore } from 'src/firebase.js'

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  // Vue.use(VueFirestore)
  Vue.prototype.$firebaseapp = firebaseapp
  Vue.prototype.$auth = auth
  Vue.prototype.$firestore = firestore
  // Vue.prototype.$localStorage = LocalStorage
  // something to do
}
