import { initializeApp } from "firebase/app";
import {
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyACvW6cy8gjtO8HXSQJG2JwEhj7vWq-SJ0",
	authDomain: "cyanstationv1.firebaseapp.com",
	databaseURL: "https://cyanstationv1-default-rtdb.firebaseio.com",
	projectId: "cyanstationv1",
	storageBucket: "cyanstationv1.appspot.com",
	messagingSenderId: "393219203234",
	appId: "1:393219203234:web:b6d04c0c4950b4248cb7fb",
	measurementId: "G-F9ZJQQGM8E",
};

// init firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// login
const googleProvider = new GoogleAuthProvider();

// init services
const db = getFirestore();

const signInWithGoogle = () => {
	signInWithPopup(auth, googleProvider)
		.then((result) => {
			const name = result.user.displayName;
			const email = result.user.email;
			const profilePic = result.user.photoURL;

			localStorage.setItem("name", name);
			localStorage.setItem("email", email);
			localStorage.setItem("profilePic", profilePic);
		})
		.catch((error) => {
			console.log(error);
		});
};

const logout = () => {
	signOut(auth);
};

export { auth, db, signInWithGoogle, logout };

// TODO
// Firebase basic security
// Restrict login to my email, al's email & Carr's email
// Only allow posts from logged in users
// Only allow delete from logged in users
