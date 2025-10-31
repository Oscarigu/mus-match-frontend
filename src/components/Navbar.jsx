import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="mm-navbar">
  {/* Burger Button */}
  <button className="mm-burger" onClick={handleToggle} aria-label="Abrir menú">
    <span className="bar" />
    <span className="bar" />
    <span className="bar" />
  </button>

  {/* Logo */}
  <Link to="/" className="mm-logo-link">
    <div className="mm-logo">
      <img src="https://i.imgur.com/XGgSGAt.png" alt="Mus Match" />
    </div>
  </Link>

  {/* Right section */}
  <div className="mm-right">
    {isLoggedIn && user ? (
      <div className="flex items-center gap-4">
        <span className="mm-username">Hola, {user.name}</span>
        <button className="mm-login" onClick={logOutUser}>
          Logout
        </button>
      </div>
    ) : (
      <Link to="/login">
        <button className="mm-login">Iniciar sesión</button>
      </Link>
    )}
  </div>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "64px",
            left: 0,
            width: "100%",
            background: "#111827",
            display: "flex",
            flexDirection: "column",
            padding: "1rem 0",
            zIndex: 999,
          }}
        >
          <Link
            to="/tournaments"
            style={{
              color: "#fff",
              padding: "0.5rem 1rem",
              textDecoration: "none",
            }}
            onClick={() => setMenuOpen(false)}
          >
            Torneos*
          </Link>
          <Link
            to="/games"
            style={{
              color: "#fff",
              padding: "0.5rem 1rem",
              textDecoration: "none",
            }}
            onClick={() => setMenuOpen(false)}
          >
            Partidas
          </Link>
          <Link
            to="/profile"
            style={{
              color: "#fff",
              padding: "0.5rem 1rem",
              textDecoration: "none",
            }}
            onClick={() => setMenuOpen(false)}
          >
            Perfil*
          </Link>
        </div>
      )}
    </nav>
  );
}
