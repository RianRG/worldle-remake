import { FastifyInstance } from "fastify";

export async function checkUser(app: FastifyInstance){
  app.get('/user/session', async (req, res) =>{
    const { sessionId } = req.cookies;

    console.log(req.cookies)

    if(!sessionId)
      throw new Error('Unauthorized!')

    return res.status(200).send({ msg: 'Authorized!' })
  })
}