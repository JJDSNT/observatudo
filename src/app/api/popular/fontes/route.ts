
export async function GET() {
    return Response.json({ message: 'Para popular dados dos indicadores descomente essa rota!' });
}
/*
import { addFonte } from "@/app/controllers/data/AddFonte";

export async function GET() {
    try {
        await addFonte();
        return Response.json({ message: 'Indicadores atualizados com sucesso!' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return Response.json({ message: error.message }, { status: 500 });
        }
        return Response.json({ message: "Unknown error occurred" }, { status: 500 });
    }
}

*/