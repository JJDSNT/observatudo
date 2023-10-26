import React, { useState, useEffect } from 'react';
import httpClient from '@/app/utils/httpClient';
import { useInfoStore } from '@/app/stores/useInfoStore';


interface Estado {
  codigo: number;
  nome: string;
  sigla: string;
  capital: {
    codigo: number;
    nome: string;
  };
  cidades: {
    codigo: number;
    nome: string;
  }[];
}


const DropdownCombo: React.FC = () => {
  const [estados, setEstados] = useState<Estado[]>([]);
  const { estadoSelecionado, cidadeSelecionada, setEstado, setCidade } = useInfoStore();

  useEffect(() => {
    const fetchEstadosECidades = async () => {
      try {
        const response = await httpClient.get('/api/localidades');
        const data = response.data;

        if (data && data.estados) {
          const estadoSelecionado = data.estados[0] ? data.estados[0].estado : null;
          const cidades = estadoSelecionado ? estadoSelecionado.cidades : [];

          setEstados(data.estados);
          setEstado(estadoSelecionado ? estadoSelecionado.codigo : null);
          setCidade(cidades[0] ? cidades[0].codigo : null);
        }
      } catch (error) {
        console.error('Ocorreu um erro ao buscar os estados e cidades:', error);
      }
    };

    fetchEstadosECidades();
  }, []);

  const handleEstadoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const estadoId = parseInt(event.target.value);
    const estado = estados.find((estado) => estado.codigo === estadoId);

    if (estado) {
      setEstado(estado.codigo);
      if (estado.capital) {
        setCidade(estado.capital.codigo);
      }
    }

  };

  const handleCidadeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const codigoCidade = parseInt(event.target.value);
    setCidade(codigoCidade);
  };

  if (estados.length === 0) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex">
      <div className="mr-4">
        <label htmlFor="estado" className="block mb-1 text-sm font-medium text-gray-700">
          Estado
        </label>
        <select
          id="estado"
          name="estado"
          className="block min-w-min p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={estadoSelecionado || ''}
          onChange={handleEstadoChange}
          style={{ color: 'black' }}
        >
          {estadoSelecionado ? null : (
            <option value="">Estado</option>
          )}
          {estados.map((estado) => (
            <option key={estado.codigo} value={estado.codigo}>
              {estado.sigla}
            </option>
          ))}
        </select>
      </div>

      <div>

        <label htmlFor="cidade" className="block mb-1 text-sm font-medium text-gray-700">
          Cidade
        </label>

        <select
          id="cidade"
          name="cidade"
          className="block min-w-min p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={cidadeSelecionada || ''}
          onChange={handleCidadeChange}
          style={{ color: 'black' }}
        >
          {estadoSelecionado && estadoSelecionado > 0 ? (
            estados.find((estado) => estado.codigo === estadoSelecionado)?.cidades.map((cidade) => (
              <option key={cidade.codigo} value={cidade.codigo}>
                {cidade.nome}
              </option>
            ))
          ) : (
            <option value="">Selecione um estado</option>
          )}
        </select>

      </div>
    </div>
  );
};

export default DropdownCombo;