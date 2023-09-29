import { Service } from 'typedi';
import { Localidade } from '@/app/models/Localidade';
import { Estado } from '@/app/models/Estado';
import { Cidade } from '@/app/models/Cidade';
import { LocalidadeService } from '../services/LocalidadeService';


@Service()
export class LocalidadeController {
  private localidadeService: LocalidadeService;

  constructor() {
    this.localidadeService = new LocalidadeService();
  }

  public async getEstadoById(estadoId: number): Promise<Estado | null> {
    return this.localidadeService.getEstadoById(estadoId);
  }

  public async getEstados(): Promise<Estado[] | null> {
    return this.localidadeService.getEstados();
  }

  public async getCidades(): Promise<Cidade[] | null> {
    return this.localidadeService.getCidades();
  }
/*
  public async getCidadesByEstado(estadoId?: number | undefined): Promise<Cidade[] | Cidade | null> {
    return this.localidadeService.getCidadesByEstado(estadoId);
  }
*/
  public async getEstadosECidades(): Promise<{ estado: Estado, cidades: Cidade[] }[] | null> {
    console.log('localidadeController: getestadosecidades')
    return this.localidadeService.getEstadosECidades();
  }
/*
  public async getIndicadoresPorLocalidade(): Promise<Localidade[] | null> {
    return this.localidadeService.getIndicadoresPorLocalidade2();
  }
*/
}
