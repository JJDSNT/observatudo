import DropdownCombo from '@/app/components/DropdownCombo';
import EixoButton from '@/app/components/EixoButton';
import EixoDropdown from '@/app/components/EixoDropdown';
import Eixos from '@/app/components/Eixos';
import MetricsCards from '@/app/components/MetricsCards';
import { useInfoStore } from '@/app/stores/useInfoStore';

const Dashboard = () => {
    const { estadoSelecionado, cidadeSelecionada, eixoSelecionado, setEstado, setCidade, setEixo } = useInfoStore();

    return (
        <div className="container mx-auto">
            <EixoButton />
            <header className="bg-gray-200 p-4 flex rounded-lg">
                <div style={{ maxWidth: '100%' }} >
                    <DropdownCombo />
                </div>
            </header>
            <div className='md:hidden'>
            <div className='container'>
                testando1
                
                    <EixoDropdown />
                </div>
            </div>
            <hr />
            <div className='hidden md:block'>
            testando2
            <div className='container'>
                
                    <Eixos />
                </div>
            </div>
            <MetricsCards />
        </div>
    );
};

export default Dashboard;