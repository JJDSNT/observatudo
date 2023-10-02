import { AppDataSource } from '@/app/infra/database';
import { Eixo } from '@/app/models/Eixo';

if (!AppDataSource.isInitialized) {
    try {
        await AppDataSource.initialize();
    } catch (err) {
        console.error(`#####EIXO: Data Source initialization error`, err);
    }
}

console.log("##########EIXOS peguei o repositorio");
export const EixoRepository = AppDataSource.manager.getRepository(Eixo);