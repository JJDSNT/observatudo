import React from 'react';
import { useSidebarStore } from '@/app/stores/useSidebarStore';
import Footer from "@/app/components/Footer"
import Dashboard from './Pages/Dashboard';
import ListarIndicadores from './Pages/ListarIndicadores';

const Main = () => {

  const { activePage, handleBackdropClick, toggled, collapsed } = useSidebarStore();

  const sidebarWidth = collapsed ? 80 : 270;
  const mainStyles = {
    marginLeft: toggled ? `${sidebarWidth}px` : '0',
    width: toggled ? `calc(100% - ${sidebarWidth}px)` : '100%',
    //transform: toggled ? `translateX(${sidebarWidth}px)` : 'none', // Ajuste a largura de acordo com a largura da sua barra lateral
    transition: 'transform 0.3s ease-in-out' // Adicione uma transição suave
  };

  return (
    <main className="container mx-auto mt-10" style={mainStyles}>



      {activePage === 'dashboard' ? (
        <Dashboard />
      ) : (
        <ListarIndicadores />
      )}


      <Footer />


    </main>
  );
};

export default Main;
