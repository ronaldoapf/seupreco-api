import type { Prisma, Products } from '@prisma/client'

export interface ProductsRepository {
  create: (product: Prisma.ProductsUncheckedCreateInput) => Promise<Products>
  findByEan: (ean: string) => Promise<Products | null>
  listAllProducts: () => Promise<Products[] | []>
}
