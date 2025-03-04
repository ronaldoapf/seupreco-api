import type { RouteShorthandOptions } from 'fastify'
import z from 'zod'

export const registerProductsConfig = {
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
} satisfies RouteShorthandOptions
