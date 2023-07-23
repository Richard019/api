import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

import express from 'express';
import alunoRoutes from './routes/alunoRoutes';
import tokenRoutes from './routes/tokenRoutes';
import userRoutes from './routes/userRoutes';
import photoRoutes from './routes/photoRoutes';
import homeRoutes from './routes/homeRoutes';

import loginRequired from './middlewares/loginRequired';
import './database';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, '..', 'uploads')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/alunos', alunoRoutes);
    this.app.use('/tokens', tokenRoutes);
    this.app.use('/users', loginRequired, userRoutes);
    this.app.use('/photos', loginRequired, photoRoutes);
  }
}

export default new App().app;
