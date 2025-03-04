import { makeRegisterProductUseCase } from '@/use-cases/factories/products/make-register-product-use-case'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { registerProductsConfig } from './config'

export const registerProductsController: FastifyPluginAsyncZod = async app => {
  app.post('/products', registerProductsConfig, async (request, reply) => {
    const { ean, description } = request.body

    const useCase = makeRegisterProductUseCase()

    const { product } = await useCase.execute({ ean, description })

    return reply.status(201).send({ product })
  })
}
