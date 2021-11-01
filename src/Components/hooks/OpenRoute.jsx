import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AppContext } from "../Context/AuthProvider";

export const OpenRoute = ({ component: Component, ...rest }) => {
	const { authenticated } = useContext(AppContext);

	return (
		<Route
			{...rest}
			render={(props) => {
				if (authenticated) {
					return (
						<Redirect
							to={{ pathname: "/products", state: { froms: props.location } }}
						/>
					);
				}
				return <Component {...props} />;
			}}
		/>
	);
};
