import React, { useState } from "react";
import { useMatch, useResolvedPath, NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { PlusIcon } from "@heroicons/react/solid";

import logomark from "../constants/logomark";
import classNames from "classnames";
function Navlink({ link, onClick }) {
	let resolved = useResolvedPath(link);
	let match = useMatch({ path: resolved.pathname, end: true });

	return (
		<li className="px-2 sm:px-4 md:px-6 lg:px-8 hover:text-link">
			<NavLink
				className={match ? "text-link" : ""}
				to={`/${link}`}
				onClick={onClick}>
				{link.toUpperCase()}
			</NavLink>
		</li>
	);
}

Navlink.propTypes = {
	link: PropTypes.string.isRequired,
	onClick: PropTypes.func,
};

function Navbar() {
	const [mobileNavOpen, setMobileNavOpen] = useState(false);
	return (
		<>
			<div className="w-full">
				<img src="https://firebasestorage.googleapis.com/v0/b/cyanstationv1.appspot.com/o/assets%2Fheader%20text.png?alt=media&token=96f7be8e-fc2c-4c0c-a352-dcc139775f10" />
			</div>
			<nav className="bg-navBg flex items-center justify-between sm:justify-start px-10 py-4">
				<Link to="/projects">
					<img src={logomark} className="z-10" />
				</Link>
				<ul className="hidden sm:flex justify-between w-5/6 mx-auto text-2xl font-black">
					<Navlink link={"projects"} />
					<Navlink link={"services"} />
					<Navlink link={"vision"} />
					<Navlink link={"friends"} />
				</ul>
				<PlusIcon
					className={classNames(
						mobileNavOpen ? "rotate-45" : "rotate-0",
						"h-14 w-14 sm:hidden block transition-transform z-10"
					)}
					onClick={() =>
						mobileNavOpen
							? setMobileNavOpen(false)
							: setMobileNavOpen(true)
					}
				/>
				<aside
					className={classNames(
						mobileNavOpen ? "w-full left-0" : "w-0 left-full",
						"fixed min-h-screen transition-all bg-navBg top-0"
					)}>
					<ul className="mx-auto text-2xl font-black">
						<Navlink
							link={"projects"}
							onClick={() => setMobileNavOpen(false)}
						/>
						<Navlink
							link={"services"}
							onClick={() => setMobileNavOpen(false)}
						/>
						<Navlink
							link={"vision"}
							onClick={() => setMobileNavOpen(false)}
						/>
						<Navlink
							link={"friends"}
							onClick={() => setMobileNavOpen(false)}
						/>
					</ul>
				</aside>
			</nav>
		</>
	);
}

export default Navbar;
