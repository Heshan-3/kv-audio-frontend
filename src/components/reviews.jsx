import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Reviews() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  async function handleAddReview(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (token) {
      try {
        const result = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/reviews`,
          {
            rating: Number(rating),
            comment,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        toast.success("Wait, Admin must approve your request");
        setRating("");
        setComment("");
      } catch (err) {
        toast.error(err.response?.data?.error || "Something went wrong");
      }
    }
  }

  return (
    <div className=" mx-auto p-6 bg-white shadow-md rounded-2xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Give us your feedback</h2>
      <form onSubmit={handleAddReview} className="space-y-4">
       

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Rating (1-5)</label>
          <input
            type="number"
            min="1"
            max="5"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Comment</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}
