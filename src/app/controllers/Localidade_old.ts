import { Localidade } from '../models/Localidade';
import { Estado } from '../models/Estado';
import { Cidade } from '../models/Cidade';

//os controllers deverao ser implementados nas rotas da API, que chamarão os services que chamarão os repositorios.

class LocalidadeController {

  private estados: Estado[];


  constructor() {
    this.estados = [];
  }

  public adicionarEstado(estado: Estado): void {
    this.estados.push(estado);
  }

  static getLocalidadeById(id: number): Localidade | null {
    // Implemente aqui a lógica para obter um objeto Ibge pelo ID
    // Retorna o objeto Ibge encontrado ou null se não encontrado
    return null;
  }

  public getEstadoById(estadoId: number): Estado | null {
    return this.estados.find((estado: Estado) => estado.id === estadoId) || null;
  }

  static getCidadeById(id: number): Cidade | null {
    // Implemente aqui a lógica para obter um objeto Cidade pelo ID
    // Retorna o objeto Cidade encontrado ou null se não encontrado
    return null;
  }

  public getCidadesByEstado(estadoId: number): Cidade[] | null {
    // Implemente aqui a lógica para obter um objeto Cidade pelo ID
    // Retorna o objeto Cidade encontrado ou null se não encontrado
    // @ts-expect-error
    return this.getEstadoById(estadoId)?.getCidades();



  }


  public getEstados(): Estado[] | null {
    this.estados.forEach(estado=>{
      // @ts-expect-error
      delete estado.cidades;
    });
    return this.estados;
    //isso vai alterar o objeto da memoria, vai ficar sem as cidades
  }


  public listarEstados(): Estado[] {
    this.estados.forEach(estado=>{
      // @ts-expect-error
      delete estado.cidades;
    });
    return this.estados;
  }

}

export { LocalidadeController };
