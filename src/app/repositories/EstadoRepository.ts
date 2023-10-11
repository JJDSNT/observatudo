import { AppDataSource } from '@/app/infra/database';
import { Estado } from '@/app/models/Estado';

if (!AppDataSource.isInitialized) {
    try {
        await AppDataSource.initialize();
        console.log('>>> EstadoRepository: Database foi inicializado');
    } catch (err) {
        console.error(`### EstadoRepository: Data Source initialization error`, err);
    }
}

export const EstadoRepository = AppDataSource.manager.getRepository(Estado);

