import React from 'react';

export const TrackedProduct = () => {
  return (
    <div className="min-h-screen  text-white py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Tracked Products</h1>
        <p className="text-gray-300 mt-2">
          View and manage the products you're tracking.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        <ul className="space-y-4">
          {/* Dummy Product 1 */}
          <li className="flex flex-col sm:flex-row items-center justify-between bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQNPNdJoi0IIud3G_8po2eu1SFxPfPmCVwxw&s"
                alt="Amazon Echo Dot (4th Gen)"
                className="w-16 h-16 object-cover rounded-lg shadow-md"
              />
              <div>
                <h2 className="text-lg font-semibold">Amazon Echo Dot (4th Gen)</h2>
                <p className="text-sm text-gray-400">
                  Current Price: <span className="text-orange-500 font-bold">$49.99</span>
                </p>
              </div>
            </div>
            <button className="mt-4 sm:mt-0 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg shadow-lg">
              Untrack
            </button>
          </li>

          {/* Dummy Product 2 */}
          <li className="flex flex-col sm:flex-row items-center justify-between bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
              <img
                src="https://www.apple.com/newsroom/images/product/airpods/standard/Apple-AirPods-Pro-2nd-gen-hero-220907.jpg.og.jpg?202410301808"
                alt="Amazon Echo Dot (4th Gen)"
                className="w-16 h-16 object-cover rounded-lg shadow-md"
              />
              <div>
                <h2 className="text-lg font-semibold">Apple AirPods Pro</h2>
                <p className="text-sm text-gray-400">
                  Current Price: <span className="text-orange-500 font-bold">$49.99</span>
                </p>
              </div>
            </div>
            <button className="mt-4 sm:mt-0 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg shadow-lg">
              Untrack
            </button>
          </li>
          
          {/* Dummy Product 3 */}
          <li className="flex flex-col sm:flex-row items-center justify-between bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
              <img
                src="https://slot.ng/media/catalog/product/cache/68bbe6a30464c40a236033bd86dd13a8/3/0/301.0.png"
                alt="Samsung Galaxy Watch"
                className="w-16 h-16 object-cover rounded-lg shadow-md"
              />
              <div>
                <h2 className="text-lg font-semibold">Samsung Galaxy Watch</h2>
                <p className="text-sm text-gray-400">
                  Current Price: <span className="text-orange-500 font-bold">$299.99</span>
                </p>
              </div>
            </div>
            <button className="mt-4 sm:mt-0 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg shadow-lg">
              Untrack
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

