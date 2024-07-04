import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { CreateUserRepository } from "../repositories/create-user-repository";
import { PrismaRepository } from "../repositories/prisma/prisma-repository";
import { randomUUID } from "crypto";

const bodySchema = z.object({
  nick: z.string(),
  password: z.string(),
})
export type BodySchema = z.infer<typeof bodySchema>

export async function createUser(app: FastifyInstance){
  app.post('/user', async(req, res) =>{
    const { nick, password } = bodySchema.parse(req.body);

    let { sessionId } = req.cookies;
  
    if(!sessionId){
      sessionId = randomUUID();

      res.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7days
        signed: true,
        httpOnly: true
      })
    }

      const prismaRepository = new PrismaRepository()
      const createUserRepository = new CreateUserRepository(
        prismaRepository
      )

      createUserRepository.handle({
        nick, 
        password,
        sessionId
      })

    return res.status(201).send({ msg: 'created succesfully!' })
  })
}