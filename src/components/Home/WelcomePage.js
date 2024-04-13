import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleDiveInClick = () => {
    navigate("/register");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-cream-color">
      <div className="flex items-center mb-8">
        <h1 className="text-5xl font-bold font-lato text-dark-reddish-brown mr-2">
          Welcome to
        </h1>
        <h1 className="text-5xl font-bold font-lato text-navbar-item-color">
          Ask.FM!
        </h1>
      </div>
      <p className="text-lg font-lato text-dark-reddish-brown mb-8">
        Are you ready for asking questions?
      </p>
      <button
        className="bg-dark-reddish-brown text-white font-bold font-lato py-2 px-4 rounded hover:bg-navbar-item-color transition duration-300 ease-in-out"
        onClick={handleDiveInClick}
      >
        Dive in!
      </button>
    </div>
  );
};

export default WelcomePage;
