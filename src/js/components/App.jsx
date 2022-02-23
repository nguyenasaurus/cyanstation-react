import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";

import Navbar from "./Navbar";
import Projects from "./Projects";
import Services from "./Services";
import Vision from "./Vision";
import Friends from "./Friends";
import Dashboard from "./Dashboard";
import SocialFooter from "./SocialFooter";
import classNames from "classnames";

export default function App() {
	const [userLoggedIn, setuserLoggedIn] = useState(false);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setuserLoggedIn(true);
			} else {
				setuserLoggedIn(false);
			}
		});
	}, []);

	console.log(userLoggedIn);

	return (
		<div
			className={classNames(
				"relative",
				userLoggedIn
					? "border-amber-700 border-solid border-12 border-t-40"
					: ""
			)}>
			{userLoggedIn && (
				<div className="absolute -top-12 w-full text-white">
					You're in editing mode!
				</div>
			)}

			<Router>
				<Navbar />
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route path="projects" element={<Projects />} />
					<Route path="services" element={<Services />} />
					<Route path="vision" element={<Vision />} />
					<Route path="friends" element={<Friends />} />
					<Route path="updatesite" element={<Dashboard />} />
				</Routes>
				<SocialFooter />
			</Router>
		</div>
	);
}

function Home() {
	return (
		<div>
			<h2>Home</h2>
		</div>
	);
}
