import express, { Router } from 'express';
import { usersRouter } from './auth';

const router: Router = express.Router();

router.use('/user', usersRouter);

export const applicationRouter: Router = router;