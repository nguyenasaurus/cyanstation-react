import React, { useState } from "react";
import { useMatch, useResolvedPath, NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { PlusIcon } from "@heroicons/react/solid";

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
			<div className="w-full relative">
				<img
					className="w-full h-8 object-cover"
					src="https://firebasestorage.googleapis.com/v0/b/cyanstationv1.appspot.com/o/Cyan%20Station%20Background%20Image%20(1).PNG?alt=media&token=e7994f80-cff9-4e86-9691-e95cb6fb8bae"
				/>
				<img
					className="h-6 absolute left-8 top-1 hidden sm:block"
					src="https://firebasestorage.googleapis.com/v0/b/cyanstationv1.appspot.com/o/cyan%20station%20logo%20(1).svg?alt=media&token=1dfb4df9-0d5c-47ea-9b65-4214dfc5debd"
					alt=""
				/>
				<h1 className="absolute top-1.5 right-2 sm:right-8">
					architecture & transformative design
				</h1>
			</div>
			<nav className="bg-navBg flex items-center justify-between sm:justify-start px-10 py-4 h-fit">
				<Link to="/projects" className="z-50">
					<img
						className="w-16 h-16"
						src="https://firebasestorage.googleapis.com/v0/b/cyanstationv1.appspot.com/o/assets%2Flogomark.svg?alt=media&token=04f4cc24-4f12-4711-bc07-3367495cf176"
					/>
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
					<ul className="mx-auto text-2xl font-black text-center">
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
