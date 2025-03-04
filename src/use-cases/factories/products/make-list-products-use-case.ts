import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'
import { ListProductsUseCase } from '@/use-cases/products/list-products'

export function makeListProductsUseCase() {
  const productsRepository = new PrismaProductsRepository()
  const listProductsUseCase = new ListProductsUseCase(productsRepository)

  return listProductsUseCase
}
