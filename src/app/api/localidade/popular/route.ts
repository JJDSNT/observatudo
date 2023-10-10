import { populateIBGEDatabase } from "@/app/controllers/ParseIBGECSVController";

export async function GET() {
    try {
        await populateIBGEDatabase();
        return Response.json({ message: 'Dados do IBGE populados com sucesso!' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return Response.json({ message: error.message }, { status: 500 });
        }
        return Response.json({ message: "Unknown error occurred" }, { status: 500 });
    }
}

