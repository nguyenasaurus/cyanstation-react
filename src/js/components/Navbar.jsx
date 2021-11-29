import React from "react";
import { useMatch, useResolvedPath, NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";

//include images into your bundle
import logomark from "../../img/logo-mark.png";

function Navlink({ link }) {
	let resolved = useResolvedPath(link);
	let match = useMatch({ path: resolved.pathname, end: true });

	return (
		<li className="px-2 sm:px-4 md:px-6 lg:px-8 hover:text-link">
			<NavLink className={match ? "text-link" : ""} to={`/${link}`}>
				{link.toUpperCase()}
			</NavLink>
		</li>
	);
}

Navlink.propTypes = {
	link: PropTypes.string.isRequired
};

function Navbar() {
	return (
		<nav className="bg-navBg flex items-center px-10 py-4">
			<Link to="/">
				<img src={logomark} />
			</Link>
			<ul className="flex justify-between w-5/6 mx-auto text-2xl font-black">
				<Navlink link={"projects"} />
				<Navlink link={"services"} />
				<Navlink link={"vision"} />
				<Navlink link={"friends"} />
			</ul>
		</nav>
	);
}

export default Navbar;
