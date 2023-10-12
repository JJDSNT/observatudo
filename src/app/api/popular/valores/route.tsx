
export async function GET() {
    return Response.json({ message: 'Para popular dados dos indicadores descomente essa rota!' });
}
/*
import { populateValoresIndicador } from "@/app/controllers/data/ParseValoresController";

export async function GET() {
    try {
        await populateValoresIndicador();
        return Response.json({ message: 'Indicadores atualizados com sucesso!' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return Response.json({ message: error.message }, { status: 500 });
        }
        return Response.json({ message: "Unknown error occurred" }, { status: 500 });
    }
}

*/