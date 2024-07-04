import { PrismaRepository } from "./prisma/prisma-repository";

export class UpdateUserRepository{
  constructor(
    private database: PrismaRepository
  ){};
  handle(data: any){
    return this.database.update(data);
  }
}