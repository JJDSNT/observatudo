//https://github.com/vercel/next.js/discussions/48324
import { Localidade } from "../../models/Localidade";
import { Pais } from "@/app/models/Pais";
import { Estado } from "../../models/Estado";
import { Cidade } from "../../models/Cidade";
import { Indicador } from "../../models/Indicador";
import { Fonte } from "@/app/models/Fonte"
import { Eixo, Eixos } from "../../models/Eixo";
import { ValorIndicador } from "../../models/ValorIndicador";

import { AppDataSource } from "@/app/infra/database";
import { StorageService } from "@/app/services/storageService";

const storageService = new StorageService();

export async function populateValoresIndicador(): Promise<void> {
    const bucketName = 'raw-sources';
    const batchSize = 100;

 // colocar uma mensagem de gravação concluida quando finalizar a gravação   
    
    
    const indicatorsToUpdate = [
        // Saúde (Health)
    
        { codigo_indicador: '4009', eixoId: 1 },
        { codigo_indicador: '125', eixoId: 1 },
//        { codigo_indicador: '3982', eixoId: 1 },
        { codigo_indicador: '4008', eixoId: 1 },
    
        // Educação (Education)
        { codigo_indicador: '4016', eixoId: 2 },
        { codigo_indicador: '4148', eixoId: 2 },
  //      { codigo_indicador: '5155', eixoId: 2 },
    //    { codigo_indicador: '27', eixoId: 2 },
        { codigo_indicador: '4022', eixoId: 2 },
    
        // Assistência Social (Social Assistance)
        { codigo_indicador: '3965', eixoId: 3 },
        { codigo_indicador: '3985', eixoId: 3 },
    
        // Segurança (Security)
        { codigo_indicador: '3900', eixoId: 4 },
    
        // Meio ambiente, urbanização e mobilidade (Environment, Urbanization, and Mobility)
        { codigo_indicador: '127', eixoId: 5 },
        { codigo_indicador: '5140', eixoId: 5 },
        { codigo_indicador: '3865', eixoId: 5 },
    
        // Economia & Finanças (Economy & Finance)
        { codigo_indicador: '23', eixoId: 6 },
    
        // Governança & Administração (Governança)
        { codigo_indicador: '4120', eixoId: 7 },
        { codigo_indicador: '3922', eixoId: 7 },
        { codigo_indicador: '4005', eixoId: 7 },
    ];
    
    
    
    
    
    const indicadoresDesejados = indicatorsToUpdate.map(indicador => indicador.codigo_indicador);

    
    //const indicadoresDesejados = ["3982", "5155", "27"];//vazio processará todos


    const jsonDataIndicadores = await storageService.parseCSVtoJSON(bucketName, 'cidades_sustentaveis/indicadores.csv');

    if (!AppDataSource.isInitialized) {
        try {
            await AppDataSource.initialize();
            console.log("Data Source initialized!");
        } catch (err) {
            console.error(`#####POPULATING VALORES INDICADORES: Data Source initialization error`, err);
        }
    }

    if (jsonDataIndicadores) {

        const filteredData = jsonDataIndicadores.filter((data) => indicadoresDesejados.includes(data["ID Indicador"]));

        filteredData.sort((a, b) => {
            if (a["ID Indicador"] !== b["ID Indicador"]) {
                return a["ID Indicador"].localeCompare(b["ID Indicador"]);
            } else {
                return a["Código IBGE"].localeCompare(b["Código IBGE"]);
            }
        });

        const valoresIndicador = filteredData.map((data) => {
            const valorIndicador = new ValorIndicador();
            valorIndicador.indicador = data["ID Indicador"];
            valorIndicador.localidade = data["Código IBGE"];
            valorIndicador.data = new Date(data["Ano de Preenchimento"]);
            valorIndicador.valor = parseFloat(data["Valor"]);

            // Certifique-se de que o valor seja um número válido
            const parsedValue = parseFloat(data["Valor"]);
            if (!isNaN(parsedValue)) {
                valorIndicador.valor = parsedValue;
            } else {
                // Se o valor não for numérico válido, você pode definir um valor padrão ou lidar com ele de outra forma.
                console.error(`Valor inválido para indicador ${valorIndicador.indicador}, localidade ${valorIndicador.localidade}`);
                // Por exemplo, você pode definir um valor padrão:
                valorIndicador.valor = 0;
            }

            return valorIndicador;
        });


        await insertDataInBatches(valoresIndicador, ValorIndicador);
    }

    async function insertDataInBatches(data: any[], entity: any): Promise<void> {
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
                // Execute a consulta de inserção para o lote atual
                console.log(" gravando ");
//                console.log(JSON.stringify(batch));
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
