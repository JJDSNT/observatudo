import { Container } from 'typedi';
import { StorageService } from '@/app/services/storageService';

export async function GET() {
    const storageService = new StorageService();
    try {
        const bucketName = 'raw-sources';
        //const objects = await storageService.listObjects(bucketName);
        return Response.json({ "oi" });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return Response.json({ message: error.message }, { status: 500 });
        }
        return Response.json({ message: "Unknown error occurred" }, { status: 500 });
    }
}
