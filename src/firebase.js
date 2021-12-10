import firebase  from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDGNJqsZS7TRbx-VwP8FldTJ4Vfqorabs0",
  authDomain: "mojtestprojekt-e7e45.firebaseapp.com",
  projectId: "mojtestprojekt-e7e45",
  storageBucket: "mojtestprojekt-e7e45.appspot.com",
  messagingSenderId: "57359212568",
  appId: "1:57359212568:web:a69a4dc069c883cf56636d",
  databaseURL: "https://mojtestprojekt-e7e45-default-rtdb.europe-west1.firebasedatabase.app/",
};

firebase.initializeApp(firebaseConfig)
const auth = firebase.auth();
const db = firebase.database();

export {db, auth};