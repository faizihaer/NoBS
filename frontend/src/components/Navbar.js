import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css-stylings/Navbar.css";
import DarkMode from "./DarkMode";
import { AuthProvider, useAuth } from "../AuthService";
import Modal from "react-modal";
import ChatbotModal from "../pages/ChatbotModal";

const modalStyle = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
    zIndex: 9999 // higher z-index than other elements
  },
  content: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    minWidth: '600px',
    minHeight: '400px',
    maxWidth: '600px',
    maxHeight: '59vh', // Set maximum height to 80% of the viewport height
    overflow: 'auto',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
    padding: '20px',
    transform: 'translate(150%, 50%)', // Adjusted to move modal to bottom right corner
    zIndex: '9999', // high z-index to ensure it's on top of other elements
  },
};

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const { user, handleCallbackResponse, handleSignOut, isLoggedIn } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isVisible = prevScrollPos > currentScrollPos;

      setPrevScrollPos(currentScrollPos);
      setVisible(isVisible);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className={`navbar ${visible ? "" : "navbar-hidden"}`}>
      <nav className="navbar-container">
        <div className="left-section">
          <Link to="/" className="title">
            <img src="Nobswhite.png" alt="Logo" className="logo" />
          </Link>
        </div>
        <div className="right-section">
          <ul className="nav-links">
            {isLoggedIn && (
              <>
                <li>
                  <Link to="/Home" className="nav-link">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/Profile" className="nav-link">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/Group" className="nav-link">
                    Group
                  </Link>
                </li>
                <li>
                  <Link className="nav-link">
                    <button onClick={(e) => openModal()} className="logbtn">
                      Chatbot
                    </button>
                  </Link>
                </li>
              </>
            )}
            {isLoggedIn ? (
              <li>
                {/* Use onClick handler to sign out */}
                <Link to="/">
                  <button onClick={(e) => handleSignOut(e)} className="logbtn">
                    Sign Out
                  </button>
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/Auth">
                  <button className="logbtn">Sign In</button>
                </Link>
              </li>
            )}
            <li>
              <DarkMode />
            </li>
          </ul>
        </div>
      </nav>
      <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
       style={modalStyle}>
        <ChatbotModal />
        <div style={{ minWidth: "400px", minHeight: "300px" }}></div>
      </Modal>
    </div>
  );
};

export default Navbar;
