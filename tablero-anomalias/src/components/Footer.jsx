import React from "react";
import { useLocation } from "react-router-dom";

function Footer() {

	const location = useLocation();
	if (location.pathname !== "/dashboard") {
		return (
			<div className="Footer" style={{ height:"6vh"}}>
				<footer className="bg-secondary text-light h-100 text-center d-flex align-items-center justify-content-center">
					<small>Copyright &copy; Ternium</small>
				</footer>
			</div>
		);
	} else {
		return null;
	}
}

export default Footer;