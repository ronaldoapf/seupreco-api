import { makeListProductsUseCase } from '@/use-cases/factories/products/make-list-products-use-case'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const listProductsController: FastifyPluginAsyncZod = async app => {
  app.get('/products', {
    schema: {
      params: z.object({
        page: z.coerce.number().default(1),
        limit: z.coerce.number().default(10),
      }),
      response: {
        200: z.object({
          products: z.array(
            z.object({
              total: z.number(),
              data: z.array(
                z.object({
                  id: z.string(),
                  ean: z.string(),
                  description: z.string(),
                }),
              ),
            })
          ),
        }),
      },
    },
  }, async (request, reply) => {
    const useCase = makeListProductsUseCase()

    const { limit, page } = request.params
    
    const products = await useCase.execute({ 
      limit: limit, 
      page: page 
    })

    return reply.status(200).send({ products })
  })
}
