import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-dark-reddish-brown">
          Bye there, partner!
        </h1>
        <p className="text-gray-600">You've been logged out. Come back soon!</p>
        <button
          className="mt-8 py-2 px-4 bg-dark-reddish-brown text-white rounded shadow"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LogoutPage;
