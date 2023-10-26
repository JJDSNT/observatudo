import { AppDataSource, initializeDatabase } from '@/app/infra/database';
import { Fonte } from '@/app/models/Fonte';

export async function GET() {

  initializeDatabase()//passar parametro de onde esta sendo chamado para log do erro

  try {
    const fontes = await AppDataSource.manager.getRepository(Fonte).find({
      relations: ['indicadores']
    });
    return Response.json({ fontes });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json({ message: error.message }, { status: 500 });
    }
    return Response.json({ message: "Unknown error occurred" }, { status: 500 });
  }
}