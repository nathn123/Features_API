import { Router } from 'express';
import FlagController from '@controllers/flag.controller';
import { Routes } from '@interfaces/routes.interface';
class FlagsRoute implements Routes {
  public path = '/';
  public router = Router();
  public flagController = new FlagController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}all`, this.flagController.all);
    this.router.post(`${this.path}user`, this.flagController.user);
    this.router.get(`${this.path}features`, this.flagController.features);
  }
}

export default FlagsRoute;
