import { prisma } from '@/lib/prisma'
import type { Prisma, Products } from '@prisma/client'
import type { FilterFindManyAndCount, FindManyAndCount, ProductsRepository } from '../products-repository'

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

  async findManyAndCount({ limit, page }: FilterFindManyAndCount): Promise<FindManyAndCount> {

    const skip = (page - 1) * limit

    const paginatedProducts = await prisma.products.findMany({
      take: limit,
      skip,
    })

    const count = await prisma.products.count()

    return {
      total: count,
      data: paginatedProducts,
    };
  }
}
