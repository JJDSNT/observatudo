import { AppDataSource } from "@/app/infra/database";
import { Fonte } from "@/app/models/Fonte";
//import { EixoService } from "@/app/services/EixoService";
import { IndicadorService } from "@/app/services/IndicadorService";

const indicatorsToUpdate = [
    // Saúde (Health)

    { codigo_indicador: '125', eixoId: 1 },
    { codigo_indicador: '3982', eixoId: 1 },
    { codigo_indicador: '4008', eixoId: 1 },
    { codigo_indicador: '4009', eixoId: 1 },

    // Educação (Education)
    { codigo_indicador: '27', eixoId: 2 },
    { codigo_indicador: '4016', eixoId: 2 },
    { codigo_indicador: '4148', eixoId: 2 },
    { codigo_indicador: '4022', eixoId: 2 },
    { codigo_indicador: '5155', eixoId: 2 },

    // Assistência Social (Social Assistance)
    { codigo_indicador: '3965', eixoId: 3 },
    { codigo_indicador: '3985', eixoId: 3 },

    // Segurança (Security)
    { codigo_indicador: '3900', eixoId: 4 },

    // Meio ambiente, urbanização e mobilidade (Environment, Urbanization, and Mobility)
    { codigo_indicador: '127', eixoId: 5 },
    { codigo_indicador: '3865', eixoId: 5 },
    { codigo_indicador: '5140', eixoId: 5 },

    // Economia & Finanças (Economy & Finance)
    { codigo_indicador: '23', eixoId: 6 },

    // Governança & Administração (Governança)
    { codigo_indicador: '3922', eixoId: 7 },
    { codigo_indicador: '4005', eixoId: 7 },
    { codigo_indicador: '4120', eixoId: 7 },
];

    // Criar fonte
    const fonte = new Fonte();
    fonte.nome = "Cidades sustentáveis - Indicadores";
    fonte.url = "https://www.cidadessustentaveis.org.br/inicial/home";



//const eixoService = new EixoService();
const indicadorService = new IndicadorService();

export async function addFonte(): Promise<void> {

    if (!AppDataSource.isInitialized) {
        try {
            await AppDataSource.initialize();
        } catch (err) {
            console.error(`### Add Indicador font: Data Source initialization error`, err);
        }
    }


    for (const indicador of indicatorsToUpdate) {
        try {
            const existingIndicador = await indicadorService.buscarIndicadorPorId(parseInt(indicador.codigo_indicador));
            if (existingIndicador) {
                existingIndicador.fonte = fonte; // atribuir a fonte ao indicador
                await indicadorService.updateIndicadorWithFont(existingIndicador,fonte); // atualizar o indicador com a fonte
            }
        } catch (error) {
            console.error(`### Add Indicador font: Failed to add font to indicador ${indicador.codigo_indicador}`, error);
        }
    }


}