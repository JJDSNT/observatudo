"use client"
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Aside from './Aside';
import Footer from './Footer';

import { useSidebarStore } from '@/app/stores/useSidebarStore';

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
    <div>
      <Navbar />
      <main className="container mx-auto mt-10" style={{ display: 'flex', marginTop: `${navbarHeight}px`  }}>
        <Aside />
        <section style={mainStyles}>{children}</section> 
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
