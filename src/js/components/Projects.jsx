import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

function Projects() {
	const [projects, setProjects] = useState([]);

	// Get Services data from db
	useEffect(() => {
		const getProjects = async () => {
			const queryProjects = query(collection(db, "projects"));
			const projectsData = await getDocs(queryProjects);
			setProjects(
				projectsData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
			);
		};
		getProjects();
	}, []);

	// Get published projects
	let publishedProjects = projects.filter(
		x => x.projectStatus === "published"
	);
	// Sort by order
	publishedProjects = publishedProjects.sort(
		(a, b) => a.projectOrder - b.projectOrder
	);

	console.log(publishedProjects);

	return (
		<div id="projects" className="flex justify-center py-16">
			<div className="w-4/6">
				<main className="flex flex-wrap">
					{publishedProjects.map(data => (
						<Link key={data.id} to={data.projectName}>
							<figure className="relative px-4 py-4">
								<div className="bg-white z-10 relative transition-opacity opacity-1 hover:opacity-0 pt-6 ease-in-out duration-500">
									<img src={data.mainThumbnail} alt="" />
								</div>
								<div className="absolute top-6 z-0">
									<p>{data.projectName}</p>
									<img src={data.hoverThumbnail} alt="" />
								</div>
							</figure>
						</Link>
					))}
				</main>
				<Outlet />
			</div>
		</div>
	);
}

// Upload image
// Get image url + id
// projectName
// copy
// slideNumber

// delete
// find image in database + delete
// delete slide

function Project() {
	return <h1>just testing</h1>;
}

export { Projects, Project };
