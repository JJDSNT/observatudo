//testar leitura csv
import { Container } from 'typedi';
import { StorageService } from '@/app/services/storageService';

export async function GET() {
    const storageService = new StorageService();
    try {
        const bucketName = 'raw-sources';
        const objectName = 'ibge/municipios_c_capital.csv';
        //const object = await storageService.parseCSVFromObjectStream(bucketName, objectName);
        const object = await storageService.getObjectFromBucket(bucketName,objectName);
        return Response.json({ object });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return Response.json({ message: error.message }, { status: 500 });
        }
        return Response.json({ message: "Unknown error occurred" }, { status: 500 });
    }
}