
export async function GET() {
    return Response.json({ message: 'Para popular os eixos descomente essa rota!' });
}

/*
import { createEixos } from "@/app/controllers/CreateEixosController";

export async function GET() {
    try {
        await createEixos();
        return Response.json({ message: 'Eixos criados com sucesso!' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return Response.json({ message: error.message }, { status: 500 });
        }
        return Response.json({ message: "Unknown error occurred" }, { status: 500 });
    }
}
*/
