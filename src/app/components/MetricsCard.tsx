import React from 'react';
import { Indicador } from '@/app/models/Indicador';

interface MetricCardProps {
    indicador: Indicador;
    selectedLocalidade: number | null;
}

const MetricsCard: React.FC<MetricCardProps> = ({ indicador, selectedLocalidade }) => {

    return (
        <div className="w-full"> {/* Adicione esta classe para ocupar toda a largura */}
            <div className="bg-white rounded-lg shadow-lg p-4">
                {indicador && indicador.nome ? (
                    <>
                        <h3 className="text-xl font-semibold text-gray-800">{indicador.nome}</h3>
                        <p className="text-sm text-gray-600">{indicador.descricao}</p>
                        {selectedLocalidade !== null ? (
                            <ul>
                                {indicador.valoresIndicador
                                    .filter((valor) => valor.localidade.codigo === selectedLocalidade)
                                    .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
                                    .map((valor) => (
                                        <li key={valor.id}>
                                            Data: {new Date(valor.data).toLocaleDateString()}, Valor: {valor.valor}
                                        </li>
                                    ))}
                            </ul>
                        ) : (
                            <p><b>Selecione uma localidade para ver os valores do indicador.</b></p>
                        )}
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
