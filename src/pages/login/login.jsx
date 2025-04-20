import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const googleLogin = useGoogleLogin({
        onSuccess : (res)=>{
            console.log(res)
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/google`,{
              accessToken : res.access_token
            }).then((res)=>{
              console.log(res)
              toast.success("Login Success")
              const user = res.data.user
              localStorage.setItem("token",res.data.token)

              if(user.role === "admin"){
                navigate("/admin/")
              }else{
                navigate("/")
              }
            }).catch((err)=>{
              console.log(err)
            })
          }
    })

    function handleOnSubmit(e) {
        e.preventDefault();
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        axios
            .post(`${backendUrl}/api/users/login`, {
                email,
                password,
            })
            .then((res) => {
                toast.success("Login Success");
                const user = res.data.user;
                localStorage.setItem("token", res.data.token);

                
                // if(user.emailVerified == false){
                //     navigate("/verify-email")
                //     return
                // }

                if (user.role === "admin") {
                    navigate("/admin/");
                } else {
                    navigate("/");
                }
            })
            .catch((err) => {
                console.error(err);
                toast.error(err.response?.data?.error || "Login failed");
            });
    }

    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-100">
            <div className="flex w-[400px] h-[400px] m-[10px] md:w-[800px] md:h-[500px] shadow-2xl rounded-2xl overflow-hidden">
                <div className="hidden md:flex w-1/2 bg-accent items-center justify-center text-white text-3xl font-bold">
                    Welcome Back!
                </div>
                
                <div className="w-full md:w-1/2 bg-secondary flex items-center justify-center">
                    <form
                        onSubmit={handleOnSubmit}
                        className="w-full max-w-[320px] flex flex-col"
                    >
                        <div className="md:hidden mt-[5px] mb-[30px] flex justify-center items-center text-2xl text-accent font-bold">Login</div>

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mb-4 p-3 rounded-md text-center text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mb-6 p-3 rounded-md text-center text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent"
                        />

                        <button
                            type="submit"
                            className="bg-accent text-white py-2 rounded-md hover:opacity-90 transition"
                        >
                            Sign In
                        </button>

                        <div className="mt-[30px] md:mt-[70px]  flex justify-center text-gray-400">or Login with</div>

                        <div className="mt-[10px] md:mt-[15px] flex justify-center text-gray-700 cursor-pointer" onClick={googleLogin}><FaGoogle className="m-1"></FaGoogle>Google</div>
                    </form>
                </div>
            </div>
        </div>
    );
}
