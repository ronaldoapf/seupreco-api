import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import type { Products, Users } from '@prisma/client'
import bcrypt from 'bcryptjs';

export type RegisterUserUseCaseRequest = {
  name: string;
  email: string;
  password: string
}

export interface RegisterUserUseCaseResponse {
  user: Users
}

export class RegisterUserUseCase {
  constructor(private usersRepository: PrismaUsersRepository) {}

  async execute({
    email, name, password
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const usersAlreadyExists = await this.usersRepository.findByEmail(email)

    if (usersAlreadyExists) {
      throw new Error('User already exists')
    }

    const passwordHash = await bcrypt.hash(password, 8)

    const user = await this.usersRepository.create({
      name,
      email,
      passwordHash
    })

    return { user }
  }
}
