import { AppDataSource, initializeDatabase } from '@/app/infra/database';
import { Estado } from '@/app/models/Estado';

export async function GET() {

  initializeDatabase()//passar parametro de onde esta sendo chamado para log do erro

  try {
    const estados = await AppDataSource.manager.getRepository(Estado).find({
      relations: ["capital", "cidades"]
    });

    if (estados) {
      estados.forEach(estado => {
        // Ordena as cidades em ordem alfabética pelo nome
        if (estado.cidades) {
          estado.cidades.sort((a, b) => a.nome.localeCompare(b.nome));
        }
        // Encontre a capital do estado selecionado
        //const capitalCidade = estado.capital;
        // Reorganize a lista de cidades para começar com a capital do estado
        //estado.cidades = [capitalCidade, ...estado.cidades.filter(cidade => cidade !== capitalCidade)];
      });
      // Ordena os estados em ordem alfabética pelo nome
      estados.sort((a, b) => a.nome.localeCompare(b.nome));
    }
    return Response.json({ estados });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json({ message: error.message }, { status: 500 });
    }
    return Response.json({ message: "Unknown error occurred" }, { status: 500 });
  }
}