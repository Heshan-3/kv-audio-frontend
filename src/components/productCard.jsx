import { Link } from "react-router-dom";

export default function ProductCard({ item }) {
	return (
		<div className="w-full max-w-[300px] bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 m-4 flex flex-col p-[10px]">
			
			<div className="w-full h-[200px] md:h-[240px] overflow-hidden object-cover">
				<img
					src={item.image[0]}
					alt={item.name}
					className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
				/>
			</div>


			<div className="p-4 flex flex-col justify-between flex-1">
				<div className="mb-3">
					<h2 className="text-lg md:text-xl font-semibold text-accent mb-1 truncate">{item.name}</h2>
					<p className="text-sm text-gray-500">{item.category}</p>
					<p className="text-gray-700 text-sm mt-2 line-clamp-3">{item.description}</p>
				</div>


				<div className="mt-auto space-y-2">
					<div className="flex justify-between items-center">
						<span className="text-base md:text-lg font-bold text-green-600">LKR {item.price}</span>
						<span
							className={`px-3 py-1 text-xs font-medium rounded-full ${
								item.availability
									? "bg-green-100 text-green-700"
									: "bg-red-100 text-red-700"
							}`}
						>
							{item.availability ? "In Stock" : "Out of Stock"}
						</span>
					</div>
					<p className="text-xs text-gray-600">
						<span className="font-medium">Dimensions:</span> {item.dimensions}
					</p>
				</div>
			</div>

			<div className="p-4 pt-2">
				<Link
					to={`/product/${item.key}`}
					className="block w-full text-center bg-accent text-white py-2 rounded-lg hover:bg-accent/90 transition"
				>
					View Details
				</Link>
			</div>
		</div>
	);
}
