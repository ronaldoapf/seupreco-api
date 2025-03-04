import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'
import { RegisterProductUseCase } from '@/use-cases/products/register-product'

export function makeRegisterProductUseCase() {
  const productsRepository = new PrismaProductsRepository()
  const registerProductUseCase = new RegisterProductUseCase(productsRepository)

  return registerProductUseCase
}
