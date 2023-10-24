//https://github.com/Siumauricio/nextui-dashboard-template/blob/main/components/navbar/user-dropdown.tsx
import { Avatar, Button, Input, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import React from "react";

import { useSidebarStore } from "@/app/stores/useSidebarStore";
import { useTheme } from "next-themes";
import { FaBars } from "react-icons/fa";
import { UserDropdown } from "./user-dropdown";
import { SidebarSwitch } from "./sidebar-switch"
import logo from "@/app/components/assets/logo.jpg";



export const NavbarWrapper = () => {

  const { handleToggleSidebar } = useSidebarStore();
  const { theme } = useTheme();

  return (
    <div className="p-0" style={{ zIndex: 1000, position: 'fixed', width: '100%', top: 0, left: 0, right: 0, margin: 0 }}>
      <Navbar
        role="navigation"
        className="w-full dark:bg-indigo-900 bg-indigo-50"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarBrand>
          <div className="flex items-center">
            <div className="mr-3" id="navbar_logo" style={{ border: 0 }}>
              <Link href="/">
                <Avatar
                  as="button"
                  color="secondary"
                  size="md"
                  src={logo.src}
                />
              </Link>
            </div>
            <h1 className="text-lg font-bold dark:text-white">ObservaTudo</h1>
          </div>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <SidebarSwitch />
          </NavbarItem>
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