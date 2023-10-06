import React from 'react';
import Dashboard from './Pages/Dashboard';
import ListarIndicadores from './Pages/ListarIndicadores';
import { useSidebarStore } from '@/app/stores/useSidebarStore';

const Main = () => {

  const { activePage } = useSidebarStore();

  return (
    <main className="container mx-auto mt-10">


      {activePage === 'dashboard' ? (
        <Dashboard />
      ) : (
        <ListarIndicadores />
      )}

      {/* Rodapé */}
      <footer className="mt-10 flex items-center justify-center">
        <hr />
        <p>Desenvolvido com <span role="img" aria-label="Coração">❤️</span> dedicação.</p>
      </footer>
    </main>
  );
};

export default Main;
