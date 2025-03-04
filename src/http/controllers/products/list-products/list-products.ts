import { makeListProductsUseCase } from '@/use-cases/factories/products/make-list-products-use-case'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { listProductsConfig } from './config'

export const listProductsController: FastifyPluginAsyncZod = async app => {
  app.get('/products', listProductsConfig, async (request, reply) => {
    const useCase = makeListProductsUseCase()

    const { products } = await useCase.execute()

    console.log(products)

    return reply.status(200).send({ products })
  })
}
