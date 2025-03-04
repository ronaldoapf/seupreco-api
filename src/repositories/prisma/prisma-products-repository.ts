import { prisma } from '@/lib/prisma'
import type { Prisma, Products } from '@prisma/client'
import type { ProductsRepository } from '../products-repository'

export class PrismaProductsRepository implements ProductsRepository {
  async findByEan(ean: string): Promise<Products | null> {
    const product = await prisma.products.findUnique({
      where: {
        ean,
      },
    })

    return product
  }

  async create(data: Prisma.ProductsUncheckedCreateInput): Promise<Products> {
    const product = await prisma.products.create({
      data,
    })

    return product
  }

  async listAllProducts(): Promise<Products[] | []> {
    const products = await prisma.products.findMany()

    return products
  }
}
