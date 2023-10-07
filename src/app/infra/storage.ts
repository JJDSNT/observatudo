/* Importe as bibliotecas necessárias
import * as common from "oci-common";
import * as objectStorage from "oci-objectstorage";
import { Readable } from "stream";

const authProvider = new common.SimpleAuthenticationDetailsProvider(
    process.env.OCI_USER_ID,
    process.env.OCI_TENANCY_ID,
    process.env.OCI_REGION,
    process.env.OCI_PRIVATE_KEY,
    process.env.OCI_FINGERPRINT
  );

// Crie um cliente ObjectStorage
const objectStorageClient = new objectStorage.ObjectStorageClient({
  authenticationDetailsProvider: authProvider
});


// Defina o nome do seu bucket e o nome do objeto que você deseja acessar
const bucketName = "seu-bucket";
const objectName = "seu-objeto";

// Função para fazer upload de um objeto
async function uploadObject() {
  const putObjectRequest: objectStorage.models.PutObjectRequest = {
    bucketName: bucketName,
    namespaceName: config.get("tenancy"),
    objectName: objectName,
    putObjectBody: Readable.from("Conteúdo do objeto") // Substitua pelo conteúdo que você deseja fazer upload
  };

  try {
    const response = await objectStorageClient.putObject(putObjectRequest);
    console.log("Objeto carregado com sucesso:", response.etag);
  } catch (error) {
    console.error("Erro ao carregar objeto:", error);
  }
}

// Função para fazer o download de um objeto
async function downloadObject() {
  const getObjectRequest: objectStorage.models.GetObjectRequest = {
    bucketName: bucketName,
    namespaceName: config.get("tenancy"),
    objectName: objectName
  };

  try {
    const response = await objectStorageClient.getObject(getObjectRequest);
    console.log("Objeto baixado com sucesso:", response.status);

    // Você pode acessar o conteúdo do objeto no response.value
    // Por exemplo, se for um arquivo JSON: console.log(JSON.parse(response.value.toString()));
  } catch (error) {
    console.error("Erro ao baixar objeto:", error);
  }
}

// Chame as funções conforme necessário
// uploadObject();
// downloadObject();

export const config = config;
export const objectStorageClient = objectStorageClient;


Aws

const AWS = require("aws-sdk");

// Configuração das credenciais OCI Object Storage
const ociAccessKeyId = "seu_access_key_id";
const ociSecretAccessKey = "seu_secret_access_key";
const ociBucketName = "seu-bucket";
const ociRegion = "us-ashburn-1"; // Substitua pela sua região OCI

// Configuração do endpoint OCI Object Storage
const endpoint = new AWS.Endpoint(`https://objectstorage.${ociRegion}.oraclecloud.com`);
const s3 = new AWS.S3({
  endpoint: endpoint,
  accessKeyId: ociAccessKeyId,
  secretAccessKey: ociSecretAccessKey,
  signatureVersion: "v4", // Use a versão de assinatura v4
  s3ForcePathStyle: true // Força o uso de caminhos de estilo S3 (não subdomínio)
});

// Exemplo: Listar objetos no bucket OCI Object Storage
const listObjectsParams = {
  Bucket: ociBucketName
};

s3.listObjects(listObjectsParams, (err, data) => {
  if (err) {
    console.error("Erro ao listar objetos:", err);
  } else {
    console.log("Objetos no bucket:", data.Contents);
  }
});

// Outros métodos da API S3 (ex: getObject, putObject, deleteObject) podem ser usados da mesma maneira
*/