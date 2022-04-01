import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import ViewProject from "./ViewProject";

import EditProject from "./Projects/EditProject";
import AddNewProject from "./Projects/AddNewProject";
function Projects({ userLoggedIn }) {
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isViewModalOpen, setIsViewModalOpen] = useState(false);
	const [projects, setProjects] = useState([]);
	const [currentProjectId, setCurrentProjectId] = useState(null);
	const [currentProjectName, setCurrentProjectName] = useState(null);
	const [isAddNewProjectModalOpen, setIsAddNewProjectModalOpen] =
		useState(false);
	const [currentProjectData, setCurrentProjectData] = useState({});

	// Get Projects data from db

	// TODO update queryProjects to include projectStatus any when logged in as admin

	useEffect(() => {
		const getProjects = async () => {
			const projectsRef = collection(db, "projects");
			const queryProjects = query(
				projectsRef,
				where("projectStatus", "==", "published"),
				orderBy("projectOrder", "asc")
			);
			const projectsData = await getDocs(queryProjects);
			setProjects(
				projectsData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			);
		};

		getProjects();
	}, []);

	return (
		<>
			<div id="projects" className="relative flex justify-center py-16">
				{userLoggedIn && (
					<div className="absolute top-4 right-16 border border-2 border-dark py-1 px-2 hover:bg-black hover:text-white">
						<button
							onClick={() => {
								setIsAddNewProjectModalOpen(true);
							}}>
							{" "}
							Add a new Project{" "}
						</button>
					</div>
				)}
				<div className="w-5/6">
					<main className="flex flex-wrap justify-around">
						{projects.map((data) => (
							<figure
								key={data.id}
								className="relative px-4 py-4 cursor-pointer">
								<button
									onClick={() => {
										setCurrentProjectId(data.id);
										setCurrentProjectName(data.projectName);
										setIsViewModalOpen(true);
									}}>
									<div className="bg-white z-10 relative transition-opacity opacity-1 hover:opacity-0 sm:pt-6 ease-in-out duration-500">
										<img src={data.mainThumbnail} alt="" />
									</div>
									<div className="sm:absolute sm:top-6 z-0">
										<p className="pt-2 sm:pt-0 text-xl sm:text-base">
											{data.projectName}
										</p>
										<img
											src={data.hoverThumbnail}
											alt=""
											className="hidden sm:block"
										/>
									</div>
								</button>
								{userLoggedIn && (
									<div className="absolute -bottom-4 w-full flex justify-between">
										<button
											onClick={() => {
												setIsEditModalOpen(true);
												setCurrentProjectData(data);
											}}
											className="hover:underline">
											Edit Project
										</button>
										<button className="hover:underline">
											Delete Project
										</button>
									</div>
								)}
							</figure>
						))}
					</main>
				</div>
			</div>
			{isViewModalOpen && (
				<ViewProject
					projectId={currentProjectId}
					projectName={currentProjectName}
					onClose={() => {
						setIsViewModalOpen(false);
					}}
				/>
			)}

			{userLoggedIn && isEditModalOpen && (
				<EditProject
					currentProjectData={currentProjectData}
					onClose={() => {
						setIsEditModalOpen(false);
					}}
				/>
			)}

			{userLoggedIn && isAddNewProjectModalOpen && (
				<AddNewProject
					onClose={() => {
						setIsAddNewProjectModalOpen(false);
					}}
				/>
			)}
		</>
	);
}

Projects.propTypes = {
	userLoggedIn: PropTypes.bool,
};

export default Projects;
