import React from "react";
import { useMatch, useResolvedPath, NavLink, Link } from "react-router-dom";
import _ from "lodash";
import PropTypes from "prop-types";

//include images into your bundle
import logomark from "../../img/logo-mark.png";

function Navlink({ link }) {
	let resolved = useResolvedPath(link);
	let match = useMatch({ path: resolved.pathname, end: true });

	return (
		<li className="px-4 sm:px-8 md:px-10 lg:px-14 hover:text-link">
			<NavLink className={match ? "text-link" : ""} to={`/${link}`}>
				{_.capitalize(link)}
			</NavLink>
		</li>
	);
}

Navlink.propTypes = {
	link: PropTypes.string.isRequired
};

function Navbar() {
	return (
		<nav className="flex items-center px-10 py-4">
			<Link to="/">
				<img src={logomark} />
			</Link>
			<ul className="flex justify-center w-full text-2xl font-black">
				<Navlink link={"projects"} />
				<Navlink link={"services"} />
				<Navlink link={"vision"} />
				<Navlink link={"friends"} />
			</ul>
		</nav>
	);
}

export default Navbar;
