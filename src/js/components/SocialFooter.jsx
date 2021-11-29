import React from "react";
import { Link } from "react-router-dom";

//include images into your bundle
import FacebookLogo from "../../img/social-facebook.png";
import LinkedInLogo from "../../img/social-linkedin.png";
import InstagramLogo from "../../img/social-instagram.png";

function SocialFooter() {
	return (
		<footer className="absolute bottom-4 left-4">
			<ul className="flex flex-column">
				<li className="mt-2">
					<Link to="/">
						<img src={InstagramLogo} />
					</Link>
				</li>
				<li className="mt-2">
					<Link to="/">
						<img src={FacebookLogo} />
					</Link>
				</li>
				<li className="mt-2">
					<Link to="/">
						<img src={LinkedInLogo} />
					</Link>
				</li>
			</ul>
		</footer>
	);
}

export default SocialFooter;
