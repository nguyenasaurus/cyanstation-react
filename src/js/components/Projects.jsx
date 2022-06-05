import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import ViewProject from "./ViewProject";

import EditProject from "./Projects/EditProject";
import AddNewProject from "./Projects/AddNewProject";
import { Link } from "react-router-dom";
function Projects({ userLoggedIn }) {
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [projects, setProjects] = useState([]);
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
				projectsData.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}))
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
								className="relative p-4 cursor-pointer mb-4 sm:mb-0 h-min">
								<Link to={data.projectSlug}>
									<div className="bg-white z-10 relative transition-opacity opacity-1 hover:opacity-0 pt-2 ease-in-out duration-500 h-min">
										<img src={data.mainThumbnail} alt="" />
									</div>
									<div className="absolute -top-1 sm:top-0 z-0">
										<p className="text-xl sm:text-base">
											{data.projectName}
										</p>
										<img
											src={data.hoverThumbnail}
											alt=""
											className="mt-2"
										/>
									</div>
								</Link>
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
			<Outlet />
		</>
	);
}

Projects.propTypes = {
	userLoggedIn: PropTypes.bool,
};

export default Projects;
