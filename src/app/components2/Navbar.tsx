//https://github.com/Siumauricio/nextui-dashboard-template/blob/main/components/navbar/user-dropdown.tsx
import { Button, Input, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import React from "react";

import { useSidebarStore } from "@/app/stores/useSidebarStore";
import { useTheme } from "next-themes";
import { FaBars } from "react-icons/fa";
import { UserDropdown } from "./user-dropdown";
import { SearchIcon } from "./SearchIcon.jsx";
import logo from "@/app/components/assets/logo.jpg";
import { signIn, signOut } from "next-auth/react";


export const NavbarWrapper = () => {

  const { handleToggleSidebar } = useSidebarStore();
  const { theme } = useTheme();

  return (
    <div className="p-2" style={{ backgroundColor: theme === 'light' ? 'rgba(37, 47, 110, 1)' : 'rgba(10, 20, 38, 1)', zIndex: 1000, position: 'fixed', width: '100%', top: 0, left: 0, right: 0, margin: 0 }}>
      <Navbar
        isBordered
        role="navigation"
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarBrand>
          <div className="flex items-center">
            <div className="mr-3" id="navbar_logo" style={{ border: 0 }}>
              <Link href="/">
                <img className="rounded-full" width={32} src={logo.src} alt="logo" />
              </Link>
            </div>
            <h1 className="text-lg font-bold">ObservaTudo</h1>
          </div>
        </NavbarBrand>
        <NavbarContent>
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<SearchIcon size={18} width={undefined} height={undefined} />}
            type="search"
          />
        </NavbarContent>


        <NavbarContent justify="end">
          <NavbarItem>
            <UserDropdown />
          </NavbarItem>
          <NavbarItem>
            <button onClick={handleToggleSidebar} className={`text-${theme === 'light' ? 'black' : 'white'} text-2xl pl-5`}>
              <FaBars />
            </button>
          </NavbarItem>

        </NavbarContent>
      </Navbar>

    </div>
  );
};