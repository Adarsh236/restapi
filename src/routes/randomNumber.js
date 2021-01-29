import { Router } from 'express';
import RandomNumberController from '../controllers/randomNumber';

const randomNumberRouter = () => {
    const router = Router();
    const controller = RandomNumberController();
    router.route('/').get(controller.getAllRandomNumber);
    router.route('/:id').get(controller.generateRandomNumberById);
    return router;
};

export default randomNumberRouter;
