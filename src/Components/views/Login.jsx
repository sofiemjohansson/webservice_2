import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../Context/AuthProvider";

const Login = () => {
	const [usernameState, setUsernameState] = useState("");
	const [passwordState, setPasswordState] = useState("");
	const [message, setMessage] = useState("");
	const { setAuthenticated, setGlobalToken } = useContext(AppContext);

	let history = useHistory();

	const changeUsername = (e) => {
		setUsernameState(e.target.value);
	};

	const changePassword = (e) => {
		setPasswordState(e.target.value);
	};

	const loginUserHandler = (e) => {
		e.preventDefault();
		const loginUser = async () => {
			const response = await fetch("/user/login", {
				method: "POST",
				headers: {
					username: usernameState,
					password: passwordState,
				},
			});

			if (response.status !== 200) {
				setMessage("Wrong credentials!");
			}
			if (response.status !== 406 && response.status === 200) {
				const data = await response.text();
				setGlobalToken(data);
				setAuthenticated(true);
				history.push("/products");
			}
		};
		loginUser();
	};

	return (
		<div style={{ maxWidth: "60rem", textAlign: "center", margin: "auto" }}>
			<h1>Login</h1>
			<div>{message}</div>
			<form onSubmit={loginUserHandler}>
				<input
					type="text"
					name="username"
					placeholder="Username"
					onChange={changeUsername}
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					onChange={changePassword}
				/>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};
export default Login;
