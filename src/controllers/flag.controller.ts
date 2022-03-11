import { NextFunction, Request, Response } from 'express';
import { flaggedUsers, features } from '@models/users.model';
export default class FlagController {
  public all = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.send(flaggedUsers);
    } catch (error) {
      next(error);
    }
  };
  public user = (req: Request, res: Response, next: NextFunction): void => {
    try {
      if (req.body && req.body.email && flaggedUsers.find(user => user.email === req.body.email)) {
        const user = flaggedUsers.find(user => user.email === req.body.email);
        res.send(user);
      } else {
        // no user bad req
        res.status(404).send('User not found');
      }
    } catch (error) {
      next(error);
    }
  };
  public features = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.send(features);
    } catch (error) {
      next(error);
    }
  };
}
