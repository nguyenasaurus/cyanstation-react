import { initializeApp } from "firebase/app";
import {
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signOut
} from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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
	measurementId: "G-F9ZJQQGM8E"
};

// init firebase app
initializeApp(firebaseConfig);
const auth = getAuth();

// login
const googleProvider = new GoogleAuthProvider();

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, "services");

// get collection data
// getDocs(colRef)
// 	.then(snapshot => {
// 		// console.log(snapshot.docs)
// 		let services = [];
// 		snapshot.docs.forEach(doc => {
// 			services.push({ ...doc.data(), id: doc.id });
// 		});
// 		console.log(services);
// 	})
// 	.catch(err => {
// 		console.log(err.message);
// 	});

const signInWithGoogle = () => {
	signInWithPopup(auth, googleProvider)
		.then(result => {
			const name = result.user.displayName;
			const email = result.user.email;
			const profilePic = result.user.photoURL;

			localStorage.setItem("name", name);
			localStorage.setItem("email", email);
			localStorage.setItem("profilePic", profilePic);
		})
		.catch(error => {
			console.log(error);
		});
};

// const signInWithEmailAndPassword = async (email, password) => {
// 	try {
// 		await auth.signInWithEmailAndPassword(email, password);
// 	} catch (err) {
// 		console.error(err);
// 		alert(err.message);
// 	}
// };

// const registerWithEmailAndPassword = async (name, email, password) => {
// 	try {
// 		const res = await auth.createUserWithEmailAndPassword(email, password);
// 		const user = res.user;
// 		await db.collection("users").add({
// 			uid: user.uid,
// 			name,
// 			authProvider: "local",
// 			email
// 		});
// 	} catch (err) {
// 		console.error(err);
// 		alert(err.message);
// 	}
// };

// const sendPasswordResetEmail = async email => {
// 	try {
// 		await auth.sendPasswordResetEmail(email);
// 		alert("Password reset link sent!");
// 	} catch (err) {
// 		console.error(err);
// 		alert(err.message);
// 	}
// };

const logout = () => {
	signOut(auth);
};

export {
	auth,
	db,
	signInWithGoogle,
	// signInWithEmailAndPassword,
	// registerWithEmailAndPassword,
	// sendPasswordResetEmail,
	logout
};
