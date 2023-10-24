import { Service } from 'typedi';
import { In, Repository } from 'typeorm';
import { Indicador } from "@/app/models/Indicador";
import { IndicadorRepository } from "@/app/repositories/IndicadorRepository"
import { AppDataSource } from '../infra/database';

if (!AppDataSource.isInitialized) {
  try {
      await AppDataSource.initialize();
      console.log("Data Source initialized!");
  } catch (err) {
      console.error(`### IndicadorService: Data Source initialization error`, err);
  }
}

@Service()
export class IndicadorService {

  private indicadorRepository: Repository<Indicador> = IndicadorRepository;

  constructor() { }

  async buscarTodosIndicadores(): Promise<Indicador[] | null> {
    const indicadores = await this.indicadorRepository.find({
      relations:['fonte']
    });
    return indicadores;
  }

  async buscarIndicadorPorId(cod: number): Promise<Indicador | null> {
    const indicador = await this.indicadorRepository.findOne({
      where: { id: cod },
      //relations: ['eixos'],
      //loadRelationIds: true,
    });
    return indicador;
  }


  /*

    async buscarTodosIndicadoresComEixo(): Promise<Indicador[] | null> {
    return await this.indicadorRepository.find(
      {
        relations: ['eixos'],
        //loadRelationIds: true,
      }
    );
  }




  async buscarIndicadorCompletoPorId(cod: number): Promise<Indicador | null> {
    const indicador = await this.indicadorRepository.findOne({
      where: { id: cod },
      relations: ['eixos'],
      //loadRelationIds: true,
    });
    return indicador;
  }

  public async adicionarIndicadoresAoEixo(indicador: Indicador,eixoId: number ): Promise<void> {
    try {
      const opcoes = { where: { indicador: i } };
      const indicador = await this.indicadorRepository.findOne(opcoes);
      if (!eixo) {
        throw new Error('Eixo não encontrado');
      }
      console.log(eixo);
      eixo.indicadores = indicadores;
      console.log(indicadores);
      await this.eixoRepository.save(eixo);
      console.log('Indicadores adicionados ao eixo com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar indicadores ao eixo:', error);
      throw error;
    }
  }
  
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

