import React, { useEffect, useState } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import {
	collection,
	query,
	where,
	orderBy,
	getDocs,
	connectFirestoreEmulator,
} from "firebase/firestore";
import { db } from "../utils/firebase";
// Direct React component imports
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import logomark from "../constants/logomark";

function ViewProject() {
	const navigate = useNavigate();
	const { projectId } = useParams();

	const [slides, setSlides] = useState([]);

	useEffect(() => {
		const getSlides = async () => {
			const projectsRef = collection(db, "projects");
			const projectQuery = query(
				projectsRef,
				where("projectSlug", "==", projectId)
			);
			const projectData = await getDocs(projectQuery);
			const project = projectData.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));

			const slidesRef = collection(
				db,
				"projects",
				project[0].id,
				"slides"
			);
			const slidesData = await getDocs(
				slidesRef,
				where("slideStatus", "==", "published"),
				orderBy("slideOrder", "asc")
			);
			setSlides(
				slidesData.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
					projectName: project[0].projectName,
				}))
			);
		};
		getSlides();
	}, []);
	return (
		<div className="bg-white min-h-full w-full absolute top-0 z-50">
			<div className="flex items-center">
				<button className="min-w-fit" onClick={() => onClose()}>
					<img src={logomark} />
				</button>
				<h2 className="text-4xl px-2 sm:hidden">
					{slides[0]?.projectName}
				</h2>
			</div>
			<Swiper
				className="project-slides"
				modules={[Navigation]}
				spaceBetween={0}
				slidesPerView={1}
				navigation={{
					disabledClass: "hidden",
				}}>
				{slides?.map((data) => (
					<SwiperSlide key={data.id}>
						<div className="flex items-top justify-center mx-8 relative flex-col sm:flex-row">
							<img
								className="w-2/6"
								src={data.slideImage}
								alt=""
							/>
							<div className="mx-4 sm:m-0 sm:h-full sm:w-6/12">
								<h2 className="text-4xl mb-2 py-2 px-4 sm:block hidden">
									{data.projectName}
								</h2>
								<p className="sm:h-5/6 sm:flex sm:flex-col sm:justify-center">
									<span className="bg-white py-2 px-4 lg:mr-6">
										{data.slideCopy}
									</span>
								</p>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>

			<div className="flex justify-end mr-4">
				<button
					className="border-2 py-2 px-4"
					onClick={() => navigate(-1)}>
					Back to all projects
				</button>
			</div>
			<Outlet />
		</div>
	);
}

export default ViewProject;
