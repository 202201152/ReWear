import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserCircle, LogOut, User } from "lucide-react";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navItems = ["Home", "About", "Contact"];
  const [showMenu, setShowMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleAuthSuccess = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/checkAuth", {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const userData = await res.json();
      setUser(userData);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="bg-white shadow-md py-3 px-6 flex items-center justify-between">
      {/* ✅ Logo */}
      <Link to="/" className="flex items-center gap-2 cursor-pointer">
        <img src="/images/logo.png" alt="ReWear Logo" className="h-10 w-10 object-contain" />
        <h1 className="text-2xl font-bold text-green-700">ReWear</h1>
      </Link>

      {/* ✅ Nav Links */}
      <div className="hidden md:flex gap-6">
        {navItems.map((nav) => (
          <Link
            key={nav}
            to={nav === "Home" ? "/" : `/${nav.toLowerCase()}`}
            className="text-lg text-black hover:text-green-700 transition-all"
          >
            {nav}
          </Link>
        ))}
      </div>

      {/* ✅ Right Section */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            {/* ✅ Redeem Points */}
            <div className="hidden md:flex items-center border border-yellow-400 rounded-md px-4 py-1">
              <span className="text-yellow-500 font-semibold text-sm">
                🎁 Redeem Points: <span className="font-bold">{user.points || 50}</span>
              </span>
            </div>

            {/* ✅ Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <UserCircle
                size={32}
                className="cursor-pointer text-green-700 hover:text-green-900"
                onClick={() => setShowMenu(!showMenu)}
              />
              {showMenu && (
                <div className="absolute right-0 mt-2 bg-white border shadow-md rounded-lg w-40 z-50">
                  <button
                    className="w-full flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={handleProfileClick}
                  >
                    <User size={16} className="mr-2" />
                    Visit Profile
                  </button>
                  <button
                    className="w-full flex items-center px-4 py-2 text-sm hover:bg-gray-100 border-t"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* ✅ Login/Signup Buttons */}
            <button
              onClick={() => setShowLogin(true)}
              className="text-green-700 border border-green-700 px-4 py-1 rounded hover:bg-green-700 hover:text-white transition"
            >
              Login
            </button>
            <button
              onClick={() => setShowSignup(true)}
              className="bg-green-700 text-white px-4 py-1 rounded hover:bg-green-800 transition"
            >
              Sign Up
            </button>
          </>
        )}
      </div>

      {/* ✅ Modals */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLoginSuccess={handleAuthSuccess}
        />
      )}
      {showSignup && (
        <SignupModal
          onClose={() => setShowSignup(false)}
          onSignupSuccess={handleAuthSuccess}
        />
      )}
    </header>
  );
};

export default Navbar;
