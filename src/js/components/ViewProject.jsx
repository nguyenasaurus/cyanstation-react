import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { collection, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
// Direct React component imports
import { Swiper, SwiperSlide } from "swiper/react";

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
		<div className="bg-white min-h-full w-full absolute top-0 z-20">
			{/* logo */}
			<Swiper
				modules={[Navigation]}
				spaceBetween={0}
				slidesPerView={1}
				navigation={{
					disabledClass: "hidden",
				}}>
				{slides.map((data) => (
					<SwiperSlide key={data.id}>
						<div className="flex items-center mx-8">
							<img src={data.slideImage} alt="" />
							<div className="flex flex-col ">
								<h2 className="text-4xl">{projectName}</h2>
								<p className="ml-4 text-2xl">
									{data.slideCopy}
								</p>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
			<button onClick={() => onClose()}>Back to all projects</button>
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
