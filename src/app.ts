import fastify from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { productsRoutes } from './http/controllers/products/routes'
import { usersRoutes } from './http/controllers/users/routes'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
  allowedHeaders: '*',
})

app.register(fastifyJwt, { 
  secret: process.env.JWT_SECRET || "defaultsecret" ,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '7d',
  },
})

app.register(fastifyCookie) 

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NLW Connect',
      version: '0.1',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(productsRoutes)
app.register(usersRoutes)
