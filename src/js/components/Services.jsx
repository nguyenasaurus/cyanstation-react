import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import {
	useAccordionButton,
	Accordion,
	Card,
	AccordionContext,
} from "react-bootstrap";

function ContextAwareToggle({ children, eventKey, callback }) {
	const { activeEventKey } = useContext(AccordionContext);

	const decoratedOnClick = useAccordionButton(
		eventKey,
		() => callback && callback(eventKey)
	);

	const isCurrentEventKey = activeEventKey === eventKey;

	const arrowDown =
		"https://firebasestorage.googleapis.com/v0/b/cyanstationv1.appspot.com/o/assets%2Farrow-down.png?alt=media&token=aae45e0a-0874-4251-a0fe-ae5c72a6a837";

	return (
		<button
			type="button"
			className="flex items-center justify-between w-full bg-transparent border-b-2 border-dashed pb-2"
			onClick={decoratedOnClick}>
			<span className="text-2xl font-black">{children}</span>
			<img
				src={arrowDown}
				className={`h-8 w-8 transition-transform transform ${
					isCurrentEventKey ? "-rotate-180" : ""
				}`}
			/>
		</button>
	);
}

ContextAwareToggle.propTypes = {
	callback: PropTypes.func,
	children: PropTypes.string,
	eventKey: PropTypes.string,
};

function Services() {
	const [services, setServices] = useState([]);

	// Get Services data from db
	useEffect(() => {
		const getServices = async () => {
			const queryServices = query(collection(db, "services"));
			const servicesData = await getDocs(queryServices);
			setServices(
				servicesData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			);
		};
		getServices();
	}, []);

	// Sort by order
	services.sort((a, b) => a.order - b.order);

	return (
		<div className="flex justify-center py-16">
			<Accordion className="w-4/6">
				{services.map((data) => (
					<article className="mb-6" key={data.id}>
						<ContextAwareToggle eventKey={data.id}>
							{data.serviceName}
						</ContextAwareToggle>
						<Accordion.Collapse eventKey={data.id}>
							<Card.Body>{data.serviceDescription}</Card.Body>
						</Accordion.Collapse>
					</article>
				))}
			</Accordion>
		</div>
	);
}

export default Services;
