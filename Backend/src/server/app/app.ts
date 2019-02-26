
import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./route/route";
import mongoose = require('mongoose')
import { AppConfig } from "./app.config";
import * as helmet from "helmet"
import * as bluebird from "bluebird"

class App {

  public app: express.Application;
  public routeProvider: Routes = new Routes();
  public mongoUrl: string = AppConfig.mongoURL;

  constructor() {
    this.app = express();
    this.config();
    this.routeProvider.routes(this.app);
    this.mongoSetup();
  }

  private config(): void {
    // security middleware
    this.app.use(helmet());
    // support application/json type post data
    this.app.use(bodyParser.json());
    // support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));

    this.app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
  }

  private mongoSetup(): void {
    global.Promise = bluebird.Promise;
    mongoose.Promise = global.Promise;
    mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
  }

}

export default new App().app;
