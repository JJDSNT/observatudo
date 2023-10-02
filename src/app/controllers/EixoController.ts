import { Service } from 'typedi';
import { Eixo} from '@/app/models/Eixo';
import { EixoService } from '@/app/services/EixoService';


@Service()
export class EixoController {
  private eixoService: EixoService;

  constructor() {
    this.eixoService = new EixoService();
  }

  public async getEixos(): Promise<Eixo[] | null> {
    return this.eixoService.getEixos();
  }
/*
  public async getEixosComIndicadores(): Promise<Eixo[] | null> {
    return this.eixoService.getEixosComIndicadores();
  }
*/
}