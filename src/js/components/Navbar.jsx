import React, { useState } from "react";
import { useMatch, useResolvedPath, NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { PlusIcon } from "@heroicons/react/solid";

import logomark from "../constants/logomark";
import classNames from "classnames";
function Navlink({ link, onClick, className }) {
	let resolved = useResolvedPath(link);
	let match = useMatch({ path: resolved.pathname, end: true });

	return (
		<li
			className={`px-2 sm:px-4 md:px-6 lg:px-8 hover:text-link ${className}`}>
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
	className: PropTypes.string,
};

function Navbar() {
	const [mobileNavOpen, setMobileNavOpen] = useState(false);
	return (
		<>
			<div className="w-full">
				<img
					className="w-full min-w-full"
					src="https://firebasestorage.googleapis.com/v0/b/cyanstationv1.appspot.com/o/assets%2Fheader%20text.png?alt=media&token=96f7be8e-fc2c-4c0c-a352-dcc139775f10"
				/>
			</div>
			<nav className="bg-navBg flex items-center justify-between sm:justify-start px-10 py-4 h-fit">
				<Link to="/projects" className="z-50">
					<img src={logomark} />
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
						"h-14 w-14 sm:hidden block transition-transform z-50"
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
						"fixed min-h-screen flex sm:hidden align-center transition-all bg-navBg top-0 pt-44 z-20"
					)}>
					<ul className="mx-auto text-2xl font-black">
						<Navlink
							className="pb-4"
							link={"projects"}
							onClick={() => setMobileNavOpen(false)}
						/>
						<Navlink
							className="pb-4"
							link={"services"}
							onClick={() => setMobileNavOpen(false)}
						/>
						<Navlink
							className="pb-4"
							link={"vision"}
							onClick={() => setMobileNavOpen(false)}
						/>
						<Navlink
							className="pb-4"
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
