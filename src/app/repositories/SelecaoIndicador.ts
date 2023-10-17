/*
import { AppDataSource } from '@/app/infra/database';
import { SelecaoIndicador } from '@/app/models/SelecaoIndicador';

if (!AppDataSource.isInitialized) {
    try {
        await AppDataSource.initialize();
    } catch (err) {
        console.error(`### SELECAOINDICADOR: Data Source initialization error`, err);
    }
}

export const SelecaoIndicadorRepository = AppDataSource.manager.getRepository(SelecaoIndicador);
*/