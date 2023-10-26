import React, { useEffect, useState } from 'react';
import httpClient from '@/app/utils/httpClient';
import { useInfoStore } from '@/app/stores/useInfoStore';

interface Eixo {
    id: number;
    nome: string;
}

const EixoDropdown: React.FC = () => {
    const { eixoSelecionado, setEixo } = useInfoStore();
    const [eixos, setEixos] = useState<Eixo[]>([]);
    const [selectedEixo, setSelectedEixo] = useState<number | undefined>(eixoSelecionado || undefined);

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

    useEffect(() => {
        setSelectedEixo(eixoSelecionado !== null ? eixoSelecionado : undefined);
    }, [eixoSelecionado]);

    const handleEixoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = parseInt(event.target.value, 10);
        setSelectedEixo(selectedValue);
        setEixo(selectedValue);
    };

    return (
        <div className="flex">
            <div className="mr-4">
                <label htmlFor="eixo" className="block mb-1 text-sm font-medium text-gray-700">
                    Eixo
                </label>
                <select
                    id="eixo"
                    name="eixo"
                    className="block min-w-min p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    style={{ color: 'black' }}
                    value={selectedEixo || ''}
                    onChange={handleEixoChange}
                >
                    <option value="">Selecione um eixo</option>
                    {eixos.map((eixo) => (
                        <option key={eixo.id} value={eixo.id}>
                            {eixo.nome}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default EixoDropdown;
