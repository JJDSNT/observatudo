
export async function GET() {
    return Response.json({ message: 'Para popular dados dos indicadores descomente essa rota!' });
}
/*
import { classifyindicador } from "@/app/controllers/ClassifyIndicadorContoller";

export async function GET() {
    try {
        await classifyindicador();
        return Response.json({ message: 'Indicadores classificados com sucesso!' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return Response.json({ message: error.message }, { status: 500 });
        }
        return Response.json({ message: "Unknown error occurred" }, { status: 500 });
    }
}
*/
