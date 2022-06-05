import React, { useEffect } from "react";
import importScript from "../utils/importScript";
import { ArrowNarrowDownIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

function LandingPage() {
	importScript(
		"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.1/gsap.min.js"
	);
	importScript("https://code.jquery.com/jquery-3.6.0.min.js");
	importScript(
		`https://firebasestorage.googleapis.com/v0/b/cyanstationv1.appspot.com/o/assets%2Fobjects%2Fobjects.js?alt=media&token=ae3ba8e9-f20f-4c93-88e5-f604818973f1`
	);

	useEffect(() => {
		document.getElementById("app").classList.add("landingPage");

		return () => {
			document.getElementById("app").classList.remove("landingPage");
		};
	}, []);

	return (
		<div id="container">
			<div className="parallax">
				<div className="px-bg-1"></div>
				<div className="px-bg-2"></div>
			</div>
			<div className="floating-objects">
				<div className="object-1">
					<a href="homepage.html"></a>
				</div>
				<div className="object-2">
					<a href="homepage.html"></a>
				</div>
				<div className="object-3">
					<a href="homepage.html"></a>
				</div>
				<div className="object-4">
					<a href="homepage.html"></a>
				</div>
				<div className="object-5">
					<a href="homepage.html"></a>
				</div>

				<Link
					to="/projects"
					className="object-6 pointer-events-auto text-black hover:text-black flex flex-col items-center">
					<ArrowNarrowDownIcon className="w-20 h-20" />
					<h2 className="text-2xl">enter here</h2>
				</Link>
			</div>

			<section className="content-container">
				<div className="heading">
					<img
						className="logo"
						src="https://firebasestorage.googleapis.com/v0/b/cyanstationv1.appspot.com/o/assets%2Flogo%2Flogo.svg?alt=media&token=af1b4dea-f84a-4236-8b80-fc94f7868b25"
					/>
					<h2 className="text-black">
						architecture & transformative design //
						car@cyanstation.com
					</h2>
				</div>
			</section>
		</div>
	);
}

export default LandingPage;
