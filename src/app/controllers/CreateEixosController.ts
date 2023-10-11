import { Eixo, Eixos, eixosData } from "@/app/models/Eixo";
import { EixoService } from "@/app/services/EixoService";

const eixoService = new EixoService();

export async function createEixos(): Promise<void> {
    const eixos = eixosData.map(eixoData => {
        const eixo = new Eixo();
        eixo.id = eixoData.id;
        eixo.nome = eixoData.nome;
        eixo.nomeLegivel = eixoData.nomeLegivel;
        eixo.icon = eixoData.icon;
        eixo.cor = eixoData.cor;
        return eixo;
    });

    await eixoService.createEixos(eixos);
}