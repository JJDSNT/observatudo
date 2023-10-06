import React, { useState } from 'react';
import DropdownCombo from '@/app/components/DropdownCombo';
import Eixos from '@/app/components/Eixos';
import Aside from './Aside';
import { useInfoStore } from '@/app/stores/useInfoStore';

const Main = () => {
  const { estadoSelecionado, cidadeSelecionada, eixoSelecionado, setEstado, setCidade, setEixo } = useInfoStore();


  return (
    <main className="container mx-auto mt-10">

      <header className="bg-gray-200 p-4 rounded-lg">
        <DropdownCombo />

      </header>
      <hr />

      {/* Conteúdo Principal */}
      
        <Eixos />
        {/* Adicione seus componentes de dashboard aqui */}
      


      {estadoSelecionado && (
        <p>O código do estado selecionado é: {estadoSelecionado}</p>
      )}
      {cidadeSelecionada && (
        <p>O código da cidade selecionada é: {cidadeSelecionada.toString()}</p>
      )}
      {eixoSelecionado && (
        <p>O número do eixo selecionado é: {eixoSelecionado}</p>
      )}

      {/* Rodapé */}
      <footer className="mt-10">
        <hr />
        footer
      </footer>
    </main>
  );
};

export default Main;
