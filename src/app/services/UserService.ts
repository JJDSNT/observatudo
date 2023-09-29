import { getRepository } from "typeorm";
import { User } from "../entities/User";

export class UserService {
  private userRepository = getRepository(User);

  async getUsers() {
    return this.userRepository.find();
  }

  async getUser(userId: number) {
    return this.userRepository.findOne(userId);
  }

  async createUser(userData: Partial<User>) {
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

  async updateUser(userId: number, userData: Partial<User>) {
    const user = await this.userRepository.findOne(userId);

    if (!user) {
      return null;
    }

    const updatedUser = this.userRepository.merge(user, userData);
    return this.userRepository.save(updatedUser);
  }

  async deleteUser(userId: number) {
    const user = await this.userRepository.findOne(userId);

    if (!user) {
      return null;
    }

    return this.userRepository.remove(user);
  }
}
