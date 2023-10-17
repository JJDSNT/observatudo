import { AppDataSource } from '@/app/infra/database';
import { Usuario } from '@/app/models/Usuario';

if (!AppDataSource.isInitialized) {
    try {
        await AppDataSource.initialize();
    } catch (err) {
        console.error(`### USUARIO: Data Source initialization error`, err);
    }
}

export const UsuarioRepository = AppDataSource.manager.getRepository(Usuario);