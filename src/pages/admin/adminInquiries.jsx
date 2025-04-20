import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AdminInquiries(){
    const [inquiries, setInquiries] = useState([]);
    const [user, setUser] = useState(null)

    useEffect(() => {
        fetchInquiries();
        getUser()
    }, []);

    const fetchInquiries = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/inquiries`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setInquiries(response.data);
        } catch (error) {
            console.error("Error fetching Inquiries", error);
        }
    };

    const resolveInquiry = async (id) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/inquiries/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            fetchInquiries();
            toast.success(response.data.message);
        } catch (error) {
            console.error("Error approving review", error);
            toast.error("Failed to approve review");
        }
    };

    async function getUser() {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
            headers: { Authorization: "Bearer " + token },
          });
          setUser(res.data);
        } catch {
          toast.error("Failed to get user data");
        }
      }

    async function handleDelete(id) {
        try {
          const token = localStorage.getItem("token");
          await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/inquiries/${id}`, {
            headers: { Authorization: "Bearer " + token },
          });
          toast.success("Review deleted");
          fetchInquiries(); 
        } catch (err) {
          toast.error(err.response?.data?.error || "Delete failed");
        }
      }

    return (
        <div className="top-[30px] container md:mx-auto p-4">
            <h1 className="hidden text-3xl font-bold mt-[50px]">Inquiry Resolve Panel</h1>
            <h1 className="md:hidden text-3xl font-bold mb-6">Inquiries</h1>
            <div className="space-y-6">
                {inquiries.length === 0 ? (
                    <p>No inquiries to Resolve</p>
                ) : (
                    inquiries.map((inquiry) => (
                        <div key={`${inquiry.id}`}
                            className="bg-white p-6 rounded-lg shadow-md flex md:items-center md:justify-between"
                        >
                            <div className="space-y-2">
                                <h3 className="font-semibold text-lg">{inquiry.id}</h3>
                                <p>Email: {inquiry.email}</p>
                                <p>Phone: {inquiry.phone}</p>
                                <p>Date: {inquiry.date}</p>
                                <p className="italic">"{inquiry.message}"</p>
                                <p className="text-gray-500 text-sm">
                                    {inquiry.isResolved ? "Resolved" : "Not Resolved"}
                                </p>
                            </div>
                            {!inquiry.isResolved && (
                                <button
                                    onClick={() => resolveInquiry(inquiry.id)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    Resolve
                                </button>
                            )}
                            {(user?.role === "admin") && (
                                <button
                                onClick={() => handleDelete(inquiry.id)}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                >
                                Delete
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};


