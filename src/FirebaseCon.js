import firebase from 'firebase';

// Initialize Firebase
let config = {
    apiKey: "AIzaSyBk0fTh5DUhAx87B2htcIz7IyOQTDQBOWA",
    authDomain: "findofood-96e56.firebaseapp.com",
    databaseURL: "https://findofood-96e56.firebaseio.com",
    projectId: "findofood-96e56",
    storageBucket: "findofood-96e56.appspot.com",
    messagingSenderId: "189116273004"
};
firebase.initializeApp(config);

export default firebase
