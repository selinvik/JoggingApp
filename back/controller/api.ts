import express from 'express';
const router = express.Router();

import bodyParse from '../middlewares/bodyParse';
import cors from '../middlewares/cors';
import authenticationMiddleware from '../middlewares/authentication';
router.use(bodyParse);
router.use(cors);
router.use(authenticationMiddleware);

import user from './user';
import record from './record';
import report from './report';
import authentication from './authentication';
router.use('/user', user);
router.use('/record', record);
router.use('/report', report);
router.use('/authentication', authentication);


import errorMiddleware from '../middlewares/error';
router.use(errorMiddleware);

export default router;