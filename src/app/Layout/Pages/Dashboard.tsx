import DropdownCombo from '@/app/components/DropdownCombo';
import EixoButton from '@/app/components/EixoButton';
import EixoDropdown from '@/app/components/EixoDropdown';
import Eixos from '@/app/components/Eixos';
import { useInfoStore } from '@/app/stores/useInfoStore';

const Dashboard = () => {
    const { estadoSelecionado, cidadeSelecionada, eixoSelecionado, setEstado, setCidade, setEixo } = useInfoStore();

    return (
        <>
        <EixoButton />
            <header className="bg-gray-200 p-4 flex rounded-lg">
                <DropdownCombo /> <EixoDropdown />
            </header>
            <hr />
            <Eixos />
            {estadoSelecionado && (
                <p>O código do estado selecionado é: {estadoSelecionado}</p>
            )}
            {cidadeSelecionada && (
                <p>O código da cidade selecionada é: {cidadeSelecionada.toString()}</p>
            )}
            {eixoSelecionado && (
                <p>O número do eixo selecionado é: {eixoSelecionado}</p>
            )}

        </>
    );
};

export default Dashboard;