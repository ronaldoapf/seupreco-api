import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { makeSessionUserUseCase } from "@/use-cases/factories/users/make-session-user-use-case";
import z from "zod";


export const sessionUserController: FastifyPluginAsyncZod = async app => {
  app.post('/users/session', {
    schema: {
      body: z.object({
        email: z.string().email(),
        password: z.string().min(8),
      }),
    },
  }, async(request, reply) => {
    
    const { email, password } = request.body

    const useCase = makeSessionUserUseCase()

    const { user } = await useCase.execute({
      email,
      password
    })

    const token = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      })
  })
}