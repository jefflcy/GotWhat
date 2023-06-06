import React, { useState } from "react";

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`side-menu ${isOpen ? "open" : ""}`}>
      <button onClick={toggleMenu} className="menu-toggle">
        &#9776; Menu
      </button>
      {isOpen && (
        <div>
          <a href="#">Home</a>
          <br />
          <a href="#">Register/Login</a>
          <br />
          <a href="#">Request</a>
          <br />
        </div>
      )}
    </div>
  );
}
