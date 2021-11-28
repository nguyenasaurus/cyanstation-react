import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, logout, signInWithGoogle } from "../utils/firebase";

function Login() {
	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				const uid = user.uid;
				console.log({ user });
			} else {
				console.log("no user");
			}
		});
	}, []);

	return (
		<div className="login">
			<div className="login__container">
				<button
					className="login__btn login__google"
					onClick={signInWithGoogle}>
					Login with Google
				</button>

				<button onClick={logout}> Sign Out </button>
			</div>
		</div>
	);
}
export default Login;
