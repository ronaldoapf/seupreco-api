import type { FastifyInstance } from 'fastify'
import { listProductsController } from './list-products'
import { registerProductsController } from './register-products'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

export const productsRoutes = async (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJwt)
  
  app.register(registerProductsController)
  app.register(listProductsController)
}
