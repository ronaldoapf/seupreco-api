import type { Prisma, Products } from '@prisma/client'

export interface FindManyAndCount {
  total: number;
  data: Products[]
}

export interface FilterFindManyAndCount {
  page: number;
  limit: number;
}

export interface ProductsRepository {
  create: (product: Prisma.ProductsUncheckedCreateInput) => Promise<Products>
  findByEan: (ean: string) => Promise<Products | null>
  listAllProducts: () => Promise<Products[] | []>
  findManyAndCount: (filter: FilterFindManyAndCount) => Promise<FindManyAndCount>
}
