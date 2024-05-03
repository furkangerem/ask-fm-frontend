import React, { useEffect, useState } from "react";

const Alert = ({ color, message, title }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed bottom-0 right-0 m-4 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-${color}-100 border border-${color}-400 text-${color}-700 px-4 py-3 rounded relative`}
        role="alert"
      >
        <strong className="font-bold">{title}</strong>
        <span className="block sm:inline">{message}</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg
            className={`fill-current h-6 w-6 text-${color}-500`}
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M6.83 6.75l-1.41 1.41L9.59 12l-4.17 4.17 1.41 1.41L11 13.41l4.17 4.17 1.41-1.41L12.41 12l4.17-4.17-1.41-1.41L11 10.59l-4.17-4.17z" />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default Alert;
