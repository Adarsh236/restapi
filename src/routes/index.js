import { Router } from 'express';
import RandomNumberController from './randomNumber.js';

const apiRouter = () => {
    const routes = Router();
    const randomNumberRouter = RandomNumberController();
    routes.use('/randomNumber', randomNumberRouter);
    return routes;
};

export default apiRouter;
