import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Static/Home";
import Login from "./components/GoogleResource/GoogleLogin";
import Redirect from "./components/Home/Redirect";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/redirect" element={<Redirect />} />
			</Routes>
		</Router>
	);
};

export default App;
