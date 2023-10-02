import { AppDataSource } from '@/app/infra/database';
import { Indicador } from '@/app/models/Indicador';

if (!AppDataSource.isInitialized) {
    try {
        await AppDataSource.initialize();
    } catch (err) {
        console.error(`####INDICADOR: Data Source initialization error`, err);
    }
}
console.log("##########INDICADORES peguei o repositorio");
export const IndicadorRepository = AppDataSource.manager.getRepository(Indicador);