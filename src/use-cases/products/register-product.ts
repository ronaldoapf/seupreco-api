import type { ProductsRepository } from '@/repositories/products-repository'
import type { Products } from '@prisma/client'

export type RegisterProductUseCaseRequest = {
  ean: string
  description: string
}
export interface RegisterProductUseCaseResponse {
  product: Products
}

export class RegisterProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    ean,
    description,
  }: RegisterProductUseCaseRequest): Promise<RegisterProductUseCaseResponse> {
    const productAlreadyExists = await this.productsRepository.findByEan(ean)

    if (productAlreadyExists) {
      throw new Error('Product already exists')
    }

    const product = await this.productsRepository.create({
      ean,
      description,
    })

    return { product }
  }
}
