import IndicadorController from "@/app/controllers/IndicadorController";
import { Container } from "typedi";

export async function GET() {
  try {
    const indicadorController = Container.get(IndicadorController);
    const indicadores = await indicadorController.buscarTodosIndicadores();
    return Response.json({ indicadores });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json({ message: error.message }, { status: 500 });
    }
    return Response.json({ message: "Unknown error occurred" }, { status: 500 });
  }
}
