import { RequestHandler } from 'express';

const authorization: RequestHandler = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).send()
  }
  else next()
}

export default authorization;