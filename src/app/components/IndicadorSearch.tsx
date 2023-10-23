import React, { useState, useEffect, ChangeEvent } from 'react';
import httpClient from '@/app/utils/httpClient';
import { Input } from '@nextui-org/react';
'use client'
import { SearchIcon } from '../components2/SearchIcon';

// Função para remover acentos e caracteres especiais
const removeAccents = (str: string) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

interface Indicador {
  id: number;
  nome: string;
  descricao: string;
  dono: string | null;
  email: string | null;
}

const IndicadorSearch = () => {
  const [indicadores, setIndicadores] = useState<Indicador[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    try {
      const response = await httpClient.get('/api/indicadores');
      console.log('sucesso')
      setIndicadores(response.data.indicadores);
    } catch (error) {
      console.error('Houve um erro ao buscar os dados:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(removeAccents(event.target.value.toLowerCase()));
  };

  const filteredIndicadores = indicadores ? indicadores.filter((indicador) =>
    removeAccents(indicador.nome.toLowerCase()).includes(searchTerm)
  ) : [];

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-md mx-auto">
        <input
          className="w-full border-2 border-gray-300 p-2 rounded-md mb-4"
          type="text"
          placeholder="Pesquisar indicadores..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} width={undefined} height={undefined} />}
          type="search"
        />
        <ul>
          {filteredIndicadores.map((indicador) => (
            <li key={indicador.id} className="border-b p-4">
              <h3 className="text-lg font-bold">{indicador.nome}</h3>
              <p className="mt-2 text-sm text-gray-600">{indicador.descricao}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IndicadorSearch;
