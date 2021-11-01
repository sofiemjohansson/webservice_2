import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../Context/AuthProvider";

const Products = () => {
	const { globalToken, setAuthenticated, setGlobalToken } = useContext(
		AppContext
	);
	const [stateCreateProduct, setStateCreateProduct] = useState({
		name: "",
		description: "",
		price: 0,
	});
	const [product, setProduct] = useState([]);
	const [message, setMessage] = useState("");
	const [favorites, setFavorites] = useState([]);

	useEffect(() => {
		getproducts();
		getFavourites();
	}, []);

	const createProductData = (e) => {
		setStateCreateProduct({
			...stateCreateProduct,
			[e.target.name]: e.target.value,
		});
	};

	const createProductHandler = (e) => {
		e.preventDefault();
		const createProduct = async () => {
			const response = await fetch("/product/create", {
				method: "PUT",
				body: JSON.stringify(stateCreateProduct),
				headers: {
					token: globalToken,
					"Content-Type": "application/json",
				},
			});
			if (response.status === 200) {
				const data = await response.text();
				setMessage(data);
			}
			if (response.status === 409) {
				const data = await response.text();
				setMessage(data);
			}
			if (response.status === 500) {
				const data = await response.text();
				setMessage(data);
			}
		};
		createProduct();
		getproducts();
	};

	const getproducts = async () => {
		const response = await fetch("/product/all", {
			method: "GET",
			headers: {
				token: globalToken,
			},
		});
		const data = await response.json();
		setProduct(data);
	};

	const logOutHandler = () => {
		const logOutUser = async () => {
			const response = await fetch("/user/logout", {
				method: "POST",
				headers: { token: globalToken },
			});
			if (response.status === 200) {
				setGlobalToken("");
			}
		};
		logOutUser();
		console.log("globaltoken in products", globalToken);
	};
	if (globalToken === "") {
		setAuthenticated(false);
	}

	const createFavorite = async (product) => {
		const name = product.name;
		await fetch("/product/add-favorite", {
			method: "PUT",
			body: name,
			headers: {
				token: globalToken,
			},
		});
		getFavourites();
	};

	const getFavourites = async () => {
		const response = await fetch("/product/favorites", {
			method: "GET",
			headers: {
				token: globalToken,
			},
		});
		const data = await response.json();
		setFavorites(data);
	};

	return (
		<div style={{ maxWidth: "60rem", textAlign: "center", margin: "auto" }}>
			<button onClick={logOutHandler}>Log out</button>
			<h2>List of products</h2>
			<ul style={{ listStyle: "none" }}>
				{product.map((product, index) => {
					return (
						<li style={{ margin: "10px" }} key={index}>
							<text style={{ fontWeight: "bold", margin: "10px" }}>
								{product.name}
							</text>
							<text style={{ margin: "10px" }}>{product.description}</text>
							<text style={{ margin: "10px" }}>{product.price}</text>
							<button
								className="fas fa-heart"
								onClick={() => createFavorite(product)}
							></button>
						</li>
					);
				})}
			</ul>
			<h2>Favorites</h2>
			<ul style={{ listStyle: "none" }}>
				{favorites.map((favorite, index) => {
					return (
						<li style={{ margin: "10px" }} key={index}>
							<text style={{ fontWeight: "bold", margin: "10px" }}>
								{favorite.name}
							</text>
							<text style={{ margin: "10px" }}>{favorite.description}</text>
							<text style={{ margin: "10px" }}>{favorite.price}</text>
						</li>
					);
				})}
			</ul>
			<div style={{ fontWeight: "bold" }}>{message}</div>
			<form onSubmit={createProductHandler}>
				<input
					type="text"
					name="name"
					placeholder="Product name"
					onChange={createProductData}
				/>
				<input
					type="text"
					name="description"
					placeholder="Description"
					onChange={createProductData}
				/>
				<input
					type="number"
					name="price"
					placeholder="Price (Only whole numbers)"
					onChange={createProductData}
				/>
				<button type="submit">Add product</button>
			</form>
		</div>
	);
};
export default Products;
