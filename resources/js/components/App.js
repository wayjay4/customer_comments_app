import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CustomerBoard from "./CustomerBoard"; 
import "./styles/customerboard.css";

function App(){
	return (
		<div className="container">
			<h2>CustomerBoard API Container</h2>

			<Switch>
				<Route path="/customerboard/">
					<CustomerBoard />
				</Route>
			</Switch>
		</div>
	);
}

if(document.getElementById("customerboard")){
	ReactDOM.render(<BrowserRouter>  <App /> </BrowserRouter>, document.getElementById("customerboard"));
}