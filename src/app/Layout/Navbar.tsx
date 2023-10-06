import React from "react";
import logo from "@/app/Layout/assets/logo.jpg";
import { FaBars } from "react-icons/fa";

interface Props {
  handleToggleSidebar: () => void;
}

const Navbar = ({ handleToggleSidebar }: Props) => {
  return (
    <nav className="bg-blue-800 p-2" role="navigation">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="mr-3" id="navbar_avatar" style={{ border: 0 }}>
            <img className="rounded-full" width={32} src={logo.src} alt="logo" />
          </div>
          <h1 className="text-white text-lg font-bold">ObservaTudo</h1>
        </div>
        <button onClick={() => handleToggleSidebar()} className="text-white text-2xl">
          <FaBars />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
