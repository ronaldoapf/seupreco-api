import type { FastifyInstance } from 'fastify'
import { registerUserController } from './register-user'
import { sessionUserController } from './session-user'

export const usersRoutes = async (app: FastifyInstance) => {
  app.register(registerUserController)
  app.register(sessionUserController)
}
