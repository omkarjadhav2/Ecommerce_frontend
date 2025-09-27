import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartItems, cartCount } = useContext(ShopContext);
  const { logoutUser, user, authTokens } = useContext(AuthContext);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    getCartItems(authTokens);
  }, [cartCount]);

  return (
    <div className="flex items-center justify-between font-medium mt-5 mb-5 sm:mb-3 sm:mt-2">
      <Link to="/">
        <img src={assets.logo1} alt="logo" className="w-30 sm:w-60" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700 my-4">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
        </NavLink>
      </ul>

      {user ? (
        <div className="hidden sm:flex gap-5 text-lg text-gray-700 items-top my-5">
          <p>Hello, {user.username}</p>
        </div>
      ) : (
        <div className="hidden sm:flex gap-5 text-sm text-gray-700 items-top mt-1">
          <NavLink to="/login">
            <button className="px-4 py-2 border border-amber-700 rounded-md hover:bg-black hover:text-white transition-all duration-300 ease-in-out">
              Login
            </button>
          </NavLink>
          <NavLink to="/register">
            <button className="px-4 py-2 border border-amber-700 rounded-md hover:bg-black hover:text-white transition-all duration-300 ease-in-out">
              Register
            </button>
          </NavLink>
        </div>
      )}

      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          alt="search_icon"
          className="w-5 cursor-pointer"
        />

        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="focus:outline-none"
          >
            <img
              className="w-5 cursor-pointer"
              src={assets.profile_icon}
              alt="profile_icon"
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-36 px-5 py-2 bg-slate-100 text-gray-500 rounded shadow-lg z-50">
              <Link to={"/profile"} onClick={() => setProfileOpen(false)}>
                <p className="cursor-pointer hover:text-black">My Profile</p>
              </Link>
              <Link to={"/orders"} onClick={() => setProfileOpen(false)}>
                <p className="cursor-pointer hover:text-black">Orders</p>
              </Link>
              <p
                onClick={() => {
                  logoutUser();
                  setProfileOpen(false);
                }}
                className="cursor-pointer hover:text-black"
              >
                LogOut
              </p>
            </div>
          )}
        </div>

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="cart_icon" className="w-5 min-w-5" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[10px]">
            {cartCount}
          </p>
        </Link>

        <img
          onClick={() => {
            setVisible(true);
          }}
          src={assets.menu_icon}
          alt="menu_icon"
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>

      {visible && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setVisible(false)}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full bg-white transition-all duration-300 z-50 ${
          visible ? "w-3/4 sm:w-1/2" : "w-0"
        } overflow-hidden`}
      >
        <div className="flex flex-col text-gray-600 h-full">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img
              className="h-4 rotate-180"
              src={assets.dropdown_icon}
              alt="dropdown_icon"
            />
            <p>Back</p>
          </div>

          {user ? (
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border"
              to="/profile"
            >
              Hello, {user?.username}
            </NavLink>
          ) : (
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border text-emerald-600"
              to="/login"
            >
              Login here!!
            </NavLink>
            
          )}

          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
