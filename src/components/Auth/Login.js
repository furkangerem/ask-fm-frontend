import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PostWithoutAuth } from "../../services/HttpService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [redirectCount, setRedirectCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    let timeout;
    if (isSent) {
      timeout = setTimeout(() => {
        navigate("/home");
      }, 3000);
      window.location.reload();
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

  const handleLogin = () => {
    sendRequest("/auth/login");
  };

  const handleRegister = (e) => {
    navigate("/register");
  };

  const handlePassword = (value) => {
    setPassword(value);
    setIsSent(false);
  };

  const handleUsername = (value) => {
    setUsername(value);
    setIsSent(false);
  };

  const sendRequest = (path) => {
    PostWithoutAuth(path, {
      userName: username,
      password: password,
    })
      .then((res) => res.json())
      .then((result) => {
        setIsSent(true);
        localStorage.setItem("authToken", result.token);
        localStorage.setItem("currentUser", result.userName);
        localStorage.setItem("currentUserId", result.userId);
        localStorage.setItem("currentUserFirstName", result.firstName);
        localStorage.setItem("currentUserLastName", result.lastName);
      })
      .catch((err) => console.log("error"));
  };

  return (
    <div>
      {isSent && (
        <div className="fixed bottom-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md shadow-md opacity-100 transition-opacity duration-00">
          <p className="text-lg font-lato font-semibold">Success!</p>
          <p className="font-lato">Welcome back!</p>
          {redirectCount > 0 && (
            <p className="font-lato">{`You are gonna redirecting to homepage in ${redirectCount} seconds...`}</p>
          )}
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center bg-cream-color py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-extrabold font-lato text-dark-reddish-brown text-center mb-4">
            Login
          </h2>
          <div className="space-y-4">
            <div>
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
            </div>
            <div>
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
            </div>
            <div>
              <button
                className="w-full bg-dark-reddish-brown hover:bg-[#660000] text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
            <div className="text-sm text-center text-gray-600">
              Don't you have an account?
            </div>
            <div>
              <button
                className="w-full bg-dark-reddish-brown hover:bg-[#660000] text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleRegister}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
