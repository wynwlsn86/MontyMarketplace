import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
// import axios from "axios";
import './Header.css'

import headerLogo from '../../assets/Monty-logo2.png'

export const Header = () => {
	return (
		<div className="header-container">
			<div className="header-logo-container">
				<img src={headerLogo} alt="Monty logo" className="header-logo" />
			</div>

			<div className="nav-column-one">
				<li className="nav-one">
					<Link to="/">Home</Link>
				</li>
				<li className="nav-one">
					<Link to="/marketplace">Apparel</Link>
				</li>
				<li className="nav-one">
					<Link to="/marketplace">Phones</Link>
				</li>
			</div>
			<div className="nav-column-two">
				<li className="nav-two">
					<Link to="/about">About</Link>
				</li>
				<li className="nav-two">
					<Link to="/contact">Contact</Link>
				</li>
			</div>
		</div>
	)
}
