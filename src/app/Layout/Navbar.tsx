import React from "react";
import { FaBars } from "react-icons/fa";
import { signIn, signOut, useSession } from "next-auth/react";
import { useSidebarStore } from "@/app/stores/useSidebarStore";
import logo from "@/app/Layout/assets/logo.jpg";
import avatar from '@/app/Layout/assets/avatar.jpg';

const Navbar = () => {
  const { activePage, handleToggleSidebar, setToggled, toggled } = useSidebarStore();
  const { data: session } = useSession();
  return (
    <nav className="p-2" role="navigation"
    style={{
      backgroundColor: 'rgba(37, 47, 110, 1)',
      zIndex: '1000',
      position: 'fixed',
      width: '100%',
      top: 0,
      left: 0,
      right: 0,
      margin: 0,
      }}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="mr-3" id="navbar_logo" style={{ border: 0 }}>
            <img className="rounded-full" width={32} src={logo.src} alt="logo" />
          </div>
          <h1 className="text-white text-lg font-bold">ObservaTudo</h1>
        </div>
        <div className="ml-auto flex items-center">
          {session ? (
            <>
              <span className="mr-2 overflow-hidden overflow-ellipsis" style={{ maxWidth: '100px' }}>
                <button
                  className="border-2 border-blue-600 text-blue-600 rounded-md px-3 py-1 hover:bg-blue-600 hover:text-white transition-all"
                  onClick={() => signOut()}
                >
                  Sair
                </button>
              </span>
              <img
                src={session.user?.image ? session.user.image : avatar.src}
                style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                alt="user avatar"
              />
              {session.user?.name && session.user.name}
            </>
          ) : (
            <>
              <button
                className="border-2 border-blue-600 text-blue-600 rounded-md px-3 py-1 hover:bg-blue-600 hover:text-white transition-all"
                onClick={() => signIn()}
              >
                Entrar
              </button>
            </>
          )}
        </div>
        <button onClick={handleToggleSidebar} className="text-white text-2xl pl-5">
          <FaBars />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
