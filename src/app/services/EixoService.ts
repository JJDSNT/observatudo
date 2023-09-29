import { Service } from 'typedi';
import { In, Repository } from 'typeorm';

import { Eixo } from '@/app/models/Eixo';
import { EixoRepository } from '@/app/repositories/EixoRepository';

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

}