import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Projects from "./Projects";
import Services from "./Services";
import Vision from "./Vision";
import Friends from "./Friends";
import Login from "./Login";
import SocialFooter from "./SocialFooter";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route path="/projects" element={<Projects />} />
				<Route path="/services" element={<Services />} />
				<Route path="/vision" element={<Vision />} />
				<Route path="/friends" element={<Friends />} />
				<Route path="/updatesite" element={<Login />} />
			</Routes>
			<SocialFooter />
		</Router>
	);
}

function Home() {
	return (
		<div>
			<h2>Home</h2>
		</div>
	);
}
