import express, { RequestHandler } from 'express';
const router = express.Router();
import User from '../db/models/User';
import { generatePasswordHash } from '../utils/functions';

const userController: {
  [key: string]: RequestHandler
} = {
  create: async (req, res) => {
    const hashPassword = await generatePasswordHash(req.body.password);
    try {
      const user = await User.create({
        firstName : req.body.firstName,
        lastName  : req.body.lastName,
        email     : req.body.email,
        password  : hashPassword
      });
      res.send(user);
    } catch (error) {
      return res.status(409).send();
    }
  }
}

router.route('/')
  .post(userController.create);

export default router;