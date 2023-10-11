import { Localidade } from "../models/Localidade";
import { Pais } from "@/app/models/Pais";
import { Estado } from "../models/Estado";
import { Cidade } from "../models/Cidade";
import { AppDataSource } from "@/app/infra/database";
import { StorageService } from "@/app/services/storageService";

const storageService = new StorageService();

export async function populateIBGEDatabase(): Promise<void> {
  const bucketName = 'raw-sources';
  const batchSize = 500;

  const jsonDataPaises = await storageService.parseCSVtoJSON(bucketName, 'ibge/pais.csv');
  const jsonDataEstados = await storageService.parseCSVtoJSON(bucketName, 'ibge/estados.csv');
  const jsonDataMunicipios = await storageService.parseCSVtoJSON(bucketName, 'ibge/municipios_c_capital.csv');

  const localidades: Localidade[] = [];
  const paises: Pais[] = [];
  const estados: Estado[] = [];
  const cidades: Cidade[] = [];

  if (!AppDataSource.isInitialized) {
    try {
      await AppDataSource.initialize();
      console.log("Data Source initialized!");
    } catch (err) {
      console.error(`#####POPULATING LOCALIDADES: Data Source initialization error`, err);
    }
  }

  if (jsonDataPaises) {
    jsonDataPaises.forEach((data) => {
      const pais = new Pais(data.codigo, data.nome, data.sigla);
      localidades.push(pais);
      paises.push(pais);
    });
  }

  if (jsonDataEstados) {
    jsonDataEstados.forEach((data) => {
      const estado = new Estado(data.COD, data.NOME, data.SIGLA);
      localidades.push(estado);
      estados.push(estado);
    });
  }

  if (jsonDataMunicipios) {
    jsonDataMunicipios.forEach((data) => {
      const estadoCorrespondente = estados.find((estado) => estado.codigo === data.codigo_uf);
      if (estadoCorrespondente) {
        const cidade = new Cidade(data.codigo_ibge, data.nome, data.capital);
        cidade.estado = estadoCorrespondente;
        localidades.push(cidade);
        cidades.push(cidade);
      }
    });
  }

  const cidadesCapitais = cidades.filter((cidade) => cidade.capital === true);
  const cidadesPorEstado = cidadesCapitais.reduce((map, cidade) => {
    if (!map.has(cidade.estado.codigo)) {
      map.set(cidade.estado.codigo, cidade);
    }
    return map;
  }, new Map<number, Cidade>());
  estados.forEach((estado) => {
    const cidadeCapital = cidadesPorEstado.get(estado.codigo);
    if (cidadeCapital) {
      estado.capital = cidadeCapital;
    }
  });

  // Verifique se Brasília já existe nas cidades capitais
  const brasiliaCodigo = 5300108;
  const brasilia = cidadesCapitais.find((cidade) => cidade.codigo === brasiliaCodigo);

  if (brasilia) {
    // Encontre o país Brasil no array de países
    const brasil = paises.find((pais) => pais.codigo === 1058 && pais.sigla === 'BR');

    if (brasil) {
      // Atualize a propriedade 'capitalCodigo' do Brasil com o código de Brasília
      brasil.capital = brasilia;
    }
  }

  // Ordenar alfabeticamente antes de salvar
  localidades.sort((a, b) => a.nome.localeCompare(b.nome));
  paises.sort((a, b) => a.nome.localeCompare(b.nome));
  estados.sort((a, b) => a.nome.localeCompare(b.nome));
  cidades.sort((a, b) => a.nome.localeCompare(b.nome));


  await insertDataInBatches(localidades, Localidade);
  console.log('Localidades populada');
  await insertDataInBatches(paises, Pais);
  console.log("Pais populado!");
  await insertDataInBatches(estados, Estado);
  console.log("Estado populado!");
  console.log("inserindo cidades");
  await insertDataInBatches(cidades, Cidade);
  console.log("Cidade populada!");



  async function insertDataInBatches(data: any[], entity: any): Promise<void> {
    const totalRecords = data.length;

    for (let startIndex = 0; startIndex < totalRecords; startIndex += batchSize) {
      const endIndex = Math.min(startIndex + batchSize, totalRecords);
      const batch = data.slice(startIndex, endIndex);

      const connection = AppDataSource.manager.connection;
      const queryRunner = connection.createQueryRunner();

      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        // Execute a consulta de inserção para o lote atual
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
/*
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
*/
