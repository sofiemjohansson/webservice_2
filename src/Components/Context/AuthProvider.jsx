import React, { createContext, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
	const [globalToken, setGlobalToken] = useState("");
	const [authenticated, setAuthenticated] = useState(false);

	return (
		<div>
			<AppContext.Provider
				value={{
					globalToken,
					setGlobalToken,
					authenticated,
					setAuthenticated,
				}}
			>
				{children}
			</AppContext.Provider>
		</div>
	);
};
export default AppProvider;
