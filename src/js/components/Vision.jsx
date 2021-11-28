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
				visionData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
			);
		};
		getVision();
	}, []);

	return (
		<div className="min-h-screen">
			<h1 className="text-link">Vision</h1>
			{vision.map(data => (
				<div className="service" key={data.id}>
					<p>{data.title}</p>
					{data.copy}
					{data.callout}
				</div>
			))}
		</div>
	);
}

export default Vision;
