// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register";
import Navbar from "./components/Navbar.jsx";
import ProfilePage from "./pages/Profile/ProfilePage.jsx";
import ProfileDetails from "./pages/Profile/Profiledetails.jsx";

function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route 
          path="/" 
          element={
              <Home /> 
          } 
        />
        <Route 
          path="/profiles" 
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          } 
        />
        <Route path = "/profiles/:id" element = {<ProfileDetails/>} />
      </Routes>
    </Router>
  );
}

export default App;
