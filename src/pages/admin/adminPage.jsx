import { BsGraphDown } from "react-icons/bs";
import { FaComment, FaRegBookmark, FaRegUser } from "react-icons/fa";
import { MdOutlineSpeaker } from "react-icons/md";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";
import AdminReviewApproval from "./approveReviwes";
import AdminInquiries from "./adminInquiries";
import { FaQuestion } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import AdminNavigation from "../../components/adminNavigation";
import AdminOrdersPage from "./adminOrders";
import AdminUsersPage from "./adminUsers";
import AdminItemsPage from "./adminItems";
import AddItemPage from "./addItems";
import UpdateItemPage from "./updateItems";

export default function AdminPage() {
	const [navPanelOpen, setNavPanelOpen] = useState(false);
	const [userValidated, setUserValidated] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			window.location.href = "/login";
		}
		axios
			.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				const user = res.data;
				if (user.role === "admin") {
					setUserValidated(true);
				} else {
					window.location.href = "/";
				}
			})
			.catch((err) => {
				console.log(err);
				setUserValidated(false);
			});
	}, []);

	return (
		<div className="w-full h-screen flex relative bg-white">

			<div className="hidden md:flex flex-col w-[200px] h-full fixed bg-accent z-10">
				<Link
					to="/admin"
					className="w-full h-[50px] text-[20px] font-bold flex items-center gap-2 px-4 text-secondary hover:bg-primary"
				>
					<BsGraphDown /> Dashboard
				</Link>
				<Link
					to="/admin/orders"
					className="w-full h-[50px] text-[20px] font-bold flex items-center gap-2 px-4 text-secondary hover:bg-primary"
				>
					<FaRegBookmark /> Orders
				</Link>
				<Link
					to="/admin/items"
					className="w-full h-[50px] text-[20px] font-bold flex items-center gap-2 px-4 text-secondary hover:bg-primary"
				>
					<MdOutlineSpeaker /> Items
				</Link>
				<Link
					to="/admin/users"
					className="w-full h-[50px] text-[20px] font-bold flex items-center gap-2 px-4 text-secondary hover:bg-primary"
				>
					<FaRegUser /> Users
				</Link>
				<Link
					to="/admin/reviews"
					className="w-full h-[50px] text-[20px] font-bold flex items-center gap-2 px-4 text-secondary hover:bg-primary"
				>
					<FaComment /> Reviews
				</Link>
				<Link
					to="/admin/inquiries"
					className="w-full h-[50px] text-[20px] font-bold flex items-center gap-2 px-4 text-secondary hover:bg-primary"
				>
					<FaQuestion /> Inquiries
				</Link>
			</div>


			<button
				className="md:hidden absolute top-4 left-4 z-20 text-[28px] text-black"
				onClick={() => setNavPanelOpen(true)}
			>
				<GiHamburgerMenu />
			</button>


			<AdminNavigation isOpen={navPanelOpen} setOpen={setNavPanelOpen} />

			<div className="w-full mt-[30px] md:ml-[200px] p-4">
				{userValidated && (
					<Routes>
						<Route path="/orders" element={<AdminOrdersPage />} />
						<Route path="/users" element={<AdminUsersPage />} />
						<Route path="/items" element={<AdminItemsPage />} />
						<Route path="/reviews" element={<AdminReviewApproval />} />
						<Route path="/inquiries" element={<AdminInquiries />} />
						<Route path="/items/add" element={<AddItemPage />} />
						<Route path="/items/edit" element={<UpdateItemPage />} />
					</Routes>
				)}
			</div>
		</div>
	);
}
