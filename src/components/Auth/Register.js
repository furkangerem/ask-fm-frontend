import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [redirectCount, setRedirectCount] = useState(3); // Yönlendirme gerçekleşene kadar geçecek süre
  const navigate = useNavigate();

  useEffect(() => {
    let timeout;
    if (isSent) {
      timeout = setTimeout(() => {
        navigate("/home");
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [isSent, navigate]);

  useEffect(() => {
    let interval;
    if (isSent && redirectCount > 0) {
      interval = setInterval(() => {
        setRedirectCount((prevCount) => prevCount - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSent, redirectCount]);

  const handleRegister = (e) => {
    sendRequest("/auth/register");
  };

  const handlePassword = (value) => {
    setPassword(value);
    setIsSent(false);
  };

  const handleUsername = (value) => {
    setUsername(value);
    setIsSent(false);
  };

  const handleFirstName = (value) => {
    setFirstName(value);
    setIsSent(false);
  };

  const handleLastName = (value) => {
    setLastName(value);
    setIsSent(false);
  };

  const sendRequest = (path) => {
    fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        role: "USER",
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setIsSent(true);
      })
      .catch((err) => console.log("error"));
  };

  return (
    <div>
      {isSent && (
        <div className="fixed bottom-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md shadow-md opacity-100 transition-opacity duration-00">
          <p className="text-lg font-lato font-semibold">Success!</p>
          <p className="font-lato">Welcome aboard!</p>
          {redirectCount > 0 && (
            <p className="font-lato">{`Redirecting to homepage in ${redirectCount} seconds...`}</p>
          )}
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center bg-cream-color py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-extrabold font-lato text-dark-reddish-brown text-center mb-4">
            Register
          </h2>
          <div className="space-y-3">
            <label htmlFor="firstName" className="sr-only">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="firstName"
              autoComplete="current-firstName"
              required
              placeholder="First Name"
              value={firstName}
              onChange={(i) => handleFirstName(i.target.value)}
              className="appearance-none rounded-md w-full py-2 px-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-first-blue focus:border-first-blue sm:text-sm"
            />
            <label htmlFor="lastName" className="sr-only">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="lastName"
              autoComplete="current-lastName"
              required
              placeholder="Last Name"
              value={lastName}
              onChange={(i) => handleLastName(i.target.value)}
              className="appearance-none rounded-md w-full py-2 px-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-first-blue focus:border-first-blue sm:text-sm"
            />
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              placeholder="Username"
              value={username}
              onChange={(i) => handleUsername(i.target.value)}
              className="appearance-none rounded-md w-full py-2 px-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-first-blue focus:border-first-blue sm:text-sm"
            />
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Password"
              value={password}
              onChange={(i) => handlePassword(i.target.value)}
              className="appearance-none rounded-md w-full py-2 px-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-first-blue focus:border-first-blue sm:text-sm"
            />
            <button
              type="button"
              onClick={handleRegister}
              className="w-full bg-dark-reddish-brown hover:bg-[#660000] text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Join!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
