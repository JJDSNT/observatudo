import { NextApiRequest, NextApiResponse } from 'next';

import { Service } from 'typedi';
import { Indicador } from '../models/Indicador';
import { IndicadorService } from "@/app/services/IndicadorService";


@Service()
export class IndicadorController {
  private indicadorService: IndicadorService;

  constructor() {
    this.indicadorService = new IndicadorService();
  }


  async buscarTodosIndicadores(_req: Request) {
    try {
      const indicadores = await this.indicadorService.buscarTodosIndicadores();
      return indicadores;
    } catch (error) {
      console.error("Erro ao buscar os indicadores:", error);
      return error;
    }
  }

  async listarIndicadoresAgrupadosPorEixo() {
    try {
      const indicadores = await this.indicadorService.listarIndicadoresAgrupadosPorEixo();
      return indicadores;
    } catch (error) {
      console.error("Erro ao buscar os indicadores:", error);
      return error;
    }
  }

  async listarIndicadores(request: NextApiRequest, response: NextApiResponse) {
    try {
      const indicadores = await this.indicadorService.buscarTodosIndicadores();
      return response.json(indicadores);
    } catch (error) {
      console.error("Erro ao buscar os indicadores:", error);
      return response.status(500).json({ message: "Erro ao buscar os indicadores" });
    }
  }

/*
  async listarIndicadoresPorEixo(req: Request, res: Response) {
    try {
      //const { eixoId } = req.params;
const eixoId = 1;
      const indicadores = await this.indicadorService.buscarIndicadoresPorEixo(Number(eixoId));

      if (indicadores.length === 0) {
        return res.status(404).json({ message: "Nenhum indicador encontrado para o eixo fornecido" });
      }

      return res.json(indicadores);
    } catch (error) {
      console.error("Erro ao buscar os indicadores por eixo:", error);
      return res.status(500).json({ message: "Erro ao buscar os indicadores por eixo" });
    }
  }


  async buscarIndicadoresComValoresPorEixo(req: Request, res: Response) {
    try {
      const { localidadeId } = req.params;

      const indicadores = await this.indicadorService.buscarIndicadoresComValoresPorEixo(Number(localidadeId));

      if (indicadores.length === 0) {
        return res.status(404).json({ message: "Nenhum indicador encontrado para a localidade fornecida" });
      }

      return res.json(indicadores);
    } catch (error) {
      console.error("Erro ao buscar os indicadores com valores por eixo:", error);
      return res.status(500).json({ message: "Erro ao buscar os indicadores com valores por eixo" });
    }
  }

  async criarIndicador(req: Request, res: Response) {
    try {
      const { nome, descricao, eixos } = req.body;

      const indicador = await this.indicadorService.criarIndicador(nome, descricao, eixos);

      return res.status(201).json(indicador);
    } catch (error) {
      console.error("Erro ao criar o indicador:", error);
      return res.status(500).json({ message: "Erro ao criar o indicador" });
    }
  }

  async buscarIndicadorPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const indicador = await this.indicadorService.buscarIndicadorPorId(Number(id));

      if (!indicador) {
        return res.status(404).json({ message: "Indicador não encontrado" });
      }

      return res.json(indicador);
    } catch (error) {
      console.error("Erro ao buscar o indicador:", error);
      return res.status(500).json({ message: "Erro ao buscar o indicador" });
    }
  }



  async atualizarIndicador(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, descricao, eixos } = req.body;

      const indicador = await this.indicadorService.atualizarIndicador(Number(id), nome, descricao, eixos);

      if (!indicador) {
        return res.status(404).json({ message: "Indicador não encontrado" });
      }

      return res.json(indicador);
    } catch (error) {
      console.error("Erro ao atualizar o indicador:", error);
      return res.status(500).json({ message: "Erro ao atualizar o indicador" });
    }
  }

  async excluirIndicador(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const isDeleted = await this.indicadorService.excluirIndicador(Number(id));

      if (!isDeleted) {
        return res.status(404).json({ message: "Indicador não encontrado" });
      }

      return res.json({ message: "Indicador excluído com sucesso" });
    } catch (error) {
      console.error("Erro ao excluir o indicador:", error);
      return res.status(500).json({ message: "Erro ao excluir o indicador" });
    }
  }

*/

}

export default IndicadorController;
