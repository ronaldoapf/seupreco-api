import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    const user = await request.jwtVerify()
    console.log({ user })
  } catch (err) {
    return reply.status(401).send({
      message: 'Unauthorized',
    })
  }
}
