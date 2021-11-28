import React from "react";
import { Link } from "react-router-dom";

//include images into your bundle
import logomark from "../../img/logo-mark.png";

function Navbar() {
	return (
		<nav>
			<Link to="/">
				<img src={logomark} />
			</Link>
			<Link to="/projects">Projects</Link>
			<Link to="/services">Services</Link>
			<Link to="/vision">Vision</Link>
			<Link to="/friends">Friends</Link>
		</nav>
	);
}

export default Navbar;
