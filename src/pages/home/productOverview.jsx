import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "../../components/imageSlider";
import { addToCart, loadCart } from "../../utils/cart";
import toast from "react-hot-toast";

export default function ProductOverview() {
	const { key } = useParams();
	const [loadingStatus, setLoadingStatus] = useState("loading");
	const [product, setProduct] = useState({});

	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${key}`)
			.then((res) => {
				setProduct(res.data);
				setLoadingStatus("loaded");
			})
			.catch((err) => {
				console.error(err);
				setLoadingStatus("error");
			});
	}, []);


	if (loadingStatus === "loading") {
		return (
			<div className="w-full h-[80vh] flex justify-center items-center">
				<div className="w-[70px] h-[70px] border-b-4 border-b-accent animate-spin rounded-full"></div>
			</div>
		);
	}

	if (loadingStatus === "error") {
		return (
			<div className="w-full h-[80vh] flex justify-center items-center">
				<h1 className="text-3xl font-bold text-accent">An error occurred. Please try again.</h1>
			</div>
		);
	}

	return (
		<div className="w-full max-w-6xl mx-auto px-4 py-8">
			<div className="flex flex-col md:flex-row gap-8">

				<div className="md:w-1/2 w-full rounded-xl overflow-hidden shadow-md">
					<ImageSlider images={product.image} />
				</div>

				
				<div className="md:w-1/2 w-full flex flex-col justify-center space-y-4">
					<h1 className="text-3xl font-bold text-accent text-center md:text-left">{product.name}</h1>
					<h2 className="text-xl font-semibold text-gray-700">{product.category} category</h2>
					<p className="text-gray-600">{product.description}</p>

					<p className="text-2xl text-green-500 font-bold">LKR {product.price.toFixed(2)}</p>

					{product.dimensions && (
						<p className="text-sm text-gray-500">
							<span className="font-medium">Dimensions:</span> {product.dimensions}
						</p>
					)}

					<div className="flex justify-center md:justify-start">
						<button
							className="mt-4 bg-accent text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
							onClick={() => {
								addToCart(product.key, 1);
								toast.success("Added to Cart");
								console.log(loadCart());
							}}
						>
							Add to Cart
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
