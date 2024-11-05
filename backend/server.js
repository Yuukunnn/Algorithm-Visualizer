import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import chalk from 'chalk';
import { createTables } from './db.js';
import { apiRouter } from './API/index.js';

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
app.use('/api', apiRouter);

const port = process.env.PORT || 6688;

const startServer = async () => {
  await createTables();
  app.listen(port, () => {
    console.log(chalk.green(`server successfully listening on port ${port}`));
  });
};

startServer();
