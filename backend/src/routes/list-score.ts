import { FastifyInstance } from "fastify";
import { ListScoreRepository } from "../repositories/list-score-repository";
import { PrismaRepository } from "../repositories/prisma/prisma-repository";

export async function listScore(app: FastifyInstance){
  app.get('/user/score', async (req, res) =>{
    const { sessionId } = req.cookies;

    if(!sessionId)
      throw new Error('Unauthorized!')

    const prismaRepository = new PrismaRepository()
    const listScoreReposiotry = new ListScoreRepository(
      prismaRepository
    )
    
    const score = await listScoreReposiotry.handle(sessionId);
    
    return res.status(200).send(score)
  })
}