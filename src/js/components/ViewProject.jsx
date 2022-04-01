import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { collection, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
// Direct React component imports
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import logomark from "../constants/logomark";

function ViewProject({ projectId, projectName, onClose }) {
	const [slides, setSlides] = useState([]);
	useEffect(() => {
		const getSlides = async () => {
			const slidesRef = collection(db, "projects", projectId, "slides");
			const slidesData = await getDocs(
				slidesRef,
				where("slideStatus", "==", "published"),
				orderBy("slideOrder", "asc")
			);
			setSlides(
				slidesData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
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
				<h2 className="text-4xl px-2 sm:hidden">{projectName}</h2>
			</div>
			<Swiper
				className="project-slides"
				modules={[Navigation]}
				spaceBetween={0}
				slidesPerView={1}
				navigation={{
					disabledClass: "hidden",
				}}>
				{slides.map((data) => (
					<SwiperSlide key={data.id}>
						<div className="flex items-center mx-8 relative flex-col sm:flex-row">
							<img src={data.slideImage} alt="" />
							<div className="mt-4 my-4 sm:m-0 sm:absolute sm:h-full sm:w-6/12 sm:right-8">
								<h2 className="text-4xl mb-2 py-2 sm:block hidden">
									{projectName}
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
					className="border-2 py-2  px-4"
					onClick={() => onClose()}>
					Back to all projects
				</button>
			</div>
		</div>
	);
}

ViewProject.propTypes = {
	projectId: PropTypes.string,
	projectName: PropTypes.string,
	onClose: PropTypes.func,
};

export default ViewProject;

// const sfRef = db.collection('cities').doc('SF');
// const collections = await sfRef.listCollections();
// collections.forEach(collection => {
//   console.log('Found subcollection with id:', collection.id);
// });
