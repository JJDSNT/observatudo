import React from "react";
import { FaBars } from "react-icons/fa";

import { useSidebarStore } from "@/app/stores/useSidebarStore";
import logo from "@/app/components/assets/logo.jpg";
import SignInButton from "@/app/components/SignInButton";
import Link from "next/link";

const Navbar = () => {
  const { handleToggleSidebar } = useSidebarStore();


  return (
    <header>
      <nav className="p-2" role="navigation" style={{ backgroundColor: 'rgba(37, 47, 110, 1)', zIndex: 1000, position: 'fixed', width: '100%', top: 0, left: 0, right: 0, margin: 0 }}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-3" id="navbar_logo" style={{ border: 0 }}>
              <Link href="/">
                <img className="rounded-full" width={32} src={logo.src} alt="logo" />
              </Link>
            </div>
            <h1 className="text-white text-lg font-bold">ObservaTudo</h1>
          </div>
          <div className="ml-auto flex items-center">
            <SignInButton />
          </div>
          <button onClick={handleToggleSidebar} className="text-white text-2xl pl-5">
            <FaBars />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
