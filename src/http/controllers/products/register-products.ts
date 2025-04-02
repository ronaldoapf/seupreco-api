import { makeRegisterProductUseCase } from '@/use-cases/factories/products/make-register-product-use-case'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const registerProductsController: FastifyPluginAsyncZod = async app => {
  app.post('/products', {
    schema: {
        body: z.object({
          description: z.string(),
          ean: z
            .string()
            .min(13, { message: 'EAN must have 13 characters' })
            .max(13, { message: 'EAN must have 13 characters' }),
        }),
        response: {
          201: z.object({
            product: z.object({
              id: z.string(),
              ean: z.string(),
              description: z.string(),
            }),
          }),
        },
      },
  }, async (request, reply) => {
    const { ean, description } = request.body

    const useCase = makeRegisterProductUseCase()

    const { product } = await useCase.execute({ ean, description })

    return reply.status(201).send({ product })
  })
}
