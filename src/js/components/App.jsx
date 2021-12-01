import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Projects from "./Projects";
import Services from "./Services";
import Vision from "./Vision";
import Friends from "./Friends";
import Dashboard from "./Dashboard";
import SocialFooter from "./SocialFooter";

export default function App() {
	return (
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
	);
}

function Home() {
	return (
		<div>
			<h2>Home</h2>
		</div>
	);
}
