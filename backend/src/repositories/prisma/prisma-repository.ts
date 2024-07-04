import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { BodySchema } from "../../routes/create-user";
import { userDatas } from "../create-user-repository";

export class PrismaRepository extends PrismaClient{
  async create(data: userDatas){
    const { nick, password, sessionId } = data;
    await this.user.create({
      data: {
        nick,
        password,
        sessionId,
        score: 0
      }
    })
  }
  async update(data: any){

    const user = await this.user.findFirstOrThrow({
      where: {
        sessionId: data
      }
    })

    const { score, id } = user;

    await this.user.update({
      where: {
        id
      },
      data: {
        score: score+1
      }
    })
  }

  async listScore(sessionId: string){
    const user = await this.user.findFirstOrThrow({
      where: {
        sessionId
      }
    })
    return {
      score: user.score
    }
  }
}