
import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "../route/route";
import * as mongoose from "mongoose";
import { AppConfig } from "./app.config";

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
    // support application/json type post data
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
  }

}

export default new App().app;
