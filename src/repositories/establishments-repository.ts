import type { Establishments, Prisma } from '@prisma/client'

export interface EstablishmentsRepository {
  create: (
    establishment: Prisma.EstablishmentsUncheckedCreateInput
  ) => Promise<Establishments>
  findByCnpj: (cnpj: string) => Promise<Establishments | null>
}
