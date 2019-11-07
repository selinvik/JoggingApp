import { RequestHandler } from 'express';

const error: RequestHandler = async (err, req, res, next) => {
  console.error(err.stack);
  res.status(500);
}

export default error;
