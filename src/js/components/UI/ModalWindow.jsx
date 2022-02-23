import PropTypes from "prop-types";
import React from "react";

function ModalWindow({ children }) {
	return (
		<div className="absolute bg-black/50 w-full h-full top-0 flex pt-20 justify-center z-50">
			<div className="w-5/6 bg-white py-4 rounded">{children}</div>
		</div>
	);
}

ModalWindow.propTypes = {
	children: PropTypes.node,
};

export default ModalWindow;
