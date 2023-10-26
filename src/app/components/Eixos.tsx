import React, { useState, useEffect } from 'react';
import httpClient from '@/app/utils/httpClient';
import { useInfoStore } from '@/app/stores/useInfoStore';
import { IconContext } from 'react-icons';
import { FaBicycle, FaLandmark, FaGlobeAmericas, FaHeartbeat, FaHome, FaMoneyBillWave, FaQuestion, FaUserGraduate, FaShieldAlt } from 'react-icons/fa';

interface Eixo {
  id: number;
  nome: string;
  nomeLegivel: string;
  icon: string;
  cor: string;
}

const Eixos: React.FC = () => {
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

  const handleEixoSelecionado = (numeroEixo: number) => {
    setEixo(numeroEixo);
  };

  const renderIcon = (icon: string): React.ReactElement | null => {
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

  return (
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {eixos.map((eixo, index) => (
          <button
            key={index}
            type="button"
            className={`${eixo.cor} text-black border rounded-lg p-4 flex flex-col items-center justify-center space-y-2`}
            onClick={() => handleEixoSelecionado(eixo.id)}
          >
            {renderIcon(eixo.icon)}<span>{eixo.nomeLegivel}</span>
          </button>
        ))}
      </div>
  );
};

export default Eixos;
