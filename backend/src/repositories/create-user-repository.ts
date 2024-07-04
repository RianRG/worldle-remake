import { z } from "zod";
import { PrismaRepository } from "./prisma/prisma-repository";
import { BodySchema } from "../routes/create-user";

export interface userDatas{
  nick: string;
  password: string;
  sessionId: string;
}

export class CreateUserRepository{
  constructor(
    private database: PrismaRepository
  ){};

  handle(body: userDatas){
    return this.database.create(body)
  }
}