import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AdminReviewApproval(){
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setReviews(response.data);
        } catch (error) {
            console.error("Error fetching reviews", error);
        }
    };

    const approveReview = async (email) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/reviews/approve/${email}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            fetchReviews();
            toast.success(response.data.message);
        } catch (error) {
            console.error("Error approving review", error);
            toast.error("Failed to approve review");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Review Approval Panel</h1>
            <div className="space-y-6">
                {reviews.length === 0 ? (
                    <p>No reviews to approve</p>
                ) : (
                    reviews.map((review) => (
                        <div key={`${review.email}-${review.name}`}
                            className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between"
                        >
                            <div className="space-y-2">
                                <h3 className="font-semibold text-lg">{review.name}</h3>
                                <p>Email: {review.email}</p>
                                <p>Rating: {review.rating}</p>
                                <p className="italic">"{review.Comment}"</p>
                                <p className="text-gray-500 text-sm">
                                    {review.isApproved ? "Approved" : "Not Approved"}
                                </p>
                            </div>
                            {!review.isApproved && (
                                <button
                                    onClick={() => approveReview(review.email)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    Approve
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};


