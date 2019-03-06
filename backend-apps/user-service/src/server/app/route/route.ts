
import { Request, Response, Application } from "express";
import { default as apiRouter } from "./api/api";


export class Routes {

  public routes(app: Application): void {

    app.route('/')
      .get((req: Request, res: Response) => {
        res.status(200).send({
          message: 'GET request successfulll!!!!'
        })
      });

    app.use('/api', apiRouter);
  }
}
