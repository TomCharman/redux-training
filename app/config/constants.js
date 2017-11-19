import firebase from 'firebase'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyCjO_34xFR10F8jgtjWBNtnqMrRpwcuN34',
  authDomain: 'react-redux-training-88c51.firebaseapp.com',
  databaseURL: 'https://react-redux-training-88c51.firebaseio.com',
  projectId: 'react-redux-training-88c51',
  storageBucket: 'react-redux-training-88c51.appspot.com',
  messagingSenderId: '940235058205',
}
firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth

export const usersDucksExpirationLength = 1000000
export const userExpirationLength = 100000
