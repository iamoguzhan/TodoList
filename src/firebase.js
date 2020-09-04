import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyD5Q7s9FprN-PAV3qNwwi6Sjm7HMCLRwZg",
  authDomain: "todo-list-e2ffd.firebaseapp.com",
  databaseURL: "https://todo-list-e2ffd.firebaseio.com",
  projectId: "todo-list-e2ffd",
  storageBucket: "todo-list-e2ffd.appspot.com",
  messagingSenderId: "318992865440",
  appId: "1:318992865440:web:ec5c428870559a39c691c5"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
