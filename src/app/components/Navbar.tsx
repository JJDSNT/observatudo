import React from "react";
import { FaBars } from "react-icons/fa";
import { useTheme } from 'next-themes';
import { useSidebarStore } from "@/app/stores/useSidebarStore";
import logo from "@/app/components/assets/logo.jpg";
import SignInButton from "@/app/components/SignInButton";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { handleToggleSidebar } = useSidebarStore();
  const { theme } = useTheme();
  const { data: session } = useSession();
  //old backgroundColor: theme === 'light' ? 'rgba(37, 47, 110, 1)' : 'rgba(10, 20, 38, 1)'
//old sidebar rgba(30, 64, 175, 0.5)
  return (
    <header>
      
      <nav className="p-2 dark:bg-indigo-900 bg-indigo-700" role="navigation" style={{ zIndex: 1000, position: 'fixed', width: '100%', top: 0, left: 0, right: 0, margin: 0 }}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-3" id="navbar_logo" style={{ border: 0 }}>
              <Link href="/">
                <img className="rounded-full" width={32} src={logo.src} alt="logo" />
              </Link>
            </div>
            <h1 className=" text-lg font-bold dark:text-white">ObservaTudo</h1>
          </div>
          <div className="ml-auto flex items-center">
            <SignInButton />
          </div>
          <div>
          <button onClick={() => signIn()}>
            aqui é o novo login
          </button>
          <button onClick={() => signOut()}>
            aqui é o novo logout
          </button>
          </div>
          <button onClick={handleToggleSidebar} className={`text-${theme === 'light' ? 'black' : 'white'} text-2xl pl-5`}>
            <FaBars />
          </button>
        </div>
      </nav>
    </header>
  );

};

export default Navbar;
