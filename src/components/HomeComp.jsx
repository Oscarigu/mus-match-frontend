import React from "react";
import { Link } from "react-router-dom";

function HomeComp() {
  return (
    <div className="hc-contenedor">
      <Link style={{ textDecoration: "none", display: "contents" }}>
      <div
        className="hc-item tournaments"
      >
        Torneos
      </div>
      </Link>
      <Link to="/games" style={{ textDecoration: "none", display: "contents" }}>
      <div
        className="hc-item games"
      >
        Partidas
      </div>
      </Link>
    </div>
  );
}
export default HomeComp;
 