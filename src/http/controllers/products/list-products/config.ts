import type { RouteShorthandOptions } from 'fastify'
import z from 'zod'

export const listProductsConfig = {
  schema: {
    response: {
      200: z.object({
        products: z.array(
          z.object({
            id: z.string(),
            ean: z.string(),
            description: z.string(),
          })
        ),
      }),
    },
  },
} satisfies RouteShorthandOptions
