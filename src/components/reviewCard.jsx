import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ReviewCard() {
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null); 

  useEffect(() => {
    fetchReviews();
    getUser(); 
  }, []);

  async function fetchReviews() {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews`, {
        headers: { Authorization: "Bearer " + token },
      });
      setReviews(res.data);
    } catch (err) {
      toast.error("Failed to load reviews");
    }
  }

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

  async function handleDelete(email) {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/${email}`, {
        headers: { Authorization: "Bearer " + token },
      });
      toast.success("Review deleted");
      fetchReviews(); 
    } catch (err) {
      toast.error(err.response?.data?.error || "Delete failed");
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">All Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews yet</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review, idx) => (
            <li key={idx} className="border rounded-lg p-4 shadow-sm relative">
              <div className="flex items-center gap-4 mb-2">
                <img src={review.profilePicture} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-sm text-gray-500">Rating: {review.rating}/5</p>
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>

              {(user?.role === "admin" || user?.email === review.email) && (
                <button
                  onClick={() => handleDelete(review.email)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
