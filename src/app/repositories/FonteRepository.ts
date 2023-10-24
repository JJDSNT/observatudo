import { AppDataSource } from '@/app/infra/database';
import { Fonte } from '@/app/models/Fonte';

if (!AppDataSource.isInitialized) {
    try {
        await AppDataSource.initialize();
    } catch (err) {
        console.error(`#####FONTE repository: Data Source initialization error`, err);
    }
}

export const FonteRepository = AppDataSource.manager.getRepository(Fonte);