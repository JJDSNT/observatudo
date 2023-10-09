import { AppDataSource } from '@/app/infra/database';
import { Estado } from '@/app/models/Estado';

if (!AppDataSource.isInitialized) {
    try {
        await AppDataSource.initialize();
        console.log('>>>ESTADO: Database foi inicializado');
    } catch (err) {
        console.error(`#####ESTADO: Data Source initialization error`, err);
    }
}

export const EstadoRepository = AppDataSource.manager.getRepository(Estado);

