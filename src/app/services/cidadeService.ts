import { Cidade } from '../models/Cidade';
import { CidadeRepository } from '../repositories/cidadeRepository';

export class CidadeService {
  private cidadeRepository: CidadeRepository;

  constructor() {
    this.cidadeRepository = new CidadeRepository();
  }

  public async getCidades(estadoId: number): Promise<Cidade[] | null> {
    return this.cidadeRepository.getCidadesByEstado(estadoId);
  }

  public async getCidadeByIBGE(estadoId: number): Promise<Cidade[] | null> {
    return this.cidadeRepository.getCidadesByEstado(estadoId);
  }

  public async getCidadesByEstado(estadoId: number): Promise<Cidade[] | null> {
    return this.cidadeRepository.getCidadesByEstado(estadoId);
  }
}
