import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { makeRegisterUsersUseCase } from "@/use-cases/factories/users/make-register-user-use-case";
import z from "zod";

export const registerUserController: FastifyPluginAsyncZod = async app => {
  app.post('/users', {
    schema: {
      body: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(8),
      }),
    },
  }, async(request, reply) => {
    const { email, name, password } = request.body
    
    const useCase = makeRegisterUsersUseCase()

    const { user } = await useCase.execute({
      email,
      name,
      password
    })

    return reply.status(201).send({ user })
  })
}