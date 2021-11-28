import React from "react";
import { Link } from "react-router-dom";

export default function ProjectList() {
	return (
		<div>
			<h1>Hobbies</h1>
			<ul>
				<li>
					<Link to="knitting" className="link">
						Knitting
					</Link>
				</li>
				<li>
					<Link to="playingMusic" className="link">
						Playing music
					</Link>
				</li>
				<li>
					<Link to="sport" className="link">
						Sport
					</Link>
				</li>
				<li>
					<Link to="development" className="link">
						Development
					</Link>
				</li>
				<li>
					<Link to="exploringLibraries" className="link">
						Exploring libraries
					</Link>
				</li>
				<li>
					<Link to="writeArticles" className="link">
						Write articles
					</Link>
				</li>
				<li>...</li>
			</ul>
		</div>
	);
}


// Upload image
// Get image url + id
// projectName
// initialImage
// hoverImage
// projectOrder
// status: published/unpublished

// delete
// find images in database + delete
// delete project + projectSlides
