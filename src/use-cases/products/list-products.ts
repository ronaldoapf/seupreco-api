import type { ProductsRepository } from '@/repositories/products-repository'
import type { Products } from '@prisma/client'

export interface ListProductsUseCaseResponse {
  products: Products[]
}

export class ListProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(): Promise<ListProductsUseCaseResponse> {
    const products = await this.productsRepository.listAllProducts()

    return { products }
  }
}
