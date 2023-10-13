import React from 'react';
import { FaGithub } from "react-icons/fa"
import Dashboard from './Pages/Dashboard';
import ListarIndicadores from './Pages/ListarIndicadores';
import { useSidebarStore } from '@/app/stores/useSidebarStore';
import NavMenu from "@/app/components/AuthNav"

const Main = () => {

  const { activePage, handleBackdropClick } = useSidebarStore();

  return (
    <main className="container mx-auto mt-10">



      {activePage === 'dashboard' ? (
        <Dashboard />
      ) : (
        <ListarIndicadores />
      )}


      {/* Rodapé */}
      <footer className="mt-10 flex flex-col items-center justify-center text-center">
        <hr className="w-1/3 my-4 border-gray-300" />
        <p className="mb-2">Desenvolvido com <span role="img" aria-label="Coração">❤️</span> dedicação.</p>
        <div className="flex items-center">
          <span>
            <FaGithub />
          </span>
          <a
            href="https://github.com/JJDSNT/otfrontend2"
            target="_blank"
            className="ps-sidebar-btn ml-2"
            rel="noopener noreferrer"
          >
            Código-fonte
          </a>
        </div>
      </footer>

    </main>
  );
};

export default Main;
