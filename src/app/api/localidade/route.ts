import { Container } from 'typedi';

import { closeDatabase } from "@/app/infra/database"
import { LocalidadeController } from "@/app/controllers/LocalidadeController";

export async function GET() {

  try {
    console.log("########LOCALIDADE Route START");
    const localidadeController = Container.get(LocalidadeController);
    const estados = await localidadeController.getEstadosECidades();
    console.log("########LOCALIDADE Route RETORNA");
    return Response.json({ estados });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json({ message: error.message }, { status: 500 });
    }
    return Response.json({ message: "Unknown error occurred" }, { status: 500 });
  }
}