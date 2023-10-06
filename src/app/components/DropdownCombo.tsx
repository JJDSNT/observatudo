import React, { useState, useEffect } from 'react';
import httpClient from '@/app/utils/httpClient';
import { useInfoStore } from '@/app/stores/useInfoStore';

interface Estado {
  estado: {
    codigo: number;
    sigla: string;
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
        const response = await httpClient.get('/api/localidade');
        const data = response.data;
        console.log('resultado ' + data);
        if (data && data.estados) {
          setEstados(data.estados);
          setEstado(data.estados[0] ? data.estados[0].estado.codigo : null);
          setCidade(data.estados[0] && data.estados[0].cidades[0] ? data.estados[0].cidades[0].codigo : null);
        }
      } catch (error) {
        console.error('Ocorreu um erro ao buscar os estados e cidades:', error);
      }
    };

    fetchEstadosECidades();
  }, []);

  const handleEstadoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const estadoId = parseInt(event.target.value);
    const estado = estados.find((estado) => estado.estado.codigo === estadoId);

    if (estado) {
      setEstado(estado.estado.codigo);
      setCidade(estado.cidades[0] ? estado.cidades[0].codigo : null);
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
        >
          {estados.map((estado) => (
            <option key={estado.estado.codigo} value={estado.estado.codigo}>
              {estado.estado.sigla}
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
        >
          {estadoSelecionado && estadoSelecionado > 0 ? (
            estados.find((estado) => estado.estado.codigo === estadoSelecionado)?.cidades.map((cidade) => (
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
