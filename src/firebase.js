import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyCQ-0jI4PEK5YUjRYORVdcD6CYemApzIw4",
  authDomain: "trade-dart-2.firebaseapp.com",
  projectId: "trade-dart-2",
  storageBucket: "trade-dart-2.appspot.com",
  messagingSenderId: "1061355931486",
  appId: "1:1061355931486:web:bcf61a7b5f1805f28b31cf",
  measurementId: "G-STYGB4096H"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
export default firebase;