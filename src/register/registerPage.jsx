import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log({ firstName, lastName, email, password, address, phone });
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/`,{
        email : email,
        firstName : firstName,
        lastName : lastName,
        password : password,
        address : address,
        phone : phone
    } ).then(()=>{
        toast.success("Registration Success")
        navigate("/login")
    }).catch((err)=>{
        toast.error(err?.response?.data?.error||"An error occured")
    })
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
                <div className="flex w-[400px] h-[400px] m-[10px] md:w-[800px] md:h-[500px] shadow-2xl rounded-2xl overflow-hidden">
                    <div className="hidden w-1/2 bg-accent md:flex items-center justify-center text-white text-3xl font-bold">
                        Welcome to KV AUDIO!
                    </div>
                    
                    <div className="w-full md:w-1/2 bg-secondary flex items-center justify-center">
                        <form
                            onSubmit={handleOnSubmit}
                            className="w-full max-w-[320px] flex flex-col"
                        >
                            <div className="md:hidden mt-[5px] mb-[30px] flex justify-center items-center text-2xl text-accent font-bold">Sign Up</div>
    
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mb-4 p-3 rounded-md text-center text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent"
                            />

                            <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="mb-4 p-3 rounded-md text-center text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent"
                            />

                            <input
                                type="text"
                                placeholder="Lirst Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="mb-4 p-3 rounded-md text-center text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent"
                            />
    
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mb-6 p-3 rounded-md text-center text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent"
                            />

                            <input
                                type="text"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="mb-4 p-3 rounded-md text-center text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent"
                            />

                            <input
                                type="text"
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="mb-4 p-3 rounded-md text-center text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent"
                            />
    
                            <button
                                type="submit"
                                className="bg-accent text-white py-2 rounded-md hover:opacity-90 transition"
                            >
                                Sign Up
                            </button>
  
                        </form>
                    </div>
                </div>
            </div>
  );
}
