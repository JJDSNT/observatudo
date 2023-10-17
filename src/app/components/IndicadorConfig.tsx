import React, { useState, useEffect } from 'react';
import { useInfoStore } from '@/app/stores/useInfoStore';
import { Indicador } from '@/app/models/Indicador';
import { SelecaoIndicadorService } from '@/app/services/SelecaoIndicadorService';
/*
const selecaoIndicadorService = new SelecaoIndicadorService();

const IndicadorConfig: React.FC = () => {
  const [indicadores, setIndicadores] = useState<Indicador[]>([]);
  const { user, eixoSelecionado } = useInfoStore();
//userId = 3
// email =

  useEffect(() => {
    const fetchIndicadores = async () => {
      try {
        const fetchedIndicadores = await selecaoIndicadorService.getIndicadores();
        setIndicadores(fetchedIndicadores);
      } catch (error) {
        console.error('Erro ao buscar os indicadores:', error);
      }
    };

    fetchIndicadores();
  }, []);

  const handleSelecaoIndicador = async (indicadorId:number) => {
    try {
      await selecaoIndicadorService.adicionarSelecaoIndicador(user.id, eixoSelecionado!, indicadorId);
      // Lógica de manipulação para atualização da seleção do indicador
    } catch (error) {
      console.error('Erro ao salvar a seleção do indicador:', error);
    }
  };

  return (
    <div>
      {indicadores.map((indicador) => (
        <div key={indicador.id}>
          <span>{indicador.nome}</span>
          <button onClick={() => handleSelecaoIndicador(indicador.id)}>Selecionar</button>
        </div>
      ))}
    </div>
  );
};

export default IndicadorConfig;
*/