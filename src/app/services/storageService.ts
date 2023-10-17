//https://stackoverflow.com/questions/39861239/read-and-parse-csv-file-in-s3-without-downloading-the-entire-file#39861758
//https://github.com/vercel/next.js/discussions/48324
import * as objectStorage from "oci-objectstorage";
import { OciError } from "oci-common";
import { objectStorageClient } from '@/app/infra/storage';
import csvtojson from 'csvtojson';
import * as fastcsv from "fast-csv";
import { Readable } from "stream";
import { error } from "console";

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
      console.error("Namespace não foi obtido com sucesso.");
      throw error("Namespace não foi obtido com sucesso.");
      //return [];
    }
    const getObjectRequest = {
      namespaceName: namespace,
      bucketName: bucketName,
      objectName: objectName
    };

    try {
      const response = await this.objectStorageClient.getObject(getObjectRequest);
      console.log(response);
      const csvData = await getObjectAsText(response);
      const jsonData = await new Promise<any[]>((resolve, reject) => {
        const data: any[] = [];
        fastcsv
          .parseString(csvData, { headers: true })
          .on('data', (row) => {
            data.push(row);
          })
          .on('end', () => {
            resolve(data);
          })
          .on('error', (error) => {
            reject(error);
          });
      });
      console.log("Dados do CSV em JSON:", jsonData);
    } catch (error) {
      console.error("Erro ao baixar objeto CSV:", error);
    }
  }



  public async parseCSVtoJSON(bucketName: string, objectName: string) {

    const namespace = await this.getBucketNamespace(bucketName);
    if (!namespace) {
      console.error("Namespace não foi obtido com sucesso.");
      return [];
    }
    const getObjectRequest = {
      namespaceName: namespace,
      bucketName: bucketName,
      objectName: objectName
    };

    try {
      const response = await this.objectStorageClient.getObject(getObjectRequest);
      // Obtém o conteúdo da stream como uma string
      const csvData = await getObjectAsText(response);
      // Faz o parse do CSV usando fast-csv
      const jsonData = await new Promise<any[]>((resolve, reject) => {
        const data: any[] = [];
        fastcsv
          .parseString(csvData, { headers: true })
          .on('data', (row) => {
            data.push(row);
          })
          .on('end', () => {
            resolve(data);
          })
          .on('error', (error) => {
            reject(error);
          });
      });
      return jsonData;
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

async function getObjectAsText(response: any): Promise<string> {
  const reader = response.value.getReader();
  const chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  const buffer = Buffer.concat(chunks);
  return buffer.toString('utf-8');
}
