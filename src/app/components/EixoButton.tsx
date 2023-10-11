import React, { useEffect, useState } from 'react';
import httpClient from '@/app/utils/httpClient';
import { useInfoStore } from '@/app/stores/useInfoStore';
import { FaBicycle, FaLandmark, FaGlobeAmericas, FaHeartbeat, FaHome, FaMoneyBillWave, FaQuestion, FaUserGraduate, FaShieldAlt } from 'react-icons/fa';


interface Eixo {
  id: number;
  nome: string;
  nomeLegivel: string;
  icon: string;
  cor: string;
}

const EixoButton: React.FC = () => {
  const { eixoSelecionado, setEixo } = useInfoStore();
  const [eixos, setEixos] = useState<Eixo[]>([]);

  useEffect(() => {
    const fetchEixos = async () => {
      try {
        const response = await httpClient.get('/api/eixos');
        setEixos(response.data.eixos);
      } catch (error) {
        console.error('Erro ao buscar os eixos:', error);
      }
    };

    fetchEixos();
  }, []);

  const renderIcon = (icon: string) => {
    switch (icon) {
      case 'FaHeartbeat':
        return <FaHeartbeat />;
      case 'FaUserGraduate':
        return <FaUserGraduate />;
      case 'FaHome':
        return <FaHome />;
      case 'FaShieldAlt':
        return <FaShieldAlt />;
      case 'FaGlobeAmericas':
        return <FaGlobeAmericas />;
      case 'FaMoneyBillWave':
        return <FaMoneyBillWave />;
      case 'FaLandmark':
        return <FaLandmark />;
      case 'FaQuestion':
        return <FaQuestion />;
      default:
        return null;
    }
  };

  // Encontre o eixo correspondente ao eixoSelecionado
  const eixoSelecionadoInfo = eixos.find((eixo) => eixo.id === eixoSelecionado);

  return (
    <button
      type="button"
      className={`${eixoSelecionadoInfo ? eixoSelecionadoInfo.cor : 'text-black'
        } border rounded-lg p-4 flex flex-col items-center justify-center space-y-2`}
    >
      {eixoSelecionadoInfo && (
        <>
          {renderIcon(eixoSelecionadoInfo.icon)}
          <span>{eixoSelecionadoInfo.nomeLegivel}</span>
        </>
      )}
    </button>
  );
};

export default EixoButton;
