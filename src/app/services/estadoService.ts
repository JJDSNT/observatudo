import { Estado } from '../models/Estado';
import { EstadoRepository } from '../repositories/EstadoRepository';

export class EstadoService {
  //private estadoRepository: EstadoRepository;

  constructor() {
    //this.estadoRepository = new EstadoRepository(Estado);
  }

  public adicionarEstado(estado: Estado): void {
    //this.estadoRepository.adicionarEstado(estado);
  }

  public async getEstados(): Promise<Estado|Estado[]|null> {
    //return this.estadoRepository.getEstados();
    console.log('getestados services');
    let estados = await EstadoRepository.find();
    return estados;
  }
/*
  public async buscarEstadoPorUF(uf: string): Promise<Estado | undefined> {
    const estados = await this.estadoRepository.getEstados();
    return estados.find((estado) => estado.uf === uf);
  }

  async getCidadesPorEstado(estadoId: number): Promise<Cidade[]> {
    return this.connection.getRepository(Cidade).find({ where: { estado: { id: estadoId } } });
  }

  public async getCidadesByEstado(estadoId: number): Promise<Cidade[] | null> {
    const estado = await this.estadoRepository.getEstadoById(estadoId);
    if (estado) {
      return estado.getCidades();
    }
    return null;
  }
*/
}
