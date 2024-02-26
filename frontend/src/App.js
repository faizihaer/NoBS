import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

// pages & components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Auth from "./pages/Auth";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Auth" element={<Auth />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
