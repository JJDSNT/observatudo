import React from 'react';
import { Indicador } from '@/app/models/Indicador';

interface MetricCardProps {
    indicador: Indicador;
}

const MetricsCard: React.FC<MetricCardProps> = ({ indicador }) => {
    return (
        <div className="w-full"> {/* Adicione esta classe para ocupar toda a largura */}
            <div className="bg-white rounded-lg shadow-lg p-4">
                {indicador && indicador.nome ? (
                    <>
                        <h3 className="text-xl font-semibold text-gray-800">{indicador.nome}</h3>
                        <p className="text-sm text-gray-600">{indicador.descricao}</p>
                        {/* Adicione outros elementos do cartão de métricas conforme necessário */}
                    </>
                ) : (
                    <div>
                        <p className="text-red-600">Dados do indicador não disponíveis</p>
                        <pre>{JSON.stringify(indicador, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MetricsCard;
