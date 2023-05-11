import express, { Request, Response, Router, NextFunction } from 'express';
import { login } from '../controller/authController';

const router: Router = express.Router();

router.get('/', async (request: Request, response: Response, next: NextFunction) => {
    await login(request, response);
});

export const usersRouter: Router = router;