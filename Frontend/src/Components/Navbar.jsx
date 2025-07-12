import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserCircle, LogOut, User } from "lucide-react";

const Navbar = () => {
  const navItems = ["Home", "About", "Contact"];
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/profile");
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
      {/* ✅ Clickable Logo */}
      <Link to="/" className="flex items-center gap-2 cursor-pointer">
        <img src="/images/logo.png" alt="ReWear Logo" className="h-10 w-10 object-contain" />
        <h1 className="text-2xl font-bold text-green-700">ReWear</h1>
      </Link>

      {/* Navigation Items */}
<div className="hidden md:flex gap-6">
  {navItems.map((nav) => (
    <Link
      key={nav}
      to={nav === "Home" ? "/" : `/${nav.toLowerCase()}`} // Links to '/' for Home, '/about', '/contact'
      className="text-lg text-black hover:text-green-700 transition-all"
    >
      {nav}
    </Link>
  ))}
</div>


      {/* Profile Section including Redeem Points */}
      <div className="flex items-center gap-4">
        {/* ✅ Redeem Points Box */}
        <div className="hidden md:flex items-center border border-yellow-400 rounded-md px-4 py-1">
          <span className="text-yellow-500 font-semibold text-sm">
            🎁 Redeem Points: <span className="font-bold">50</span>
          </span>
        </div>

        {/* Profile Menu */}
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
      </div>
    </header>
  );
};

export default Navbar;
