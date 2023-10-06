import React, { useState } from 'react';
import DropdownCombo from '@/app/components/DropdownCombo';
import Eixos from '@/app/components/Eixos';

const Main = () => {
  const [codigoEstadoSelecionado, setCodigoEstadoSelecionado] = useState<number | null>(null);
  const [codigoCidadeSelecionada, setCodigoCidadeSelecionada] = useState<number | null>(null);
  const [numeroEixoSelecionado, setNumeroEixoSelecionado] = useState<number | null>(null);

  const handleEixoSelecionado = (numeroEixo: number) => {
    setNumeroEixoSelecionado(numeroEixo);
  };

  const handleEstadoSelecionado = (codigoEstado: number) => {
    console.log('Estado selecionado:', codigoEstado);
    setCodigoEstadoSelecionado(codigoEstado);
  };

  const handleCidadeSelecionada = (codigoCidade: number) => {
    console.log('Cidade selecionada:', codigoCidade)
    setCodigoCidadeSelecionada(codigoCidade);
  };

  return (
    <main className="container mx-auto mt-10">

      <header className="bg-gray-200 p-4 rounded-lg">
        <DropdownCombo
          onEstadoSelecionado={handleEstadoSelecionado}
          onCidadeSelecionada={handleCidadeSelecionada}
        />
      </header>
      <hr />

      {/* Conteúdo Principal */}
      
        <Eixos onEixoSelecionado={handleEixoSelecionado} />
        {/* Adicione seus componentes de dashboard aqui */}
      


      {codigoEstadoSelecionado && (
        <p>O código do estado selecionado é: {codigoEstadoSelecionado}</p>
      )}
      {codigoCidadeSelecionada && (
        <p>O código da cidade selecionada é: {codigoCidadeSelecionada}</p>
      )}
      {numeroEixoSelecionado && (
        <p>O número do eixo selecionado é: {numeroEixoSelecionado}</p>
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
