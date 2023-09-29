import { Service } from 'typedi';
import { In, Repository } from 'typeorm';

import { Localidade } from '@/app/models/Localidade';
import { Estado } from '@/app/models/Estado';
import { Cidade } from '@/app/models/Cidade';
import { LocalidadeRepository } from '@/app/repositories/LocalidadeRepository';
import { ValorIndicador } from '@/app/models/ValorIndicador';
import { EstadoRepository } from '@/app/repositories/EstadoRepository';
import { CidadeRepository } from '@/app/repositories/CidadeRepository';



@Service()
export class LocalidadeService {

  private estadoRepository: Repository<Estado> = EstadoRepository;
  private cidadeRepository: Repository<Cidade> = CidadeRepository;
  private localidadeRepository: Repository<Localidade> = LocalidadeRepository;

  constructor() { }

  async getCidades(): Promise<Cidade[]> {
    return this.cidadeRepository.find();
  }

  public async getCidadeById(cidadeId: number): Promise<Cidade | null> {
    const cidade = await this.cidadeRepository.findOneBy({ codigo: In([cidadeId]) });
    return cidade;
  }

  async getEstados(): Promise<Estado[]> {
    return this.estadoRepository.find();
  }

  public async getEstadoById(estadoId: number | undefined): Promise<Estado | null> {
    const estado = await this.estadoRepository.findOneBy({ codigo: In([estadoId]) });
    return estado;
  }


  public async getEstadosECidades(): Promise<{ estado: Estado, cidades: Cidade[] }[] | null> {
    const estados = await this.estadoRepository.find({
      relations: ["cidades"],
    });

    //console.log(estados);

    return estados.map(estado => ({
      estado,
      cidades: estado.cidades
    }));

  }



  public async getIndicadoresPorLocalidade() : Promise<Localidade[] | null> {
    const localidades = await this.localidadeRepository.find({
      relations: ["valoresIndicador.indicador","valoresIndicador"]
    });

    return localidades;
  }

  public async getIndicadoresPorLocalidade2(): Promise<any[]> {
    const localidades = await this.localidadeRepository.find({
      relations: ["valoresIndicador.indicador", "valoresIndicador"]
    });
  
    const result: any[] = [];
  
    for (const localidade of localidades) {
      const indicadoresMap = new Map<string, any>(); // Mapa para agrupar valores de indicador por código do indicador
  
      for (const valorIndicador of localidade.valoresIndicador) {
        const codigoIndicador = valorIndicador.indicador.codigo_indicador;
  
        if (indicadoresMap.has(codigoIndicador)) {
          indicadoresMap.get(codigoIndicador)!.dados.push({
            ano: valorIndicador.data, // Utilizar diretamente a propriedade getFullYear() do objeto Date
            valor: valorIndicador.valor
          });
        } else {
          const indicador = valorIndicador.indicador;
  
          indicadoresMap.set(codigoIndicador, {
            codigo_ibge: localidade.codigo_ibge,
            cidade: localidade.nome,
            estado: localidade.estado,
            eixo: indicador.eixo,
            indicador: indicador.nome,
            descricao_indicador: indicador.descricao,
            dados: [
              {
                ano: valorIndicador.data, // Utilizar diretamente a propriedade getFullYear() do objeto Date
                valor: valorIndicador.valor
              }
            ]
          });
        }
      }
  
      result.push(...indicadoresMap.values());
    }
  
    return result;
  }

  
  public async getCidadesByEstado(estadoId: number | undefined): Promise<Cidade[] | null> {
    const estado = await this.getEstadoById(estadoId);
    if (estado) {
      const estadoWithCidades = estado.getCidades();
      console.log(estadoWithCidades);
      return estadoWithCidades;
    }

    return null;

    const cidades = await this.estadoRepository.findOne(estadoId, { relations: ['cidades'] });
    if (!cidades) {
      return null; // Retorna nulo se o estado não for encontrado
    }
    return cidades!.cidades;
  }


  public async adicionarEstado(estado: Estado): Promise<void> {
    await this.estadoRepository.create(estado);
  }



  public async getLocalidades(estadoId: number): Promise<Cidade[] | null> {
    return this.cidadeRepository.findByEstadoId(estadoId);
  }


  async criarEstado(codigo: number, nome: string, sigla: string): Promise<Estado> {
    const estado = new Estado(codigo, nome, sigla);
    return this.estadoRepository.save(estado);
  }

  async criarCidade(estado: Estado, codigo: number, nome: string): Promise<Cidade> {
    const cidade = new Cidade(estado, codigo, nome);
    return this.cidadeRepository.save(cidade);
  }

  async adicionarCidadeAoEstado(estado: Estado, cidade: Cidade): Promise<void> {
    estado.adicionarCidade(cidade);
    await this.estadoRepository.save(estado);
  }

  public async adicionarEstado(estado: Estado): Promise<void> {
    await this.estadoRepository.create(estado);
  }

  async obterEstadoPorCodigo(codigo: number): Promise<Estado | undefined> {
    return this.estadoRepository.findOne({ codigo });
  }

  async obterCidadePorCodigo(codigo: number): Promise<Cidade | undefined> {
    return this.cidadeRepository.findOne({ codigo });
  }

  public async buscarLocalidadePorIBGE(ibge: number): Promise<Estado | Cidade | null> {
    let localidade: Estado | Cidade | null = await this.estadoRepository.findByIBGE(ibge);
    if (!localidade) {
      localidade = await this.cidadeRepository.findByCodigo(ibge);
    }
    return localidade;
  }


}
