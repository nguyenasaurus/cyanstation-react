import React, { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import ViewProject from "./ViewProject";

let publishedProjects;

function Projects() {
	// const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isViewModalOpen, setIsViewModalOpen] = useState(false);
	const [projects, setProjects] = useState([]);
	const [currentProjectId, setCurrentProjectId] = useState(null);

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
	publishedProjects = projects.filter(x => x.projectStatus === "published");
	// Sort by projects order
	publishedProjects = publishedProjects.sort(
		(a, b) => a.projectOrder - b.projectOrder
	);

	return (
		<>
			<div id="projects" className="flex justify-center py-16">
				<div className="w-4/6">
					<main className="flex flex-wrap">
						{publishedProjects.map(data => (
							<figure
								onClick={() => {
									setCurrentProjectId(data.id);
									setIsViewModalOpen(true);
								}}
								key={data.id}
								className="relative px-4 py-4 cursor-pointer">
								<div className="bg-white z-10 relative transition-opacity opacity-1 hover:opacity-0 pt-6 ease-in-out duration-500">
									<img src={data.mainThumbnail} alt="" />
								</div>
								<div className="absolute top-6 z-0">
									<p>{data.projectName}</p>
									<img src={data.hoverThumbnail} alt="" />
								</div>
							</figure>
						))}
					</main>
				</div>
			</div>
			{isViewModalOpen ? (
				<ViewProject
					projectId={currentProjectId}
					onClose={() => {
						setIsViewModalOpen(false);
					}}
				/>
			) : null}
			;
		</>
	);
}

export default Projects;
