import { Container } from 'typedi';
import { EixoController } from "@/app/controllers/EixoController";

export async function GET() {
  try {
    const eixoController = Container.get(EixoController);
    const eixos = await eixoController.getEixosComIndicadores();
    return Response.json({ eixos });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json({ message: error.message }, { status: 500 });
    }
    return Response.json({ message: "Unknown error occurred" }, { status: 500 });
  }
}