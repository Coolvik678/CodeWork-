export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400 py-12 px-6 border-t border-gray-800">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

                <div className="md:col-span-1">
                    <h3 className="text-white text-xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent w-max">Nano Banana</h3>
                    <p className="text-sm">The future of freshness. Cold-pressed beverages crafted for the modern lifestyle.</p>
                </div>

                <div>
                    <h4 className="text-white font-medium mb-4">Shop</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white transition">All Products</a></li>
                        <li><a href="#" className="hover:text-white transition">Subscriptions</a></li>
                        <li><a href="#" className="hover:text-white transition">Gift Cards</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-medium mb-4">Support</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                        <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                        <li><a href="#" className="hover:text-white transition">Shipping & Returns</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-medium mb-4">Join the Club</h4>
                    <p className="text-sm mb-4">Sign up for early drops and exclusive offers.</p>
                    <div className="flex gap-2">
                        <input type="email" placeholder="Enter your email" className="bg-gray-800 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 w-full" />
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition">
                            Subscribe
                        </button>
                    </div>
                </div>

            </div>

            <div className="max-w-7xl mx-auto pt-8 border-t border-gray-800 text-sm text-center">
                <p>&copy; {new Date().getFullYear()} Nano Banana Inc. All rights reserved.</p>
            </div>
        </footer>
    );
}
