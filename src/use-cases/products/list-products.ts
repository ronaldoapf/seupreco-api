import type { ProductsRepository } from '@/repositories/products-repository'
import type { Products } from '@prisma/client'

export interface ListProductsUseCaseResponse {
  total: number;
  data: Products[]
}

interface ListProductsUseCaseRequest {
  page: number;
  limit: number;
}

export class ListProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({ 
    limit, 
    page 
  }: ListProductsUseCaseRequest): Promise<ListProductsUseCaseResponse> {
    console.log(limit)
    const products = await this.productsRepository.findManyAndCount({ limit, page })
    
    return { products }
  }
}
