//https://www.linkedin.com/pulse/implement-dark-mode-tailwindcss-nextjs13-app-5-simple-lucas-los-arcos/
"use client"
import React, { ReactNode } from 'react';
import { useSidebarStore } from '@/app/stores/useSidebarStore';
import Navbar from './Navbar';
import Aside from './Aside';
import Footer from './Footer';
import { NavbarWrapper } from '../components2/Navbar';


type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { toggled, setToggled, handleBackdropClick, collapsed } = useSidebarStore();

  const sidebarWidth = toggled ? (collapsed ? 80 : 270) : 0;
  const navbarHeight = 60;
  const mainStyles = {
    marginLeft: toggled ? `${sidebarWidth}px` : '0',
    width: toggled ? `calc(100% - ${sidebarWidth}px)` : '100%',
    transition: 'transform 0.3s ease-in-out',
    paddingLeft: '15px',
    paddingRight: '15px'
  };


  return (
    <>
      <header>
        <NavbarWrapper />
      </header>
      <main className="container mx-auto mt-10" style={{ display: 'flex', marginTop: `${navbarHeight}px` }}>
        <Aside />
        <section style={mainStyles}>{children}</section>
      </main>
      <Footer />
    </>
  );
}

export default Layout;
