import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import pinoHttp from 'pino-http';
import { expressMiddleware as graphQlExpressMiddleware } from '@apollo/server/express4';
import startApolloServer from '@/configs/graphQl';

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE']
};

const startServer = async () => {
  const server = await startApolloServer();
  const app = express();

  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(express.json());
  app.use(pinoHttp());
  app.use('/graphql', graphQlExpressMiddleware(server));
  app.use('/health', (req, res) => res.status(200).send({ ok: true }));

  app.listen(process.env.BACKEND_PORT, () => {
    console.log(`Listening on port ${process.env.BACKEND_PORT}.`);
  });
};

startServer()