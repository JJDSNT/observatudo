import { AppDataSource } from '@/app/infra/database';
import { Cidade } from '@/app/models/Cidade';

if (!AppDataSource.isInitialized) {
    try {
        await AppDataSource.initialize();
    } catch (err) {
        console.error(`####CIDADE: Data Source initialization error`, err);
    }
}

console.log("##########CIDADES peguei o repositorio");
export const CidadeRepository = AppDataSource.manager.getRepository(Cidade);