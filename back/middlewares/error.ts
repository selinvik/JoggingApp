import { RequestHandler } from 'express';

const error: RequestHandler = async (req, res, next) => {
  //todo where is error here
  //console.error(err.stack);
  res.status(500);
}

export default error;
