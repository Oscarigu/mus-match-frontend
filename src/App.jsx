import { useState } from "react";
import { AuthProviderWrapper } from "./context/AuthContext";
import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import HomeComp from "./components/HomeComp";

function App() {
  const [count, setCount] = useState(0);
  return (
    <AuthProviderWrapper>
      <>
        <Navbar />
          <Routes>
            <Route path="/" element={<HomeComp/>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
          </Routes>
      </>
    </AuthProviderWrapper>
  );
}

export default App;
