import React, { useEffect, useState } from "react";
import Login from "./Components/views/Login";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./Components/views/Register";
import Products from "./Components/views/Products";
import { OpenRoute } from "./Components/hooks/OpenRoute";
import { PrivateRoute } from "./Components/hooks/PrivateRoute";

function App() {
	return (
		<Router className="App">
			<OpenRoute exact path="/" component={Login} />
			<OpenRoute exact path="/" component={Register} />
			<PrivateRoute exact path="/products" component={Products} />
		</Router>
	);
}

export default App;
