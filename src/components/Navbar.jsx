import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ user, onLogin, onToggle }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
    if (onToggle) onToggle();
  };

  return (
    <nav className="mm-navbar">
      {/* Burger Button */}
      <button
        className="mm-burger"
        onClick={handleToggle}
        aria-label="Abrir menú"
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>

      {/* Logo */}
      <div className="mm-logo">
        <img src="https://i.imgur.com/XGgSGAt.png" alt="Mus Match" />
      </div>

      {/* Right section */}
      <div className="mm-right">
        {user && user.name ? (
          <span className="mm-username">Hola, {user.name}</span>
        ) : (
          <Link to="/login">
            <button className="mm-login" onClick={onLogin}>
              Iniciar sesión
            </button>
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
            Tournaments
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
            Games
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
              Profile
            </Link>
        </div>
      )}
    </nav>
  );
}
