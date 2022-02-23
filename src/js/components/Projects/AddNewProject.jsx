import PropTypes from "prop-types";
import React from "react";

import ModalWindow from "../UI/ModalWindow";

function AddNewProject({ onClose }) {
	return (
		<ModalWindow>
			<div>
				Add a new project
				<button onClick={onClose}>Close</button>
			</div>
		</ModalWindow>
	);
}

AddNewProject.propTypes = {
	onClose: PropTypes.func,
};

export default AddNewProject;
