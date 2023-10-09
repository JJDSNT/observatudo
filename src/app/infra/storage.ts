//Importe as bibliotecas necessárias
//oci-common/lib/retrier 177: console.warn(`Request failed with Exception: ${JSON.stringify(lastKnownError)}\nRetrying request -> Total Attempts : ${waitContext.attemptCount}, Retrying after ${delayTime} seconds...`);
//https://github.com/oracle/oci-typescript-sdk/issues/165

import * as common from "oci-common";
import * as objectStorage from "oci-objectstorage";

const userId = process.env.OCI_USER_ID || '';
const tenancyId = process.env.OCI_TENANCY_ID || '';
const fingerprint = process.env.OCI_FINGERPRINT || '';
const privateKey = process.env.OCI_PRIVATE_KEY || '';
const regionId = process.env.OCI_REGION || '';
const region = common.Region.fromRegionId(regionId);


const authProvider = new common.SimpleAuthenticationDetailsProvider(
  tenancyId,
  userId,
  fingerprint,
  privateKey,
  null,
  region
);

let objectStorageClient: objectStorage.ObjectStorageClient;
try {
  objectStorageClient = new objectStorage.ObjectStorageClient({
    authenticationDetailsProvider: authProvider
  });
  //console.log("Cliente ObjectStorage criado com sucesso:", objectStorageClient);
  console.log(">>> Cliente object storage foi inicializado");
  //process.exit(1);
} catch (error) {
  console.error('>>> Storage: Erro durante a inicialização:', error);
  console.log('>>> Não consegui inicializar');
  process.exit(1);
}

//   namespaceName: config.get("tenancy"),

export { objectStorageClient };
