import { PrismaRepository } from "./prisma/prisma-repository";

export class ListScoreRepository{
  constructor(
    private database: PrismaRepository
  ){};

  handle(sessionId: string){
    return this.database.listScore(sessionId)
  }
}