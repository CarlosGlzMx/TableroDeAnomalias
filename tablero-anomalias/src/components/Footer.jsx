import React from "react";
import { useLocation } from "react-router-dom";

function Footer() {

	const location = useLocation();
	if (location.pathname !== "/dashboard") {
		return (
			<div className="Footer">
				<footer id="sticky-footer" className="flex-shrink-0 py-4 bg-light text-white-50">
					<div className="container text-center">
						<small className="text-dark">Copyright &copy; Ternium</small>
					</div>
				</footer>
			</div>
		);
	} else {
		return null;
	}
}

export default Footer;