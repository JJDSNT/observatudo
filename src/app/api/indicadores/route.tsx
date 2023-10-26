import { AppDataSource, initializeDatabase } from '@/app/infra/database';
import { Indicador } from '@/app/models/Indicador';

export async function GET() {

  initializeDatabase('api/indicadores')//passar parametro de onde esta sendo chamado para log do erro

  try {
    const indicadores = await AppDataSource.manager.getRepository(Indicador).find({
      //relations:['fonte']
    });
    return Response.json({ indicadores });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json({ message: error.message }, { status: 500 });
    }
    return Response.json({ message: "Unknown error occurred" }, { status: 500 });
  }
}