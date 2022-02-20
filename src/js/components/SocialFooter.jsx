import React from "react";
import { Link } from "react-router-dom";

function SocialFooter() {
	const FacebookLogo =
		"https://firebasestorage.googleapis.com/v0/b/cyanstationv1.appspot.com/o/assets%2Fsocial-facebook.png?alt=media&token=1ef5fc72-6841-4fe0-9035-57094854fdcd";
	const LinkedInLogo =
		"https://firebasestorage.googleapis.com/v0/b/cyanstationv1.appspot.com/o/assets%2Fsocial-linkedin.png?alt=media&token=9b10243a-ccac-4af4-a1ce-727835904c82";
	const InstagramLogo =
		"https://firebasestorage.googleapis.com/v0/b/cyanstationv1.appspot.com/o/assets%2Fsocial-instagram.png?alt=media&token=055c9c6b-9086-4169-bb5c-b54114aa2ae1";

	return (
		<footer className="absolute bottom-4 left-4">
			<ul className="flex flex-column pl-0">
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
