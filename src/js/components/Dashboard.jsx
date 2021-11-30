import React, { useEffect, useState } from "react";
import { auth, logout, signInWithGoogle } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
// import UploadImage from "./UploadImage";

function Dashboard() {
	const [userLoggedIn, setuserLoggedIn] = useState([]);

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				setuserLoggedIn(true);
			} else {
				setuserLoggedIn(false);
			}
		});
	}, []);

	return (
		<div className="login">
			<div className="login__container">
				{userLoggedIn ? (
					<div>
						{/* <UploadImage /> */}
						<button onClick={logout}> Sign Out </button>
					</div>
				) : (
					<button
						className="login__btn login__google"
						onClick={signInWithGoogle}>
						Login with Google
					</button>
				)}
			</div>
		</div>
	);
}
export default Dashboard;
