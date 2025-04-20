
import { useState } from "react";
import toast from "react-hot-toast";
import { CiLogout } from "react-icons/ci";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import MobileNavPanel from "./mobileNavPanel";

export default function Header() {
	const [navPanelOpen, setNavPanelOpen] = useState(false);
	const navigate = useNavigate();
	const [token, setToken] = useState(localStorage.getItem("token"));

	function handleLogOut() {
		localStorage.removeItem("token");
		setToken(null);
		toast.success("Logged out successfully");
		navigate("/login");
	}

	return (
		<header className="w-full h-[70px] shadow-xl flex justify-center relative items-center bg-accent text-white">
			<img
				src="/logo.png"
				alt="logo"
				className="w-[60px] h-[60px] object-cover border-[3px] absolute left-1 rounded-full"
			/>
			<div className="hidden w-[450px] md:flex justify-evenly items-center">
				<Link to="/" className="hidden md:block text-[22px] m-1">Home</Link>
				<Link to="/contact" className="hidden md:block text-[22px] m-1">Contact</Link>
				<Link to="/aboutus" className="hidden md:block text-[22px] m-1">About us</Link>
				<Link to="/items" className="hidden md:block text-[22px] m-1">Items</Link>

				<Link
					to="/booking"
					className="hidden md:block text-[22px] font-bold m-1 absolute right-24"
				>
					<FaCartShopping />
				</Link>

				{!token ? (
					<Link
						to="/login"
						className="hidden md:block text-[22px] font-bold m-1 absolute right-14"
					>
						<FaUser />
					</Link>
				) : (
					<button
						onClick={handleLogOut}
						className="hidden md:block text-[22px] font-bold m-1 absolute right-14"
					>
						<CiLogout />
					</button>
					
				)}
				</div>
			<GiHamburgerMenu
				className="absolute right-5 text-[24px] md:hidden"
				onClick={() => {
					setNavPanelOpen(true);
				}}
			/>

			<MobileNavPanel isOpen={navPanelOpen} setOpen={setNavPanelOpen} />
			
		</header>
	);
}
