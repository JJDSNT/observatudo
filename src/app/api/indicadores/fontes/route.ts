import { Container } from 'typedi';
import { FonteController } from "@/app/controllers/FonteController";

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection:', reason);
  // Faça o que for necessário com a promessa não tratada, como registrar ou realizar alguma ação específica.
});

export async function GET() {
  try {
    const fonteController = Container.get(FonteController);
    const fontes = await fonteController.getFontes();
    return Response.json({ fontes });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json({ message: error.message }, { status: 500 });
    }
    return Response.json({ message: "Unknown error occurred" }, { status: 500 });
  }
}