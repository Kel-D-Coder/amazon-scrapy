import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">About Us</h2>
            <p className="text-sm">
              We are dedicated to helping you track the best deals and never miss a price drop. 
              Start tracking your favorite products with ease.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link to='/' className="hover:text-orange-500">
                  Home
                </Link>
              </li>
              <li>
                <Link to='/tracked-product' className="hover:text-orange-500">
                  Tracked products
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-orange-500">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-sm">
              Email: <Link to="mailto:okolokelvin02@gmail.com" className="hover:text-orange-500">support@example.com</Link>
            </p>
            <p className="text-sm mt-2">Phone: +1 (555) 123-4567</p>
            <div className="flex space-x-4 mt-4">
              <Link to="#" className="text-gray-400 hover:text-orange-500">
                <i className="fab fa-facebook"></i>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-orange-500">
                <i className="fab fa-twitter"></i>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-orange-500">
                <i className="fab fa-instagram"></i>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center border-t border-gray-700 pt-4">
          <p className="text-sm text-gray-500">
            © 2024 Your Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

