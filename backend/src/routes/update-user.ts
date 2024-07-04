import { FastifyInstance } from "fastify";
import { z } from "zod";
import { UpdateUserRepository } from "../repositories/update-user-repository";
import { PrismaRepository } from "../repositories/prisma/prisma-repository";
export async function updateUser(app: FastifyInstance){
  app.get('/user', async (req, res) =>{
    const { sessionId } = req.cookies;
    
    const prismaRepository = new PrismaRepository()
    const updateUserRepository = new UpdateUserRepository(
      prismaRepository
    )

    updateUserRepository.handle(sessionId)

    return res.status(200).send({ msg: 'updated succesfully!' })
  })
}