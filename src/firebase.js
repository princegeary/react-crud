import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyArsL8q6c-bNgSSMscezo_EDhzPvjNBNmY",
    authDomain: "contacts-crud-3b31a.firebaseapp.com",
    projectId: "contacts-crud-3b31a",
    storageBucket: "contacts-crud-3b31a.appspot.com",
    messagingSenderId: "88490199253",
    appId: "1:88490199253:web:ddeb7b8002007b6338fa5c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;