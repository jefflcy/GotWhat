import { useState } from "react";

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="pt-10 px-5">
      <button
        onClick={toggleMenu}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        &#9776; Menu
      </button>
      {isOpen && (
        <div>
          <a href="/home">Home</a>
          <br />
          <a href="/login">Login</a>
          <br />
          <a href="#">Request</a>
          <br />
        </div>
      )}
    </div>
  );
}
