import { Container } from "typedi";
import IndicadorController from "@/app/controllers/IndicadorController";

export async function GET() {
  try {
    const indicadorController = Container.get(IndicadorController);
    console.log('teste');
    const indicadores = await indicadorController.buscarTodosIndicadores();
    console.log('indicador final')
    return Response.json({ indicadores });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json({ message: error.message }, { status: 500 });
    }
    return Response.json({ message: "Unknown error occurred" }, { status: 500 });
  }
}
