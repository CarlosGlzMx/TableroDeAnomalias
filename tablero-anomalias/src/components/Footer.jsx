import React from "react";
import { useLocation } from "react-router-dom";

function Footer() {

	const location = useLocation();
	if (location.pathname !== "/dashboard") {
		return (
			<div className = "Footer" style={{ height:"6vh"}}>
				<footer className = "full-center light-text h-100" id = "footer">
					<small>Copyright &copy; Ternium</small>
				</footer>
			</div>
		);
	} else {
		return null;
	}
}

export default Footer;