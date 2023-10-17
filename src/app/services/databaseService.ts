import { AppDataSource } from "@/app/infra/database";
import { QueryRunner } from "typeorm";

const defaultBatchSize = 100; // Tamanho padrão do lote

if (!AppDataSource.isInitialized) {
    try {
        await AppDataSource.initialize();
        console.log("Data Source initialized!");
    } catch (err) {
        console.error(`### POPULATING INDICADORES: Data Source initialization error`, err);
    }
}

async function insertDataInBatches(data: any[], entity: any, selectedBatchSize?: number): Promise<void> {

    const batchSize = selectedBatchSize || defaultBatchSize;
    const totalRecords = data.length;
    console.log('total: ' + totalRecords);

    for (let startIndex = 0; startIndex < totalRecords; startIndex += batchSize) {
        const endIndex = Math.min(startIndex + batchSize, totalRecords);
        const batch = data.slice(startIndex, endIndex);

        const connection = AppDataSource.manager.connection;
        const queryRunner = connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Executar a consulta de inserção para o lote atual
            console.log("Gravando...");
            await queryRunner.manager.save(entity, batch);
            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}
