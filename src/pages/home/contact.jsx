import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Contact() {
    const [message, setMessage] = useState("");
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [phone, setPhone] = useState("");

    const [inquiries, setInquiries] = useState([]);

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            fetchInquiries();
        }
    }, []);

    const fetchInquiries = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/inquiries`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const userInquiries = response.data;
            setInquiries(userInquiries);

            const hasResolved = userInquiries.some(inquiry => inquiry.isResolved && !inquiry.resolutionNotified);
            if (hasResolved) {
                toast.success("Your inquiry is resolved");

                
            }
        } catch (err) {
            toast.error("Failed to fetch your inquiries");
            console.error(err);
        }
    }

    async function handleAddInquiry(e) {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("You must be logged in to send an inquiry");
            return;
        }

        try {
            const result = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/inquiries`,
                {
                    message,
                    date,
                    phone,
                },
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );

            toast.success("Inquiry sent!");
            setMessage("");
            setDate(new Date().toISOString().slice(0, 10));
            setPhone("");

        } catch (err) {
            console.error("Error response:", err.response?.data || err.message);
            toast.error(err.response?.data?.message || "Something went wrong");
        }
    }

    async function handleDeleteInquiry(id) {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/inquiries/${id}`, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });

            toast.success("Inquiry deleted");
            fetchInquiries();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete inquiry");
        }
    }


    return (
        <div className="flex-col m-[10px] md-hidden min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">
                <h2 className="text-2xl font-bold text-center text-accent mb-6">
                    Add your Inquiries
                </h2>
                <form className="space-y-[40px]" onSubmit={handleAddInquiry}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <input
                            type="text"
                            placeholder="Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                            required
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-accent text-white font-semibold py-2 px-4 rounded-lg hover:bg-accent-dark transition"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>

            {inquiries.length > 0 && (
                <div className="m-[10px] md:hidden w-full max-w-2xl ml-[20px] space-y-4">
                    <h3 className="text-xl font-bold text-center mb-4">Your Inquiries</h3>
                    {inquiries.map((inquiry) => (
                        <div
                            key={inquiry.id}
                            className="bg-white p-4 shadow-md rounded-lg relative"
                        >
                            <p><strong>Email:</strong> {inquiry.email}</p>
                            <p><strong>Message:</strong> {inquiry.message}</p>
                            <p><strong>Date:</strong> {inquiry.date}</p>
                            <p><strong>Phone:</strong> {inquiry.phone}</p>
                            <p className={`text-sm ${inquiry.isResolved ? "text-green-600" : "text-gray-500"}`}>
                                Status: {inquiry.isResolved ? "Resolved" : "Pending"}
                            </p>
                            <button
                                onClick={() => handleDeleteInquiry(inquiry.id)}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}
