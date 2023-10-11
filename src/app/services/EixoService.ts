import { Service } from 'typedi';
import { In, Repository } from 'typeorm';

import { Eixo } from '@/app/models/Eixo';
import { EixoRepository } from '@/app/repositories/EixoRepository';
import { Indicador } from '../models/Indicador';

@Service()
export class EixoService {

  private eixoRepository: Repository<Eixo> = EixoRepository;

  constructor() { }

  async getEixos(): Promise<Eixo[]> {
    return this.eixoRepository.find();
  }

  async getEixosComIndicadores(): Promise<Eixo[]> {
    return await this.eixoRepository.find(
      {
        relations: ['indicadores'],
      }
    );
  }

  public async getEixoById(eixoId: number): Promise<Eixo | null> {
    const eixo = await this.eixoRepository.findOneBy({ id: In([eixoId]) });
    return eixo;
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

  public async adicionarIndicadoresAoEixo(eixoId: number, indicadores: Indicador[]): Promise<void> {
    try {
      const opcoes = { where: { id: eixoId } };
      const eixo = await this.eixoRepository.findOne(opcoes);
      if (!eixo) {
        throw new Error('Eixo não encontrado');
      }
      eixo.indicadores = indicadores;
      await this.eixoRepository.save(eixo);
      console.log('Indicadores adicionados ao eixo com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar indicadores ao eixo:', error);
      throw error;
    }
  }


}