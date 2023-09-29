import { AppDataSource } from '@/app/infra/database';
import { Cidade } from '@/app/models/Cidade';

if (!AppDataSource.isInitialized) {
    try {
        await AppDataSource.initialize();
    } catch (err) {
        console.error(`Data Source initialization error`, err);
    }
}

export const CidadeRepository = AppDataSource.manager.getRepository(Cidade);