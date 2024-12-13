import { Link } from "react-router-dom";
import { useState } from "react";
import { clearUser } from "../store/userSlice";
import { persistor } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.currentUser);

  console.log(user)

  const handleLogOut = () => {
    // clear redux state
    persistor.purge(); // clear persisted state
  }

  return (
    <div className="relative bg-transparent border-b">
      {/* Navbar container */}
      <div className="flex justify-between items-center p-5">
        {/* Brand */}
        <Link to="/" className="text-orange-400 text-2xl underline">
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
        <div className="hidden md:flex items-center gap-5 text-white">
          <Link to="/tracked-product" className="hover:text-orange-300">
            Tracked Products
          </Link>
          <Link to="/portal" className="hover:text-orange-300">
            Portal
          </Link>
          <Link to="/pricing" className="hover:text-orange-300">
            Pricing
          </Link>
          {
            user ?
              <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg shadow-lg" onClick={handleLogOut}>LogOut</button>
            : <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg shadow-lg" onClick={() => navigate("/sign-in")}>LogIn</button>
          }
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black flex flex-col items-center gap-5 py-5 text-white md:hidden z-50 shadow-md">
          <Link
            to="/tracked-product"
            className="hover:text-orange-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Tracked Products
          </Link>
          <Link
            to="/portal"
            className="hover:text-orange-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Portal
          </Link>
          <Link
            to="/pricing"
            className="hover:text-orange-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </Link>
          {
            user ?
              <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg shadow-lg" onClick={handleLogOut}>LogOut</button>
            : <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg shadow-lg" onClick={() => navigate('/sign-in')}>LogIn</button>
          }
        </div>
      )}
    </div>
  );
};

export default Navbar;