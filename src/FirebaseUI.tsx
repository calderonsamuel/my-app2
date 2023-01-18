import React, { Component } from 'react'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAag09imES8gJjo8qw_xP0MRtKBK7Dh1fY",
  authDomain: "reporte-app-c0a2c.firebaseapp.com",
  projectId: "reporte-app-c0a2c",
  storageBucket: "reporte-app-c0a2c.appspot.com",
  messagingSenderId: "885404620988",
  appId: "1:885404620988:web:da8b3e040a001f8b3d58b9",
  measurementId: "G-ZX0FS42ZB3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider().addScope('https://www.googleapis.com/auth/contacts.readonly');

signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;

    console.log(user)
    // ...
  }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
  });

// Get a list of cities from your database
async function getUsers(db: any) {
  const usersCol = collection(db, 'users');
  const userSnapshot = await getDocs(usersCol);
  const userList = userSnapshot.docs.map(doc => doc.data());
  return userList;
}

export default class FirebaseUI extends Component {
    constructor(props: any) {
        super(props);
        this.signIn = this.signIn.bind(this);
      }
    
    signIn() {
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;

            console.log(user)
            // ...
        }).catch((error) => {
        //     // Handle Errors here.
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     // The email of the user's account used.
        //     const email = error.customData.email;
        //     // The AuthCredential type that was used.
        //     const credential = GoogleAuthProvider.credentialFromError(error);
        //     // ...
        });
    }

  render() {
    (async () => {
        console.log(await getUsers(db))
      })()
    return (
      <div>FirebaseUI hello
          <input name="Sign in" id="btnSignIn" className="btn btn-primary" type="button" value="Sign in with Google" onClick={this.signIn}/>
      </div>
    )
  }
}
