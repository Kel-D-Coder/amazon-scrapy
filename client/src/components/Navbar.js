import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { persistor } from "../store/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../utils/tokenUtils";
import axios from "axios";
import 'animate.css';


export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.currentUser);
  // const [isTokenStillValid, setIsTokenStillValid] = useState(true);
  const token = localStorage.getItem('token');
  
  const handleLogOut = () => {
    // clear redux state
    persistor.purge(); // clear persisted state
    window.location.reload();
    localStorage.removeItem('token');
  }
  
  const getPortal = async () => {
    try {
      const response = await axios('http://localhost:8000/api/v1/payment/customer/portal', {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = response.data;
      
      if (data.portalUrl) {
        window.location.href = data.portalUrl;
      }
    } catch(error) {
      console.log(error);
      navigate(error.response.data.loginUrl);
    }
  }
  
  useEffect(() => {
    
    function checkTokenValidity() {
      if (token) {
        if(!token || isTokenExpired(token)) {
          persistor.purge();
          localStorage.removeItem('token')
          window.location.reload()
        } 
      }
    }

    const interval = setInterval(checkTokenValidity, 10000);

    return () => clearInterval(interval)
    
  }, [token])

  return (
    <div className="relative bg-transparent border-b">
      {/* Navbar container */}
      <div className="flex justify-between items-center px-6 py-4 bg-gray-900 shadow-lg">
        {/* Brand */}
        <Link to="/" className="text-2xl font-bold text-orange-500">
          Amazon Scrapy
        </Link>

        {/* Hamburger Menu (Mobile View) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Links and Auth Buttons (Desktop View) */}
        <div className="hidden md:flex items-center gap-6 text-white">
          <Link to="/tracked-product" className="hover:text-orange-500">
            Tracked Products
          </Link>
          <button
            className="hover:text-orange-500"
            onClick={getPortal}
          >
            Portal
          </button>
          <Link to="/pricing" className="hover:text-orange-500">
            Pricing
          </Link>
          {
            user ? (
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg shadow-lg"
                onClick={handleLogOut}
              >
                Log Out
              </button>
            ) : (
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg shadow-lg"
                onClick={() => navigate('/sign-in')}
              >
                Log In
              </button>
            )
          }
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black flex flex-col items-center gap-5 py-5 text-white md:hidden z-50 shadow-md animate__animated animate__slideInDown">
          <Link
            to="/tracked-product"
            className="hover:text-orange-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Tracked Products
          </Link>
          <button
            className="hover:text-orange-500"
            onClick={() => {
              setIsMenuOpen(false);
              getPortal();
            }}
          >
            Portal
          </button>
          <Link
            to="/pricing"
            className="hover:text-orange-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </Link>
          {
            token ? (
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg shadow-lg"
                onClick={handleLogOut}
              >
                Log Out
              </button>
            ) : (
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg shadow-lg"
                onClick={() => navigate('/sign-in')}
              >
                Log In
              </button>
            )
          }
        </div>
      )}
    </div>
  );
};