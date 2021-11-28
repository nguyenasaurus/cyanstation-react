import React, { useState, useEffect } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

function Services() {
	const [services, setServices] = useState([]);

	useEffect(() => {
		const getServices = async () => {
			// collection ref
			const queryServices = query(collection(db, "services"));

			// get collection data
			const servicesData = await getDocs(queryServices);

			setServices(
				servicesData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
			);
		};
		getServices();
	}, []);

	return (
		<div>
			<h1>Services</h1>
			{services.map(data => (
				<div className="service" key={data.id}>
					<p>{data.serviceName}</p>
					{data.serviceDescription}
				</div>
			))}
		</div>
	);
}

export default Services;
