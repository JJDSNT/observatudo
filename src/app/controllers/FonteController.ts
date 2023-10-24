import { Service } from 'typedi';
import { Fonte} from '@/app/models/Fonte';
import { FonteService } from '@/app/services/FonteService';



@Service()
export class FonteController {
  private fonteService: FonteService;

  constructor() {
    this.fonteService = new FonteService();
  }

  public async getFontes(): Promise<Fonte[] | null> {
    return this.fonteService.getFontes();
  }
/*
  public async getFontesComIndicadores(): Promise<Fonte[] | null> {
    return this.fonteService.getFontesComIndicadores();
  }
*/
}