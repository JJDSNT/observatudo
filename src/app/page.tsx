'use client'
import React, { useState, useEffect } from 'react';
import DropdownCombo from './components/DropdownCombo';
import Eixos from './components/Eixos';
import Link from 'next/link';

const Home = () => {
/*
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ObservaTudo</h1>

      <div className="bg-gray-200 p-4 rounded-lg">
        <DropdownCombo
          onEstadoSelecionado={handleEstadoSelecionado}
          onCidadeSelecionada={handleCidadeSelecionada}
        />
      </div>
      <br />
      <div id="eixos" className="row g-2 text-tahiti">
        <Eixos onEixoSelecionado={handleEixoSelecionado} />
        <br />
        dashboard federal
        dashboard estadual
        dashboard municipal
      </div>
      {codigoEstadoSelecionado && (
        <p>O código do estado selecionado é: {codigoEstadoSelecionado}</p>
      )}
      {codigoCidadeSelecionada && (
        <p>O código da cidade selecionada é: {codigoCidadeSelecionada}</p>
      )}
      {numeroEixoSelecionado && (
        <p>O número do eixo selecionado é: {numeroEixoSelecionado}</p>
      )}
    </div>
  );
*/
return (
  <div>A</div>
);
};

export default Home;
