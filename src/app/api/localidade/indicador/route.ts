//import { NextApiRequest, NextApiResponse } from "next"; //depois olhar isso com mais calma
import { NextResponse } from "next/server";
import { Container } from 'typedi';
import { LocalidadeController } from "@/app/controllers/LocalidadeController";

export async function GET(): Promise<NextResponse> {
  try {
    const localidadeController = Container.get(LocalidadeController);
    const localidades = await localidadeController.getIndicadoresPorLocalidade();
    return NextResponse.json({ localidades });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Unknown error occurred" }, { status: 500 });
  }
}