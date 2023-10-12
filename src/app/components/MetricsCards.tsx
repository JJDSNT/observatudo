import React, { useEffect, useState } from 'react';
import { useInfoStore } from '@/app/stores/useInfoStore';
import httpClient from '@/app/utils/httpClient';
import { Indicador } from '@/app/models/Indicador'
import MetricsCard from './MetricsCard';

const MetricsCards: React.FC = () => {
    const [eixos, setEixos] = useState<any[]>([]);
    const { eixoSelecionado } = useInfoStore();

    useEffect(() => {
        const fetchIndicadores = async () => {
            try {
                const response = await httpClient.get('/api/indicadores/eixo');
                setEixos(response.data.eixos);
            } catch (error) {
                console.error('Erro ao buscar os eixos:', error);
            }
        };

        fetchIndicadores();
    }, []);

    const selectedEixo = eixos.find((eixo) => eixo.id === eixoSelecionado);

    return (
        <>
            <div>Teste</div>
            {eixoSelecionado && (
                <p>O número do eixo selecionado é: {eixoSelecionado}</p>
            )}
            {selectedEixo && (
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    {selectedEixo.indicadores.map((indicador: Indicador) => (
                        <MetricsCard key={indicador.id} indicador={indicador} />
                    ))}
                </div>
            )}
        </>
    )
};

export default MetricsCards;