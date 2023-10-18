import { Service } from 'typedi';
import { Eixo} from '@/app/models/Eixo';
import { EixoService } from '@/app/services/EixoService';
import { EixoPadrao } from '../models/EixoPadrao';


@Service()
export class EixoController {
  private eixoService: EixoService;

  constructor() {
    this.eixoService = new EixoService();
  }

  public async getEixos(): Promise<Eixo[] | null> {
    return this.eixoService.getEixos();
  }
  public async teste(): Promise<Eixo[] | null>{
    return this.eixoService.teste();
  }

  public async getEixosPadrao(): Promise<EixoPadrao[] | null>{
    return this.eixoService.getEixosPadrao();
  }

  public async getEixosComIndicadoresEValores(): Promise<Eixo[] | null> {
    return null //this.eixoService.getEixosComIndicadoresEValores();
  }


  public async getEixosComIndicadores(): Promise<Eixo[] | null> {
    return this.eixoService.getEixosComIndicadores();
  }

}