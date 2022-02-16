import React, { useState, useEffect } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

function Vision() {
	const [vision, setVision] = useState([]);

	useEffect(() => {
		const getVision = async () => {
			// collection ref
			const queryVision = query(collection(db, "vision"));

			// get collection data
			const visionData = await getDocs(queryVision);

			setVision(
				visionData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			);
		};
		getVision();
	}, []);

	const backgroundImg = vision.map((x) => x.backgroundImg);

	return (
		<div>
			<div className="flex justify-center py-14">
				{vision.map((data) => (
					<div className="w-4/6 font-black" key={data.id}>
						<h1 className="text-highlight text-4xl">
							{data.title}
						</h1>
						<p className="text-lg leading-6 py-6">{data.copy}</p>
						<h2 className="text-highlight text-6xl">
							{data.callout}
						</h2>
					</div>
				))}
			</div>
			<img src={backgroundImg} alt="" />
		</div>
	);
}

export default Vision;
