import * as objectStorage from "oci-objectstorage";
import { OciError } from "oci-common";
import { objectStorageClient } from '@/app/infra/storage';
import * as fastcsv from "fast-csv";
import { Readable } from "stream";

class StorageService {
  private objectStorageClient: objectStorage.ObjectStorageClient;

  constructor() {
    this.objectStorageClient = objectStorageClient;
  }

  public async listObjects(bucketName: string): Promise<objectStorage.models.ObjectSummary[]> {
    try {
      const namespace = await this.getBucketNamespace(bucketName);

      if (!namespace) {
        console.error("Namespace não foi obtido com sucesso.");
        return [];
      }

      const listObjectsRequest = {
        bucketName: bucketName,
        namespaceName: namespace
      };

      const response = await this.objectStorageClient.listObjects(listObjectsRequest);

      if (response && response.listObjects) {
        const listObjectsResponse = response.listObjects;

        if (listObjectsResponse.objects && listObjectsResponse.objects.length > 0) {
          return listObjectsResponse.objects;
        } else {
          return [];
        }
      } else {
        console.error("Resposta inválida do serviço Object Storage");
        return [];
      }
    } catch (error) {
      if (error instanceof OciError) {
        console.error("Erro ao fazer a solicitação:");
        console.error(`HTTP Status Code: ${error.statusCode}`);
        console.error(`Código de Serviço: ${error.serviceCode}`);
        console.error(`Mensagem: ${error.message}`);
        // Outros detalhes do erro, se necessário...
      } else {
        console.error("Erro desconhecido ao fazer a solicitação:", error);
      }
      console.error("Erro ao listar objetos:", error);
      return [];
    }
  }

  public async parseCSVFromObjectStream(bucketName: string, objectName: string): Promise<void> {
    const namespace = await this.getBucketNamespace(bucketName);
  
    if (!namespace) {
      throw new Error("Namespace não foi inicializado corretamente.");
    }
  
    const getObjectRequest = {
      bucketName: bucketName,
      namespaceName: namespace,
      objectName: objectName
    };
  
    try {
      const response = await this.objectStorageClient.getObject(getObjectRequest);
  
      console.log("Objeto CSV baixado com sucesso!");
  
      // Crie uma stream de leitura a partir do conteúdo do objeto
      const csvReadStream = Readable.from([response.value.toString()]); // Convertemos para string
  
      // Use o fast-csv para fazer o parse do CSV em stream
      const parser = fastcsv.parse({ headers: true });
  
      parser
        .on("data", (data) => {
          // Faça algo com cada linha de dados do CSV
          console.log("Dados do CSV:", data);
        })
        .on("end", () => {
          console.log("Parse do CSV concluído com sucesso!");
        })
        .on("error", (error) => {
          console.error("Erro ao fazer o parse do CSV:", error);
        });
  
      csvReadStream.pipe(parser); // Pipe a stream de leitura para o parser do CSV
    } catch (error) {
      console.error("Erro ao baixar objeto CSV:", error);
    }
  }

  async getBucketNamespace(bucketName: string): Promise<string | null> {
    try {
      const getNamespaceResponse = await this.objectStorageClient.getNamespace({});
      const namespace = getNamespaceResponse.value;
      return namespace;
    } catch (error) {
      console.error("Error while fetching bucket namespace:", error);
      return null;
    }
  }


}

export { StorageService };

