/*
export async function GET() {
    return Response.json({ message: 'Para popular dados dos indicadores descomente essa rota!' });
}
*/
import { populateIndicadoresDatabase } from "@/app/controllers/data/ParseCSustentaveisIndicadoresCSV";

export async function GET() {
    try {
        await populateIndicadoresDatabase();
        return Response.json({ message: 'Indicadores criados com sucesso!' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return Response.json({ message: error.message }, { status: 500 });
        }
        return Response.json({ message: "Unknown error occurred" }, { status: 500 });
    }
}

