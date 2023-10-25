import { Service } from 'typedi';
import { In, Repository } from 'typeorm';
import { AppDataSource } from "@/app/infra/database";
import { Fonte } from '@/app/models/Fonte';
import { FonteRepository } from '@/app/repositories/FonteRepository';
import { Indicador } from '@/app/models/Indicador';

if (!AppDataSource.isInitialized) {
  try {
      await AppDataSource.initialize();
      console.log("Data Source initialized!");
  } catch (err) {
      console.error(`### FonteService: Data Source initialization error`, err);
  }
}

@Service()
export class FonteService {

  private fonteRepository: Repository<Fonte> = FonteRepository;

  constructor() { }

  async getFontes(): Promise<Fonte[]> {
    return this.fonteRepository.find({
      relations: ['indicadores']
    });
  }

}  