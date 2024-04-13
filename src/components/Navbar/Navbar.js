import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Logo from "../../images/pngegg.png";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const currentUser = localStorage.getItem("currentUser");

  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentUserId");
    window.location.reload();
  };

  return (
    <div className="sticky top-0 z-50 bg-dark-reddish-brown">
      <div className="flex justify-between items-center h-16 w-screen mx-auto px-8 text-white font-lato">
        <a href="/home">
          <img src={Logo} alt="Ask.FM Logo" />
        </a>
        <ul className="hidden md:flex">
          <a href="/home">
            <li className="p-4 font-bold font-lato">Home</li>
          </a>
          {currentUser && (
            <a href={"/v1/users/" + localStorage.getItem("currentUserId")}>
              <li className="p-4 font-bold font-lato">Profile</li>
            </a>
          )}
          {currentUser ? (
            <a href="/logout">
              <li
                onClick={handleLogout}
                className="p-4 font-bold font-lato flex items-center"
              >
                Logout
              </li>
            </a>
          ) : (
            <a href="/login">
              <li className="p-4 font-bold font-lato flex items-center">
                Login
              </li>
            </a>
          )}
        </ul>
        <div onClick={handleNav} className="block md:hidden">
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        <ul
          className={
            nav
              ? "fixed left-0 top-16 md:top-0 w-[60%] h-full border-r border-r-gray-900 bg-taupe-color ease-in-out duration-500"
              : "ease-in-out duration-500 fixed left-[-100%]"
          }
        >
          <img src={Logo} alt="Ask.FM Logo" />
          <a href="/home">
            <li className="p-4 font-bold font-lato">Home</li>
          </a>
          {currentUser && (
            <a href={"/v1/users/" + localStorage.getItem("currentUserId")}>
              <li className="p-4 font-bold font-lato">Profile</li>
            </a>
          )}
          {currentUser ? (
            <a href="/logout">
              <li
                onClick={handleLogout}
                className="p-4 font-bold font-lato flex items-center"
              >
                Logout
              </li>
            </a>
          ) : (
            <a href="/login">
              <li className="p-4 font-bold font-lato flex items-center">
                Login
              </li>
            </a>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
