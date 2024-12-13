export const Pricing = () => {
  return (
    <div className="min-h-screen text-white px-6 py-12 md:px-16 lg:px-32">
        <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-orange-400">
            Pricing Plans
            </h1>
            <p className="text-gray-300 mt-4 text-sm md:text-base lg:text-lg">
            Choose a plan that best fits your needs. Affordable and transparent
            pricing.
            </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-lg flex flex-col text-center">
                <h2 className="text-lg md:text-xl font-bold text-orange-400">
                    Basic
                </h2>
                <p className="text-3xl md:text-4xl font-bold mt-4">$20</p>
                <ul className="mt-6 text-gray-300 space-y-3 text-sm md:text-base">
                    <li> ✅ Monthly subscriptionn</li>
                    <li> ✅ Product tracking</li>
                    <li> ✅ Email notification</li>
                    <li> ❌ Use Your Own Payment Gateway</li>
                    <li> ❌ Basic Attendee Self-Service</li>
                </ul>
                <button className="mt-6 px-4 py-2 bg-orange-400 text-black rounded-lg hover:bg-orange-300 transition-all duration-300">
                    Get started
                </button>
            </div>

            {/* Pro Plan with Blur Effect */}
            <div className="relative bg-gray-800 p-6 rounded-lg shadow-md text-center">
            {/* Overlay for Blur Effect */}
            <div className="inset-0 blur-sm bg-gray-800 rounded-lg opacity-50">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-4">Pro</h2>
                        <p className="text-3xl font-bold text-orange-500 mb-4">$100</p>
                        <ul className="text-gray-300 mb-6 space-y-2">
                            <li>Monthly subscriptionn</li>
                            <li>Product tracking</li>
                            <li>Email notification</li>
                            <li>Checkout functionality</li>
                            <li>Advanced Attendee Self-Service</li>
                            <li>Discount Codes</li>
                        </ul>
                        <button className="mt-6 px-4 py-2 bg-orange-400 text-black rounded-lg hover:bg-orange-300 transition-all duration-300 w-11/12">
                            Get started
                        </button>
                    </div>
            </div>
                <div className="absolute inset-0 flex items-center justify-center rounded-lg">
                    <span className="text-white text-xl font-semibold">
                        Coming Soon
                    </span>
                </div>
            </div>

            {/* Pro Plan with Blur Effect */}
            <div className="relative bg-gray-800 p-6 rounded-lg shadow-md text-center">
            {/* Overlay for Blur Effect */}
            <div className="inset-0 blur-sm bg-gray-800 rounded-lg opacity-50">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-4">Lifetime</h2>
                        <p className="text-3xl font-bold text-orange-500 mb-4">$300</p>
                        <ul className="text-gray-300 mb-6 space-y-2">
                            <li>Monthly subscriptionn</li>
                            <li>Product tracking</li>
                            <li>Email notification</li>
                            <li>Checkout functionality</li>
                            <li>Lifetime ownership</li>
                            <li>Discount Codes</li>
                        </ul>
                        <button className="mt-6 px-4 py-2 bg-orange-400 text-black rounded-lg hover:bg-orange-300 transition-all duration-300 w-11/12">
                            Get started
                        </button>
                    </div>
            </div>
                <div className="absolute inset-0 flex items-center justify-center rounded-lg">
                    <span className="text-white text-xl font-semibold">
                        Coming Soon
                    </span>
                </div>
            </div>

           
        </div>
    </div>
  );
};
