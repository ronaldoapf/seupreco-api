import type { FastifyInstance } from 'fastify'
import { listProductsController } from './list-products/list-products'
import { registerProductsController } from './register-products/register-products'

export const productsRoutes = async (app: FastifyInstance) => {
  app.register(registerProductsController)
  app.register(listProductsController)
}
