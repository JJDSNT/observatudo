//https://stackoverflow.com/questions/60140903/cannot-read-property-tablepath-of-undefined-type-orm
import { AppDataSource } from "@/app/infra/database";
import { EixoService } from "@/app/services/EixoService";
import { IndicadorService } from "@/app/services/IndicadorService";

const indicatorsToUpdate = [
    // Saúde (Health)

    { codigo_indicador: '4009', eixoId: 1 },
    { codigo_indicador: '125', eixoId: 1 },
    { codigo_indicador: '3982', eixoId: 1 },
    { codigo_indicador: '4008', eixoId: 1 },

    // Educação (Education)
    { codigo_indicador: '4016', eixoId: 2 },
    { codigo_indicador: '4148', eixoId: 2 },
    { codigo_indicador: '5155', eixoId: 2 },
    { codigo_indicador: '27', eixoId: 2 },
    { codigo_indicador: '4022', eixoId: 2 },

    // Assistência Social (Social Assistance)
    { codigo_indicador: '3965', eixoId: 3 },
    { codigo_indicador: '3985', eixoId: 3 },

    // Segurança (Security)
    { codigo_indicador: '3900', eixoId: 4 },

    // Meio ambiente, urbanização e mobilidade (Environment, Urbanization, and Mobility)
    { codigo_indicador: '127', eixoId: 5 },
    { codigo_indicador: '5140', eixoId: 5 },
    { codigo_indicador: '3865', eixoId: 5 },

    // Economia & Finanças (Economy & Finance)
    { codigo_indicador: '23', eixoId: 6 },

    // Governança & Administração (Governança)
    { codigo_indicador: '4120', eixoId: 7 },
    { codigo_indicador: '3922', eixoId: 7 },
    { codigo_indicador: '4005', eixoId: 7 },
];


const eixoService = new EixoService();
const indicadorService = new IndicadorService();

export async function classifyindicador(): Promise<void> {

    if (!AppDataSource.isInitialized) {
        try {
            await AppDataSource.initialize();
        } catch (err) {
            console.error(`### CLASSIFY INDICADOR: Data Source initialization error`, err);
        }
    }

    for (const indicator of indicatorsToUpdate) {
        const eixo = await eixoService.getEixoById(indicator.eixoId);
        if (eixo){
            console.log("indicadorId: "+indicator.codigo_indicador);
            const loadedindicador = await indicadorService.buscarIndicadorPorId(parseInt(indicator.codigo_indicador));
            if (loadedindicador){
                console.log("adicionando: "+JSON.stringify(loadedindicador)+" no eixo "+JSON.stringify(eixo));
                await eixoService.adicionarIndicadoresAoEixoPadrao(eixo.id, [loadedindicador]);
            }
        }
    }


}