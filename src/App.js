import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import User from "./components/User/User";
import "./global.css";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import WelcomePage from "./components/Home/WelcomePage";
import LogoutPage from "./components/Home/LogoutPage";

function App() {
  const currentUser = localStorage.getItem("currentUser");

  return (
    <div className="bg-cream-color">
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={currentUser ? <Home /> : <Navigate to="/welcome" />}
          />
          <Route
            path="/home"
            element={currentUser ? <Home /> : <Navigate to="/welcome" />}
          />
          <Route
            path="/v1/users/:userId"
            element={currentUser ? <User /> : <Navigate to="/welcome" />}
          />
          <Route
            path="/login"
            element={currentUser ? <Navigate to="/home" /> : <Login />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
