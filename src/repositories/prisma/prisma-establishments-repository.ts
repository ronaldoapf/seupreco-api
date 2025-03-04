import { prisma } from '@/lib/prisma'
import type { Establishments, Prisma } from '@prisma/client'
import type { EstablishmentsRepository } from '../establishments-repository'

export class PrismaEstablishmentsRepository
  implements EstablishmentsRepository
{
  async findByCnpj(cnpj: string): Promise<Establishments | null> {
    const establishment = await prisma.establishments.findUnique({
      where: {
        cnpj,
      },
    })

    return establishment
  }

  async create(
    data: Prisma.EstablishmentsUncheckedCreateInput
  ): Promise<Establishments> {
    const product = await prisma.establishments.create({
      data,
    })

    return product
  }
}
