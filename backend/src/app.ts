import fastify from 'fastify';
import { createUser } from './routes/create-user';
import { updateUser } from './routes/update-user';
import cookie from '@fastify/cookie'
import cors from '@fastify/cors'
import { listScore } from './routes/list-score';
import { checkUser } from './routes/check-user';
const app = fastify();

app.register(cors, {
  origin: 'http://localhost:4200',
  credentials: true
})

app.register(cookie, {
  secret: 'akjdk9AKDKAdhahdaDHA_Jaahdkm qroj939029',
  hook: 'onRequest'
});

app.register(createUser)
app.register(updateUser)
app.register(listScore)
app.register(checkUser)

export { app };