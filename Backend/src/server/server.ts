
import app from "./app/app";
import { ServerConfig } from "./server.config";
import * as https from 'https';
import * as fs from 'fs';

const httpsOptions = {
  key: fs.readFileSync(`${__dirname}/certificates/key.pem`),
  cert: fs.readFileSync(`${__dirname}/certificates/cert.pem`)
}

https.createServer(httpsOptions, app)
  .listen(ServerConfig.port, () => {
    console.log('Express server listening on port ' + ServerConfig.port);
  })
