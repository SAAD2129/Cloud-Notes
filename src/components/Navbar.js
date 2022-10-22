import React from 'react';
import PropTypes from 'prop-types';
import { Link, BrowserRouter as Router } from "react-router-dom";

export default function Navbar(props) {
	return (
		<>
		<Router>
			<nav className="shadow navbar navbar-expand-lg px-5">
				<div className="container-fluid">
					<Link className="navbar-brand" to="/">
						iNotebook
					</Link>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav">
							<li className="nav-item">
								<Link className="nav-link active" aria-current="page" to="/">
									Home
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link active" aria-current="page" to="/about">
									About
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className='d-flex gap-1'>
					<Link to="/api/auth/login" className="btn px-3 py-1 btn-dark">Login</Link>
					<Link to="/api/auth/login" className="btn px-3 py-1 btn-dark">Signup</Link>
				</div>
			</nav>
		</Router>
		</>
	);
}

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
};
Navbar.defaultProps = {
	title: 'Sajid Ali',
};
