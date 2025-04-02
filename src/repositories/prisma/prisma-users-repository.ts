import { prisma } from '@/lib/prisma'
import type { Prisma, Users } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UsersUncheckedCreateInput): Promise<Users> {
    return await prisma.users.create({
      data,
    })
  }

  async findByEmail(email: string): Promise<Users | null> {
    return await prisma.users.findUnique({
      where: { email },
    })
  }
}
