import PropTypes from "prop-types";
import React from "react";

import { Form } from "react-bootstrap";

import ModalWindow from "../UI/ModalWindow";

function EditProject({ currentProjectData, onClose }) {
	console.log(currentProjectData);

	return (
		<ModalWindow>
			<article className="flex flex-col px-4">
				<Form>
					<Form.Group className="flex mb-2" controlId="projectName">
						<Form.Label className="mr-2">Project Name</Form.Label>
						<Form.Control
							type="text"
							placeholder={currentProjectData.projectName}
						/>
					</Form.Group>

					{/* 
						Project Order & Status

						Main image
						Hover image

						Slides
							Slide Order & Status
							Slide Image
							Slide Copy
					 */}

					<button type="submit">Save</button>
				</Form>
				<button onClick={onClose}>Cancel</button>
			</article>
		</ModalWindow>
	);
}

EditProject.propTypes = {
	currentProjectData: PropTypes.object,
	onClose: PropTypes.func,
};

export default EditProject;
