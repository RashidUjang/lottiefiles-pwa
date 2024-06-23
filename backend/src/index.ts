import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import pinoHttp from 'pino-http';

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE']
};

const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(pinoHttp());

app.use('/health', (req, res) => res.status(200).send({ ok: true }));

app.listen(process.env.BACKEND_PORT, () => {
  console.log(`Listening on port ${process.env.BACKEND_PORT}.`);
});
