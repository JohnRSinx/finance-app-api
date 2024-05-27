import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt'
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js';

export class CreateUserUseCase {
  async execute(createUserParams) {
    // TODO: verificar se o email já está em uso
    // criptografar as senhas
    const hashedPassword = await bcrypt.hash(createUserParams.password, 10)
    // Gerar ID
    const userId = uuidv4()
    // inserir o usuario no banco de dados
    const user = {
      ...createUserParams,
      id: userId,
      password: hashedPassword
    }
    //chamar repositorio
    const postgresCreateUserRepository = new PostgresCreateUserRepository
    const createdUser = await postgresCreateUserRepository.execute(user)
    return createdUser
  }
}