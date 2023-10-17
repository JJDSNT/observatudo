import React, { useEffect, useState } from 'react';
import httpClient from '@/app/utils/httpClient';

interface Eixo {
  id: number;
  nome: string;
  cor: string;
  indicadores: Array<{
    id: number;//estranho, é indiferente ser id ou codigo_indicador
    nome: string;
    descricao: string;
  }>;
}

function ListarIndicadores() {
  const [eixos, setEixos] = useState<Eixo[]>([]);

  useEffect(() => {
    const fetchIndicadores = async () => {
      try {
        const response = await httpClient.get('/api/indicadores/eixo');
        const data = response.data;
        console.log('resultado ' + data);

        if (data && data.eixos) {
          setEixos(data.eixos);
        }
      } catch (error) {
        console.error('Ocorreu um erro ao buscar os indicadores:', error);
      }
    };

    fetchIndicadores();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {eixos.map((eixo) => (
          <div key={eixo.id} className={`p-4 ${eixo.cor}`}>
            <h2 className="text-2xl font-bold mb-2">{eixo.nome}</h2>
            {eixo.indicadores.map((indicador) => (
              <div key={indicador.id} className="mb-2">
                <h3 className="text-lg font-semibold">{indicador.nome}</h3>
                <p className="text-sm">{indicador.descricao}</p>
                <p className="text-sm">{indicador.id}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListarIndicadores;
