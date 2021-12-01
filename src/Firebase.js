import firebase from "firebase/compat/app"
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';



const firebaseConfig = {
    apiKey: "AIzaSyCEQQoTYGUkBlsDsGAR15b5yCxXu2ZCGbs",
    authDomain: "solruf-c0da0.firebaseapp.com",
    projectId: "solruf-c0da0",
    storageBucket: "solruf-c0da0.appspot.com",
    messagingSenderId: "467625322236",
    appId: "1:467625322236:web:b599dd06a1a8c3a271d979"
  };
 

 if(!firebase.apps.length) firebase.initializeApp(firebaseConfig)

 const storage = firebase.storage()
 const auth = firebase.auth()
 const db = firebase.firestore()
 
 export {auth,db,firebase,storage} 

