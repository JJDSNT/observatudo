import { AppDataSource } from '@/app/infra/database';
import { Localidade } from '@/app/models/Localidade';

if (!AppDataSource.isInitialized) {
    try {
        await AppDataSource.initialize();
    } catch (err) {
        console.error(`####LOCALIDADE: Data Source initialization error`, err);
    }
}
console.log("##########LOCALIDADES peguei o repositorio");
export const LocalidadeRepository = AppDataSource.manager.getRepository(Localidade);