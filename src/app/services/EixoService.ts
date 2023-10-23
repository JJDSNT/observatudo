import { Service } from 'typedi';
import { In, Repository } from 'typeorm';
import { AppDataSource } from "@/app/infra/database";
import { Eixo } from '@/app/models/Eixo';
import { EixoRepository, EixoPadraoRepository, EixoUsuarioRepository } from '@/app/repositories/EixoRepository';
import { Indicador } from '@/app/models/Indicador';
import { EixoPadrao } from '@/app/models/EixoPadrao';
import { EixoUsuario } from '@/app/models/EixoUsuario';


if (!AppDataSource.isInitialized) {
  try {
      await AppDataSource.initialize();
      console.log("Data Source initialized!");
  } catch (err) {
      console.error(`### EixoService: POPULATING INDICADORES: Data Source initialization error`, err);
  }
}

@Service()
export class EixoService {

  private eixoRepository: Repository<Eixo> = EixoRepository;
  private eixoPadraoRepository: Repository<EixoPadrao> = EixoPadraoRepository;
  private eixoUsuarioRepository: Repository<EixoUsuario> = EixoUsuarioRepository;

  constructor() { }

  async getEixos(): Promise<Eixo[]> {
    return this.eixoRepository.find();
  }

  async getEixosPadrao(): Promise<EixoPadrao[]> {
    return this.eixoPadraoRepository.find({
      relations: ['indicador','eixo']
    });
  }

  async teste(): Promise<Eixo[]> {
    return this.eixoRepository.find({
      relations: ['eixoPadrao', 'eixoPadrao.indicador','eixoPadrao.indicador.valoresIndicador']
    });
  }


  async getEixosComIndicadores(): Promise<Eixo[]> {
    const eixos = await this.eixoRepository.find({
      relations: ['indicadores', "indicadores.valoresIndicador", "indicadores.valoresIndicador.localidade"] 
      //, 'indicadoresPadrao', 'indicadoresUsuario'
    });
  
    return eixos;
  }

//se não existir eixo usuario retorna o eixo padrao

//ao adicionar indicador ao eixo usuario
//checar se existe o usuario no banco, se não existe, criar
//checar se existe eixousuario, se não exisitir criar copiando o eixopadrao

  async getEixosComIndicadoresOld(): Promise<Eixo[]> {
    return await this.eixoRepository.find(
      {
        relations: ['indicadores', "indicadores.valoresIndicador", "indicadores.valoresIndicador.localidade"],
      }
    );
  }




  public async getEixoById(eixoId: number): Promise<Eixo | null> {
    const eixo = await this.eixoRepository.findOneBy({ id: In([eixoId]) });
    return eixo;
  }

/*  
  public async adicionarIndicadoresAoEixoPadrao(eixoId: number, indicadores: Indicador[]): Promise<void> {
    //const eixoRepository = AppDataSource.getRepository(Eixo);
    //const eixoPadraoRepository = AppDataSource.getRepository(EixoPadrao);
  
    const eixo = await this.eixoRepository.findOneBy({ id: In([eixoId]) });;
  
    if (!eixo) {
      throw new Error('Eixo não encontrado');
    }
  

    for (const indicador of indicadores) {
      const eixoPadrao = new EixoPadrao();
      eixoPadrao.eixo = eixo as unknown as Eixo;
      eixoPadrao.indicadores = [indicador];
      console.log(JSON.stringify(eixo)+ " e AQUI!?!? "+ JSON.stringify(indicador));
      // Salvar EixoPadrao
      await this.eixoPadraoRepository.save(eixoPadrao);
      console.log ('adicionado ?');
    }

  }
*/
  public async getEntityById(entityId: number, entityType: 'eixo' | 'eixoPadrao' | 'eixoUsuario'): Promise<Eixo | EixoPadrao | EixoUsuario | null> {
    let entityRepository;
    switch (entityType) {
      case 'eixo':
        entityRepository = await AppDataSource.getRepository(Eixo);
        break;
      case 'eixoPadrao':
        entityRepository = await AppDataSource.getRepository(EixoPadrao);
        break;
      case 'eixoUsuario':
        entityRepository = await AppDataSource.getRepository(EixoUsuario);
        break;
      default:
        throw new Error('Tipo de entidade não reconhecido.');
    }
    const entity = await entityRepository!.findOne({ where: { id: entityId } });
    return entity;
  }
  
  public async createEixos(eixosData: Eixo[]): Promise<void> {
    try {
      eixosData.sort((a, b) => a.id - b.id);
      await this.eixoRepository.save(eixosData);
      console.log('Eixos criados com sucesso!');
    } catch (error) {
      console.error('Erro ao criar eixos:', error);
      throw error;
    }
  }

  //não apagar (referencia que funciona)
  public async adicionarIndicadoresAoEixo(eixoId: number, indicadores: Indicador[]): Promise<void> {
    try {
      const eixo = await this.eixoRepository.findOne({
        where: { id: eixoId },
        relations: ['indicadores'],
      });

      if (!eixo) {
        throw new Error('Eixo não encontrado');
      }
      if (!eixo.indicadores) {
        eixo.indicadores = [];
      }
      eixo.indicadores.push(...indicadores);
      await this.eixoRepository.save(eixo);
      console.log('Indicadores adicionados ao eixo com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar indicadores ao eixo:', error);
      throw error;
    }
  }

}