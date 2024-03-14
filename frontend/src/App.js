import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

// pages & components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Group from "./pages/Group";
import Profile from "./pages/Profile";
import { AuthProvider } from "./AuthService";

function App() {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route path="/" element={<About />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/Auth/*" element={<Auth />} />
              <Route path="/Group" element={<Group />} />
              <Route path="/Profile" element={<Profile />} />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
