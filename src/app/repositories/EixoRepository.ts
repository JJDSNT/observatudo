import { AppDataSource } from '@/app/infra/database';
import { Eixo } from '@/app/models/Eixo';
import { EixoPadrao } from '../models/EixoPadrao';
import { EixoUsuario } from '../models/EixoUsuario';

if (!AppDataSource.isInitialized) {
    try {
        await AppDataSource.initialize();
    } catch (err) {
        console.error(`#####EIXO: Data Source initialization error`, err);
    }
}

export const EixoRepository = AppDataSource.manager.getRepository(Eixo);
export const EixoPadraoRepository = AppDataSource.manager.getRepository(EixoPadrao);
export const EixoUsuarioRepository = AppDataSource.manager.getRepository(EixoUsuario);

//adicionar funcão auxilia para lida como mutiplas entidades?