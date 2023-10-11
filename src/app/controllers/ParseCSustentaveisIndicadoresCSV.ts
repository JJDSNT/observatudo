//https://github.com/vercel/next.js/discussions/48324
import { Localidade } from "../models/Localidade";
import { Pais } from "@/app/models/Pais";
import { Estado } from "../models/Estado";
import { Cidade } from "../models/Cidade";
import { Indicador } from "../models/Indicador";
import { Fonte } from "@/app/models/Fonte"
import { Eixo, Eixos } from "../models/Eixo";
import { ValorIndicador } from "../models/ValorIndicador";

import { AppDataSource } from "@/app/infra/database";
import { StorageService } from "@/app/services/storageService";

const storageService = new StorageService();

export async function populateIndicadoresDatabase(): Promise<void> {
    const bucketName = 'raw-sources';
    const batchSize = 500;

    const jsonDataIndicadores = await storageService.parseCSVtoJSON(bucketName, 'cidades_sustentaveis/indicadores.csv');

    // Criar fonte
    const fonte = new Fonte();
    fonte.nome = "Cidades sustentáveis - Indicadores";
    fonte.url = "https://www.cidadessustentaveis.org.br/inicial/home";



    if (!AppDataSource.isInitialized) {
        try {
            await AppDataSource.initialize();
            console.log("Data Source initialized!");
        } catch (err) {
            console.error(`#####POPULATING INDICADORES: Data Source initialization error`, err);
        }
    }

    if (jsonDataIndicadores) {
        // Create an empty array to store unique indicators
        const uniqueIndicadores = [];
      
        for (const data of jsonDataIndicadores) {
          const indicador = new Indicador(
            data["ID Indicador"],
            data["Nome do indicador"],
            data["Descrição do indicador"],
            fonte
          );
      
          // Check if an indicator with the same codigo_indicador already exists in uniqueIndicadores
          const existsIndex = uniqueIndicadores.findIndex(
            (uniqueIndicador) => uniqueIndicador.codigo_indicador === indicador.codigo_indicador
          );
      
          // If not found, add the indicator to the uniqueIndicadores array
          if (existsIndex === -1) {
            uniqueIndicadores.push(indicador);
          }
        }
        
        
        await insertDataInBatches(uniqueIndicadores, Indicador);
      }
      

    async function insertDataInBatches(data: any[], entity: any): Promise<void> {
        const totalRecords = data.length;
        console.log('total: '+totalRecords);
        for (let startIndex = 0; startIndex < totalRecords; startIndex += batchSize) {
            const endIndex = Math.min(startIndex + batchSize, totalRecords);
            const batch = data.slice(startIndex, endIndex);

            const connection = AppDataSource.manager.connection;
            const queryRunner = connection.createQueryRunner();

            await queryRunner.connect();
            await queryRunner.startTransaction();

            try {
                // Execute a consulta de inserção para o lote atual
                console.log(" gravando ");
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
}