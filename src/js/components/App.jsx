import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth, logout } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";

import Navbar from "./Navbar";
import Projects from "./Projects";
import ViewProject from "./ViewProject";
import Services from "./Services";
import Vision from "./Vision";
import Friends from "./Friends";
import Dashboard from "./Dashboard";
import SocialFooter from "./SocialFooter";
import LandingPage from "./LandingPage";
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

	return (
		<div
			className={classNames(
				"relative",
				userLoggedIn
					? "border-amber-700 border-solid border-12 border-t-40"
					: ""
			)}>
			{userLoggedIn && (
				<div className="absolute -top-12 w-full text-white flex justify-between items-center pt-1.5">
					<div className="">You're in editing mode!</div>
					<div className="border py-1 px-2">
						<button onClick={logout}> Sign Out </button>
					</div>
				</div>
			)}

			<Router>
				<Navbar />
				<Routes>
					<Route exact path="/" element={<LandingPage />} />
					<Route
						path="projects"
						element={<Projects userLoggedIn={userLoggedIn} />}>
						<Route path=":projectId" element={<ViewProject />} />
					</Route>
					<Route path="services" element={<Services />} />
					<Route path="/vision" element={<Vision />} />
					<Route path="/friends" element={<Friends />} />
					<Route path="/dashboard" element={<Dashboard />} />
				</Routes>
				<SocialFooter />
			</Router>
		</div>
	);
}
