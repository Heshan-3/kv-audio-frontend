import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import ProductCard from "../../components/productCard";

export default function Home() {

    const [state, setState] = useState("loading")
        const [items, setItems] = useState([])
        const [reviews, setReviews] = useState([])
    
        useEffect(()=>{
            if(state == "loading"){
                axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`).then((res)=>{
                    console.log(res.data)
                    setItems(res.data.slice(0,4))
                    setState("success")
                }).catch((err)=>{
                    toast.error(err?.response?.data?.error || "An error occured")
                    setState("error")
                })
            }
        },[])

        useEffect(()=>{
            if(setState == "loading"){
                axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews`)
    
                .then((res)=>{
                    setReviews(res.data)
                    setState("success")
                }).catch((err)=>{
                    toast.error(err?.response?.data?.error||"An error occured")
                    setState("error")
                })
            }
        },[])

	return (
		<div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
            <div className="w-full md:w-[1200px] bg-secondary p-[20px]">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <h1 className="text-5xl font-extrabold text-accent mb-4">
                        Welcome to KV AUDIO
                    </h1>
                    <p className="text-lg text-gray-700 max-w-xl mx-auto">
                        Explore beautifully crafted items, handpicked for your lifestyle. Shop now and elevate your space with elegance.
                    </p>
                    <Link to="/items">
                        <button className="mt-6 px-6 py-3 bg-accent text-white text-lg font-semibold rounded-xl hover:bg-accent-dark transition-all duration-300 shadow-lg">
                            Shop Now
                        </button>
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl"
                >
                    <div className="p-6 bg-gray-50 rounded-xl shadow-md text-center hover:shadow-xl transition">
                        <h2 className="text-xl font-bold text-accent mb-2">New Arrivals</h2>
                        <p className="text-sm text-gray-600">Discover the freshest styles and trends in our latest collection.</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-xl shadow-md text-center hover:shadow-xl transition">
                        <h2 className="text-xl font-bold text-accent mb-2">Top Categories</h2>
                        <p className="text-sm text-gray-600">Browse curated categories that fit your lifestyle and needs.</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-xl shadow-md text-center hover:shadow-xl transition">
                        <h2 className="text-xl font-bold text-accent mb-2">Customer Favorites</h2>
                        <p className="text-sm text-gray-600">See what everyone’s loving — the most popular picks right now.</p>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mt-16 gap-8 w-full max-w-6xl"
                >
                <div className="w-full h-full flex flex-wrap justify-center  pt-[50px]">
                    {
                        state=="loading"&&
                        <div className="w-full h-full  flex justify-center items-center">
                        <div className="w-[50px] h-[50px] border-4 rounded-full border-t-green-500 animate-spin">
                        </div>
                        </div>
                    }
                    {
                        state=="success"&&
                        items.map((item)=>{
                        return(
                            <ProductCard key={item.key} item={item}/>
                        )
                        })
                    }
                </div>
                </motion.div>
            </div>
		</div>
        
	);
}
