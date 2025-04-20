import { CiHome, CiSpeaker, CiUser } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { MdPhotoLibrary, MdContacts, MdInfoOutline, MdLogin, MdLogout, MdComment, MdQuestionMark, MdHome } from "react-icons/md";
import { FaComment, FaProductHunt, FaRegCalendarCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AdminNavigation(props) {
	const isOpen = props.isOpen;
	const setOpen = props.setOpen;
	const navigate = useNavigate();
	const [token, setToken] = useState(localStorage.getItem("token"));

	function goTo(route) {
		navigate(route);
		setOpen(false);
	}

	return (
		<>
			{isOpen && (
				<div className="w-full h-screen bg-[#00000070] fixed top-0 left-0 z-50">
					<div className="h-full bg-white w-[300px] shadow-lg">
						<div className="bg-accent w-full h-[70px] flex relative justify-center items-center">
							<img
								src="/logo.png"
								alt="logo"
								className="w-[60px] h-[60px] object-cover border-[3px] absolute left-1 rounded-full"
							/>
							<IoMdClose
								className="absolute right-3 text-3xl cursor-pointer"
								onClick={() => {
									setOpen(false);
								}}
							/>
						</div>

						<div
							onClick={() => {
								goTo("/admin/orders");
							}}
							className="text-[20px] text-accent m-1 p-2 flex items-center gap-2 cursor-pointer hover:bg-accent/10 rounded-md"
						>
							<FaProductHunt className="text-2xl" />
							Orders
						</div>
                        <div
							onClick={() => {
								goTo("/admin/users");
							}}
							className="text-[20px] text-accent m-1 p-2 flex items-center gap-2 cursor-pointer hover:bg-accent/10 rounded-md"
						>
							<CiUser className="text-2xl" />
							Users
						</div>

						<div
							onClick={() => {
								goTo("/admin/items");
							}}
							className="text-[20px] text-accent m-1 p-2 flex items-center gap-2 cursor-pointer hover:bg-accent/10 rounded-md"
						>
							<MdPhotoLibrary className="text-2xl" />
							Items
						</div>                        

						<div
							onClick={() => {
								goTo("/admin/reviews");
							}}
							className="text-[20px] text-accent m-1 p-2 flex items-center gap-2 cursor-pointer hover:bg-accent/10 rounded-md"
						>
							<FaComment className="text-2xl" />
							Reviews
						</div>

						<div
							onClick={() => {
								goTo("/admin/inquiries");
							}}
							className="text-[20px] text-accent m-1 p-2 flex items-center gap-2 cursor-pointer hover:bg-accent/10 rounded-md"
						>
							<MdQuestionMark className="text-2xl" />
							Inquiries
						</div>

                        <div
							onClick={() => {
								goTo("/");
							}}
							className="text-[20px] text-accent m-1 p-2 flex items-center gap-2 cursor-pointer hover:bg-accent/10 rounded-md"
						>
							<MdHome className="text-2xl" />
							Home
						</div>
                        
					</div>
				</div>
			)}
		</>
	);
}
