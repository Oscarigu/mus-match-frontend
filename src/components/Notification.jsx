import React from "react";

export function Notification({ message, type = "info", onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        padding: "12px 20px",
        backgroundColor: type === "error" ? "#f44336" : "#4caf50",
        color: "#fff",
        borderRadius: 5,
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        zIndex: 1000,
        minWidth: 200,
      }}
    >
      {message}
      <button
        onClick={onClose}
        style={{
          marginLeft: 10,
          background: "transparent",
          border: "none",
          color: "#fff",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        ✖
      </button>
    </div>
  );
}
