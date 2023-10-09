//https://stackoverflow.com/questions/39861239/read-and-parse-csv-file-in-s3-without-downloading-the-entire-file#39861758
import { Readable } from 'stream';
import * as fastcsv from 'fast-csv';
import { Localidade } from "../models/Localidade";
import { Estado } from "../models/Estado";
import { Cidade } from "../models/Cidade";
import { AppDataSource } from "@/app/infra/database";

export async function parseCSVFromObjectStream(this: any, bucketName: string, objectName: string): Promise<void> {
  const response = await this.objectStorageClient.getObject({
    bucketName: bucketName,
    namespaceName: 'teste',
    objectName: objectName
  });

  const csvReadStream = Readable.from([response.value.toString()]);

  const parser = fastcsv.parse({ headers: true });
  const batchSize = 100; // Tamanho do lote (quantidade de objetos a serem salvos de cada vez)
  const buffer: Localidade[] = [];

  parser
    .on("data", async (data) => {
      // Criar objetos à medida que os dados do CSV são lidos
      const localidade = new Localidade(data.id, data.nome);
      const estado = new Estado(data.id, data.nome, data.sigla);
      const cidade = new Cidade(data.id, data.nome);

      // Adicione os objetos ao buffer
      buffer.push(localidade, estado, cidade);

      // Verifique se o buffer atingiu o tamanho do lote
      if (buffer.length >= batchSize) {
        await saveBatchToDatabase(buffer);
      }
    })
    .on("end", async () => {
      // Salve qualquer objeto restante no buffer
      if (buffer.length > 0) {
        await saveBatchToDatabase(buffer);
      }

      console.log("Parse do CSV concluído com sucesso!");
    })
    .on("error", (error) => {
      console.error("Erro ao fazer o parse do CSV:", error);
    });

  csvReadStream.pipe(parser);
}

async function saveBatchToDatabase(batch: string | any[]) {
  try {
    // Salve o lote de objetos no banco de dados
    await AppDataSource.manager.save(batch);

    // Limpe o buffer após salvar no banco de dados
    batch = [];
  } catch (error) {
    console.error("Erro ao salvar lote no banco de dados:", error);
  }
}
