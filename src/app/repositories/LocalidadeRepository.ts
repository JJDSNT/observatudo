import { AppDataSource } from '@/app/infra/database';
import { Localidade } from '@/app/models/Localidade';

if (!AppDataSource.isInitialized) {
    try {
        await AppDataSource.initialize();
    } catch (err) {
        console.error(`Data Source initialization error`, err);
    }
}

export const LocalidadeRepository = AppDataSource.manager.getRepository(Localidade);