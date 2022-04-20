import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

function SocialFooter() {
	let px1 = document.querySelector(".px-bg-1");
	let px2 = document.querySelector(".px-bg-2");
	let halfWidth = window.innerWidth / 2;
	let halfHeight = window.innerHeight / 2;
	let _mouseX = 0;
	let _mouseY = 0;
	let x_norm = _mouseX / halfWidth - 1;
	let y_norm = _mouseY / halfHeight - 1;
	let _depth1 = { x: x_norm * 8, y: y_norm * 8 };
	let _depth2 = { x: x_norm * 2, y: y_norm * 2 };

	const mouseMove = (e) => {
		_mouseX = e.clientX;
		_mouseY = e.clientY;
	};

	const onWindowResize = () => {
		halfWidth = window.innerWidth / 2;
		halfHeight = window.innerHeight / 2;
	};

	const loop = () => {
		if (_mouseX && _mouseY) {
			gsap.to(px1, {
				xPercent: _depth1.x,
				yPercent: _depth1.y,
				duration: 0.5,
				ease: "sine.out",
			});
			gsap.to(px2, {
				xPercent: _depth2.x,
				yPercent: _depth2.y,
				duration: 0.5,
				ease: "sine.out",
			});
		}
		requestAnimationFrame(loop);
	};

	// requestAnimationFrame(loop);

	// window.addEventListener("mousemove", mouseMove);
	// window.addEventListener("resize", onWindowResize);

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
				<div className="object-6">
					<h2></h2>
					<a href="homepage.html"></a>
				</div>
				<div className="object-7">
					<h2></h2>
					<a href="projects.html"></a>
				</div>
			</div>

			<section className="content-container">
				<div className="heading">
					<img
						className="logo"
						src="https://firebasestorage.googleapis.com/v0/b/cyanstationv1.appspot.com/o/assets%2Flogo%2Flogo.svg?alt=media&token=af1b4dea-f84a-4236-8b80-fc94f7868b25"
					/>
					<h2 className="text">
						architecture & transformative design //
						car@cyanstation.com
					</h2>
				</div>
			</section>
		</div>
	);
}

export default SocialFooter;
