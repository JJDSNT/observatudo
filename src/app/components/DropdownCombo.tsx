import React, { useState, useEffect } from 'react';
import httpClient from '@/app/utils/httpClient';


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

interface DropdownComboProps {
  onEstadoSelecionado: (codigoEstado: number) => void;
  onCidadeSelecionada: (codigoCidade: number) => void;
}

const DropdownCombo: React.FC<DropdownComboProps> = ({ onEstadoSelecionado, onCidadeSelecionada }) => {
  const [estados, setEstados] = useState<Estado[]>([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState<Estado | null>(null);
  const [cidadeSelecionada, setCidadeSelecionada] = useState<{ codigo: number; nome: string } | null>(null);


  useEffect(() => {
    const fetchEstadosECidades = async () => {
      try {
        const response = await httpClient.get('/api/localidade');
        const data = response.data; 
        console.log('resultado '+data);
        if (data && data.estados) {
          setEstados(data.estados);
          setEstadoSelecionado(data.estados[0] || null);
          setCidadeSelecionada((data.estados[0] && data.estados[0].cidades[0]) || null);
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
      setEstadoSelecionado(estado || null);
      setCidadeSelecionada(estado.cidades[0] || null);
    }
  };

  const handleCidadeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const codigoCidade = parseInt(event.target.value);
    const cidade = estadoSelecionado?.cidades.find((cidade) => cidade.codigo === codigoCidade);
    console.log(cidade);
    setCidadeSelecionada(cidade || null);
  };

  if (estados.length === 0) {
    console.log (estados);
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
          value={(estadoSelecionado && estadoSelecionado.estado.codigo) || ''}
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

        {estadoSelecionado && estadoSelecionado.cidades && estadoSelecionado.cidades.length > 0 && (
          <select
            id="cidade"
            name="cidade"
            className="block min-w-min p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={cidadeSelecionada?.codigo || ''}
            onChange={handleCidadeChange}
          >
            {estadoSelecionado.cidades.map((cidade) => (
              <option key={cidade.codigo} value={cidade.codigo}>
                {cidade.nome}
              </option>
            ))}
          </select>
        )}


      </div>
    </div>
  );

};


export async function getServerSideProps() {
  // Lógica para buscar dados do servidor
  const data = {};

  return {
    props: {
      data,
    },
  };
}


export default DropdownCombo;
