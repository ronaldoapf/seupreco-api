import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import type { Users } from '@prisma/client'
import bcrypt from 'bcryptjs';

export type SessionUserrUseCaseRequest = {
  email: string;
  password: string
}

export interface SessionUserrUseCaseResponse {
  user: Users
}

export class SessionUserUseCase {
  constructor(private usersRepository: PrismaUsersRepository) {}

  async execute({
    email, password
  }: SessionUserrUseCaseRequest): Promise<SessionUserrUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new Error('Invalid credentials')
    }

    const isPasswordEqualToPasswordHash = await bcrypt.compare(password, user.passwordHash)

    
    if(!isPasswordEqualToPasswordHash) {
      throw new Error('Invalid credentials')
    }

    return { user }
  }
}
