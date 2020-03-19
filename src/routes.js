import { Router } from 'express';

import UserController from './app/controllers/UserController';
import RaffleController from './app/controllers/RaffleController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/users', UserController.index);
routes.get('/raffle', RaffleController.index);

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/raffle', RaffleController.store);

routes.post('/raffle/buy/:id', RaffleController.buy);

routes.delete('/raffle/:id', RaffleController.delete);

export default routes;
