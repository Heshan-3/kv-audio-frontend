import { useEffect, useState } from "react";
import { formatDate, loadCart } from "../../utils/cart";
import axios from "axios";
import toast from "react-hot-toast";
import BookingItems from "../../components/bookingItems";

export default function BookingPage() {
    const [cart, setCart] = useState(loadCart());
    const [startingDate, setStartingDate] = useState(formatDate(new Date()));
    const [endingDate, setEndingDate] = useState(formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000)));
    const [total, setTotal] = useState(0);
    const daysBetween = Math.max((new Date(endingDate) - new Date(startingDate)) / (1000 * 60 * 60 * 24), 1);

    function reloadCart() {
        setCart(loadCart());
        calculateTotal();
    }

    function calculateTotal() {
        const cartInfo = loadCart();
        cartInfo.startingDate = startingDate;
        cartInfo.endingDate = endingDate;
        cartInfo.days = daysBetween;

        axios
            .post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/quote`, cartInfo)
            .then((res) => {
                setTotal(res.data.total);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    useEffect(() => {
        calculateTotal();
    }, [startingDate, endingDate]);

    function handleBookingCreation() {
        const cart = loadCart();
        cart.startingDate = startingDate;
        cart.endingDate = endingDate;
        cart.days = daysBetween;

        const token = localStorage.getItem("token");

        axios
            .post(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, cart, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                toast.success("Booking Created");
                localStorage.removeItem("cart");
                setCart(loadCart());
            })
            .catch((err) => {
                console.error(err);
                toast.error("Failed to create booking");
            });
    }

    return (
        <div className="w-full flex justify-center px-4 py-8">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border-t-1 border-gray-200 p-8 mt-28 mb-16">
                <h1 className="text-3xl font-bold text-accent text-center mb-6">Create Booking</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-accent font-semibold mb-2">Starting Date</label>
                        <input
                            type="date"
                            value={startingDate}
                            onChange={(e) => setStartingDate(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                    </div>
                    <div>
                        <label className="block text-accent font-semibold mb-2">Ending Date</label>
                        <input
                            type="date"
                            value={endingDate}
                            onChange={(e) => setEndingDate(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                    </div>
                </div>

                <div className="text-center text-accent font-medium mb-6">
                    Total Days: <span className="font-semibold">{daysBetween}</span>
                </div>

                <div className="space-y-4 mb-6">
                    {cart.orderedItems.map((item) => (
                        <BookingItems itemKey={item.key} key={item.key} qty={item.qty} refresh={reloadCart} />
                    ))}
                </div>

                <div className="flex justify-between items-center mt-6 border-t pt-4">
                    <p className="text-xl font-semibold text-accent">Total: LKR{total.toFixed(2)}</p>
                    <button
                        onClick={handleBookingCreation}
                        className="bg-accent text-white px-6 py-2 rounded-md hover:opacity-90 transition"
                    >
                        Create Booking
                    </button>
                </div>
            </div>
        </div>
    );
}
