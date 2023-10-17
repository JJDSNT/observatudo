import { Service } from 'typedi';
import { Repository, In } from 'typeorm';

import { Usuario } from '@/app/models/Usuario';
import { UsuarioRepository } from '@/app/repositories/UsuarioRepository';

@Service()
export class UserService {
  private userRepository: Repository<Usuario> = UsuarioRepository;

  constructor() {}

  async getUsers(): Promise<Usuario[]> {
    return this.userRepository.find();
  }

  /*
  async getUserById(userId: number): Promise<User | null> {
    /const user = await this.userRepository.findOne(userId);
    return user || null;
  }
*/

  async createUser(userData: Usuario): Promise<void> {
    try {
      await this.userRepository.save(userData);
      console.log('Usuário criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  }
  
  async getUserByEmail(email: string): Promise<Usuario | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user || null;
  }
  
  async getOrCreateUser(email: string, userData: Usuario): Promise<Usuario> {
    const existingUser = await this.getUserByEmail(email);
    if (existingUser) {
      return existingUser;
    } else {
      await this.createUser(userData);
      return userData;
    }
  }
  

  async updateUser(userId: number, updatedData: Partial<Usuario>): Promise<void> {
    try {
      await this.userRepository.update(userId, updatedData);
      console.log('Usuário atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  }

  async deleteUser(userId: number): Promise<void> {
    try {
      await this.userRepository.delete(userId);
      console.log('Usuário excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      throw error;
    }
  }
}
