import React, { ReactElement, useEffect, useState } from 'react';
import httpClient from '@/app/utils/httpClient';
import { IconContext } from 'react-icons';
import { FaBicycle, FaGlobeAmericas, FaHeartbeat, FaHome, FaMoneyBillWave, FaQuestion, FaUserGraduate, FaShieldAlt } from 'react-icons/fa';

interface Eixo {
  id: number;
  nome: string;
  icon: string;
  cor: string;
}

interface EixosProps {
  onEixoSelecionado: (numeroEixo: number) => void;
}

const Eixos: React.FC<EixosProps> = ({ onEixoSelecionado }) => {
  const [eixos, setEixos] = useState<Eixo[]>([]);

  const [eixoSelecionado, setEixoSelecionado] = useState<number | null>(null);

  const handleEixoSelecionado = (numeroEixo: number) => {
    setEixoSelecionado(numeroEixo);
    onEixoSelecionado(numeroEixo);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fetchEixos = async () => {
        try {
          const response = await httpClient.get('/api/eixos');
          setEixos(response.data.eixos);
        } catch (error) {
          console.error('Erro ao buscar os eixos:', error);
        }
      };

      fetchEixos();
    }
  }, []);


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
          {renderIcon(eixo.icon)}
          <span>{eixo.nome}</span>
        </button>
      ))}
    </div>
  );
};

export default Eixos;
