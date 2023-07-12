import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="px-5">
      <button onClick={toggleMenu} className="block text-white absolute top-6">
        {isOpen ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
      </button>

      <div
        className={
          isOpen
            ? "fixed right-0 top-0 w-[20%] h-full border-r text-black font-bold border-r-gray-900 bg-white ease-in-out duration-500"
            : "fixed left-[-100%]"
        }
      >
        <ul className="pt-24 uppercase p-4">
          <li className="p-4 border-b border-black">
            <Link to="/home">Home</Link>
          </li>
          <li className="p-4 border-b border-black">
            <Link to="/login">Login</Link>
          </li>
          {/*
          CHANGE THIS TO MY ACCOUNT PAGE CONDITIONALLY RENDERED IF LOGGED IN
          <li className="p-4 border-b border-black">
            <Link to="/restaurant">Mock</Link>
          </li>
      */}
          <li className="p-4 ">
            <Link to="/request">Request</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
