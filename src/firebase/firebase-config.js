// src/firebase/firebase-config.js
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyBKzZxxRLl6V72MWBKGhlMiztEzf8It_lM',
  authDomain: 'megabonplan-236ed.firebaseapp.com',
  projectId: 'megabonplan-236ed',
  storageBucket: 'megabonplan-236ed.appspot.com',
  messagingSenderId: '723479967409',
  appId: '1:723479967409:web:c50438e19cde38281e9490',
  measurementId: 'G-FJ7SHFR1HP',
}

const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
export default app // Ajoutez cette ligne pour exporter `app`
