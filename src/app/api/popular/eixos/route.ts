import { getServerSession } from "next-auth"
import { createEixos } from "@/app/controllers/data/CreateEixosController";
/*
export async function GET() {
    return Response.json({ message: 'Para popular os eixos voce precisa estar logado como administrador!' });
}
*/
export async function GET() {

    const session = await getServerSession();
    if (!session || !session.user) {
        return Response.json({ message: 'Para popular os eixos voce precisa estar logado como administrador!' });
    }


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

