import { Service } from 'typedi';
import { In, Repository } from 'typeorm';


import { Indicador } from "@/app/models/Indicador";
import { IndicadorRepository } from "@/app/repositories/IndicadorRepository"

@Service()
export class IndicadorService {

  private indicadorRepository: Repository<Indicador> = IndicadorRepository;

  constructor() { }

  

  async buscarTodosIndicadores(): Promise<Indicador[]> {
    console.log("########Indicador service");
    return await this.indicadorRepository.find(
      {
        //relations: ['eixos'],
        //loadRelationIds: true,
      }
    );
  }

/*
  async buscarIndicadoresPorEixo(eixoId: number): Promise<Indicador[]> {
    return await this.indicadorRepository.createQueryBuilder("indicador")
      .leftJoin("indicador.eixos", "eixo")
      .where("eixo.id = :eixoId", { eixoId })
      .getMany();
  }

  async listarIndicadoresAgrupadosPorEixo() {
    const indicadores = await this.indicadorRepository
      .createQueryBuilder('indicador')
      .leftJoinAndSelect('indicador.eixo', 'eixo')
      .select('eixo.nome', 'nomeEixo')
      .addSelect('COUNT(indicador.id)', 'totalIndicadores')
      .groupBy('eixo.nome')
      .getRawMany();
  
    return indicadores;
  }

// IndicadorService

async buscarIndicadoresComValoresPorEixo(localidadeId: number): Promise<any[]> {
  return await this.indicadorRepository.createQueryBuilder("indicador")
    .leftJoinAndSelect("indicador.eixos", "eixo")
    .leftJoinAndSelect("indicador.valoresIndicador", "valorIndicador", "valorIndicador.localidadeId = :localidadeId", { localidadeId })
    .orderBy("eixo.id")
    .getMany();
}


  async criarIndicador(nome: string, descricao: string, eixos: number[]): Promise<Indicador> {
    const indicador = new Indicador();
    indicador.nome = nome;
    indicador.descricao = descricao;
    indicador.eixos = eixos;

    return await this.indicadorRepository.save(indicador);
  }

  async buscarIndicadorPorId(id: number): Promise<Indicador | undefined> {
    return await this.indicadorRepository.findOne(id);
  }



  async atualizarIndicador(id: number, nome?: string, descricao?: string, eixos?: number[]): Promise<Indicador | undefined> {
    const indicador = await this.indicadorRepository.findOne(id);
    if (!indicador) {
      return undefined;
    }

    if (nome) {
      indicador.nome = nome;
    }

    if (descricao) {
      indicador.descricao = descricao;
    }

    if (eixos) {
      indicador.eixos = eixos;
    }

    return await this.indicadorRepository.save(indicador);
  }

  async excluirIndicador(id: number): Promise<boolean> {
    const indicador = await this.indicadorRepository.findOne(id);
    if (!indicador) {
      return false;
    }

    await this.indicadorRepository.remove(indicador);
    return true;
  }
*/
}

