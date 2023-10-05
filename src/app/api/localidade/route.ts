import { Container } from 'typedi';
import { LocalidadeController } from "@/app/controllers/LocalidadeController";

export async function GET() {
  try {
    const localidadeController = Container.get(LocalidadeController);
    const localidades = await localidadeController.getEstadosECidades();
    return Response.json({ localidades });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json({ message: error.message }, { status: 500 });
    }
    return Response.json({ message: "Unknown error occurred" }, { status: 500 });
  }
}