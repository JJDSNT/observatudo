import { Cidade } from '@/app/models/Cidade';
import { CidadeRepository } from '@/app/repositories/CidadeRepository';

export class CidadeService {

  //private cidadeRepository: CidadeRepository;

  constructor() {
  //  this.cidadeRepository = new CidadeRepository();
  }

  public async getCidades(estadoId: number): Promise<Cidade[] | null> {
    //return this.cidadeRepository.getCidadesByEstado(estadoId);
    console.log('getcidades services');
    let cidades = await CidadeRepository.find();
    return cidades;
  }
/*
  public async getCidadeByIBGE(estadoId: number): Promise<Cidade[] | null> {
    return this.cidadeRepository.getCidadesByEstado(estadoId);
  }

  public async getCidadesByEstado(estadoId: number): Promise<Cidade[] | null> {
    return this.cidadeRepository.getCidadesByEstado(estadoId);
  }
*/  
}
