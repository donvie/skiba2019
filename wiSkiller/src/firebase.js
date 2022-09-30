import { firebase } from '@firebase/app'
import '@firebase/firestore'
import '@firebase/auth'

const app = firebase.initializeApp({
  apiKey: 'AIzaSyBjLsVUJ4ZyZ5ZGNHEk5yYjCsMvnleIGMY',
  authDomain: 'skiba-d10d1.firebaseapp.com',
  databaseURL: 'https://skiba-d10d1.firebaseio.com',
  projectId: 'skiba-d10d1',
  storageBucket: 'skiba-d10d1.appspot.com',
  messagingSenderId: '517318649823'
})

export const firebaseapp = app
export const auth = firebase.auth
export const firestore = firebase.firestore

firebaseapp.firestore().settings({ timestampsInSnapshots: true })
