import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { collection, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
// Direct React component imports
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";

function ViewProject({ projectId, onClose }) {
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
				slidesData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
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
					disabledClass: "hidden"
				}}>
				<SwiperSlide>
					<div className="flex items-center mx-8">
						<img
							src="https://firebasestorage.googleapis.com/v0/b/cyanstationv1.appspot.com/o/projects%2Fbranch-house%2Fslides%2Fslide-1.png?alt=media&token=bfae8907-d7e2-4119-be35-5206d2a540ea"
							alt=""
						/>
						<div className="flex flex-col ">
							<h2 className="text-4xl">Branch House</h2>
							<p className="ml-4 text-2xl">
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation
								ullamco laboris nisi ut aliquip ex ea commodo
								consequat. Duis aute irure dolor in
								reprehenderit in voluptate velit esse cillum
								dolore eu fugiat nulla pariatur. Excepteur sint
								occaecat cupidatat non proident, sunt in culpa
								qui officia deserunt mollit anim id est laborum
							</p>
						</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>Slide 2</SwiperSlide>
				<SwiperSlide>Slide 3</SwiperSlide>
				<SwiperSlide>Slide 4</SwiperSlide>
			</Swiper>
			<button onClick={() => onClose()}>Back to all projects</button>
		</div>
	);
}

ViewProject.propTypes = {
	projectId: PropTypes.string,
	onClose: PropTypes.func
};

export default ViewProject;

// const sfRef = db.collection('cities').doc('SF');
// const collections = await sfRef.listCollections();
// collections.forEach(collection => {
//   console.log('Found subcollection with id:', collection.id);
// });
