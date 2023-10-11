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

  public async getEstadosECidades(): Promise<Estado[] | null> {
    const estados = await this.localidadeService.getEstadosECidades();

    if (estados) {
      estados.forEach(estado => {
        // Ordena as cidades em ordem alfabética pelo nome
        if (estado.cidades) {
          estado.cidades.sort((a, b) => a.nome.localeCompare(b.nome));
        }
        // Encontre a capital do estado selecionado
        //const capitalCidade = estado.capital;
        // Reorganize a lista de cidades para começar com a capital do estado
        //estado.cidades = [capitalCidade, ...estado.cidades.filter(cidade => cidade !== capitalCidade)];
      });
      // Ordena os estados em ordem alfabética pelo nome
      estados.sort((a, b) => a.nome.localeCompare(b.nome));
    }

    return estados;
  }



  /*
    public async getIndicadoresPorLocalidade(): Promise<Localidade[] | null> {
      return this.localidadeService.getIndicadoresPorLocalidade2();
    }
  */
}
