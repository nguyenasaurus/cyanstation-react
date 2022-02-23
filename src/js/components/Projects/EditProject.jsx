import PropTypes from "prop-types";
import React from "react";

import ModalWindow from "../UI/ModalWindow";

function EditProject({ onClose }) {
	return (
		<ModalWindow>
			<div>
				Edit project
				<button onClick={onClose}>Close</button>
			</div>
		</ModalWindow>
	);
}

EditProject.propTypes = {
	onClose: PropTypes.func,
};

export default EditProject;
