//https://www.linkedin.com/pulse/implement-dark-mode-tailwindcss-nextjs13-app-5-simple-lucas-los-arcos/
"use client"
import React, { ReactNode } from 'react';
import { BreakPoint, useSidebarStore } from '@/app/stores/useSidebarStore';
import Navbar from './Navbar';
import Aside from './Aside';
import Footer from './Footer';
import { NavbarWrapper } from '../components2/Navbar';


type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { toggled, setToggled, handleBackdropClick, collapsed, breakPoint } = useSidebarStore();

  const sidebarWidth = toggled ? (collapsed ? 80 : 250) : 0;
  const navbarHeight = 40;
  const mainStyles = {
    // marginLeft: toggled ? `${sidebarWidth}px` : '0',
    // width: toggled ? `calc(100% - ${sidebarWidth}px)` : '100%',
    transition: 'transform 0.3s ease-in-out',
    paddingLeft: '15px',
    paddingRight: '15px',
    marginTop: `${navbarHeight}px`,
    minHeight: '100vh',
    width: '100%'
  };


  return (
    <>
      <header>
        <NavbarWrapper />
      </header>
      <main className="container mx-auto mt-10" style={{ display: 'flex' }}>
        <Aside />
        <section className="w-full" style={mainStyles}>{children}</section>
        {breakPoint === BreakPoint.ALL && toggled && (
        <style jsx>{`
          @media (min-width: 768px) {
            /* Define as regras de estilo que devem ser aplicadas apenas em telas maiores que 768px de largura (tamanhos de tela maiores que tablets) */
            section {
              margin-left: ${toggled ? `${sidebarWidth}px` : '0'}; /* Aplica a margem esquerda apenas quando o aside estiver visível */
              width: ${toggled ? `calc(100% - ${sidebarWidth}px)` : '100%'}; /* Reduz a largura do section quando o aside estiver visível */
            }
          }
        `}</style>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
