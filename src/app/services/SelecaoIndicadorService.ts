import { Service } from 'typedi';
import { In, Repository } from 'typeorm';


import { Usuario } from '@/app/models/Usuario';
import { UsuarioRepository } from '@/app/repositories/UsuarioRepository';
import { Eixo } from '@/app/models/Eixo';
import { EixoRepository } from '@/app/repositories/EixoRepository';
import { Indicador } from '../models/Indicador';
import { IndicadorRepository } from '@/app/repositories/IndicadorRepository';
//import { SelecaoIndicador } from '@/app/models/SelecaoIndicador'
//import { SelecaoIndicadorRepository } from '@/app/repositories/SelecaoIndicador';
import { LocalidadeRepository } from '../repositories/LocalidadeRepository';



@Service()
export class SelecaoIndicadorService {

    private usuarioRepository: Repository<Usuario> = UsuarioRepository;
    private eixoRepository: Repository<Eixo> = EixoRepository;
    private indicadorRepository: Repository<Indicador> = IndicadorRepository;
  //  private selecaoIndicadorRepository: Repository<SelecaoIndicador> = SelecaoIndicadorRepository;


    constructor() { }

    async getEixosComIndicadores(): Promise<Eixo[]> {
        return await this.eixoRepository.find(
          {
            relations: ['indicadores', "indicadores.valoresIndicador", "indicadores.valoresIndicador.localidade"],
          }
        );
      }
    


    async getEixosComIndicadoresDoUsuario(userId: number): Promise<Eixo[]> {
        try {
            const usuario = await this.usuarioRepository.findOne({
                where: { id: userId },
                relations: ['selecaoIndicadores', 'selecaoIndicadores.eixo', 'selecaoIndicadores.indicador'],
            });

            if (!usuario) {
                throw new Error('Usuário não encontrado');
            }

            const eixos: Eixo[] = [];
/*
            for (const selecaoIndicador of usuario.selecaoIndicadores) {
                const eixo = selecaoIndicador.eixo;
                const indicador = selecaoIndicador.indicador;
                if (eixo) {
                    if (!eixos.find((existingEixo) => existingEixo.id === eixo.id)) {
                        eixos.push(eixo);
                    }
                    if (!eixo.indicadores) {
                        eixo.indicadores = [];
                    }
                    if (indicador) {
                        eixo.indicadores.push(indicador);
                    }
                }
            }
*/
            return eixos;
        } catch (error) {
            console.error('Erro ao obter os eixos com os indicadores do usuário:', error);
            throw error;
        }
    }

    //esse deve mesclar os indicadores padrões com os do usuario
/*    async getEixosPadraoComIndicadoresDoUsuario(userId: number): Promise<Eixo[]> {
        try {
            const usuario = await this.usuarioRepository.findOne({
                where: { id: userId },
                relations: ['selecaoIndicadores', 'selecaoIndicadores.eixo', 'selecaoIndicadores.indicador'],
            });

            if (!usuario) {
                throw new Error('Usuário não encontrado');
            }

            const eixosPadrao = await this.getEixosComIndicadores();

            const eixosComIndicadoresDoUsuario: Eixo[] = [];

            for (const eixo of eixosPadrao) {
                const eixoComIndicadoresDoUsuario: Eixo = { ...eixo, indicadores: [] };
                for (const selecaoIndicador of usuario.selecaoIndicadores) {
                    if (selecaoIndicador.eixo.id === eixo.id) {
                        const indicador = selecaoIndicador.indicador;
                        if (indicador) {
                            eixoComIndicadoresDoUsuario.indicadores.push(indicador);
                        }
                    }
                }
                eixosComIndicadoresDoUsuario.push(eixoComIndicadoresDoUsuario);
            }

            return eixosComIndicadoresDoUsuario;
        } catch (error) {
            console.error('Erro ao obter os eixos com os indicadores do usuário:', error);
            throw error;
        }
    }
*/

    public async adicionarSelecaoIndicador(userId: number, eixoId: number, indicadorId: number): Promise<void> {
        try {
            const usuario = await this.usuarioRepository.findOne({
                where: { id: userId },
            });

            if (!usuario) {
                throw new Error('Usuário não encontrado');
            }

            const eixo = await this.eixoRepository.findOne({
                where: { id: eixoId },
            });

            if (!eixo) {
                throw new Error('Eixo não encontrado');
            }

            const indicador = await this.indicadorRepository.findOne({
                where: { id: indicadorId },
            });

            if (!indicador) {
                throw new Error('Indicador não encontrado');
            }

    /*        const selecaoIndicador = new SelecaoIndicador();
            selecaoIndicador.user = usuario;
            selecaoIndicador.eixo = eixo;
            selecaoIndicador.indicador = indicador;

            await this.selecaoIndicadorRepository.save(selecaoIndicador);
*/
            console.log('Seleção de indicador adicionada com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar seleção de indicador:', error);
            throw error;
        }
    }
}