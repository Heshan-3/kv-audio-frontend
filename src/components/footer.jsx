import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function Footer() {
	return (
		<footer className="bg-accent text-white py-10">
			<div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
				
				<div>
					<img src="/logo.png" alt="Logo" className="w-16 h-16 mb-4 rounded-full border-2 border-white" />
					<p className="text-sm text-gray-200">
						We offer handcrafted items to elevate your space. Quality and beauty combined.
					</p>
				</div>

				<div>
					<h2 className="text-lg font-semibold mb-4">Quick Links</h2>
					<ul className="space-y-2 text-sm text-gray-100">
						<li><a href="/" className="hover:text-white transition">Home</a></li>
						<li><a href="/items" className="hover:text-white transition">Shop</a></li>
						<li><a href="/aboutus" className="hover:text-white transition">About Us</a></li>
						<li><a href="/contact" className="hover:text-white transition">Contact</a></li>
					</ul>
				</div>

				<div>
					<h2 className="text-lg font-semibold mb-4">Connect With Us</h2>
					<p className="text-sm text-gray-200 mb-2">info@example.com</p>
					<div className="flex space-x-4 mt-4">
						<a href="#" className="hover:text-white text-gray-300"><FaFacebookF /></a>
						<a href="#" className="hover:text-white text-gray-300"><FaInstagram /></a>
						<a href="#" className="hover:text-white text-gray-300"><FaTwitter /></a>
						<a href="mailto:info@example.com" className="hover:text-white text-gray-300"><FaEnvelope /></a>
					</div>
				</div>
			</div>

			<div className="text-center text-sm text-gray-300 mt-10 border-t border-white/20 pt-4">
				© {new Date().getFullYear()} Your Brand Name. All rights reserved.
			</div>
		</footer>
	);
}
