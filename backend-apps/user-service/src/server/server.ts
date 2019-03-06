
import app from "./app/app";
import { ServerConfig } from "./server.config";
//import * as https from 'https';
import * as fs from 'fs';
import * as http from 'http';

/*
const httpsOptions = {
  key: fs.readFileSync(`${__dirname}/certificates/server.key`),
  cert: fs.readFileSync(`${__dirname}/certificates/server.crt`)
}

https.createServer(httpsOptions, app)
  .listen(ServerConfig.port, () => {
    console.log('Express server listening on port ' + ServerConfig.port);
  })
*/

http.createServer(app)
  .listen(ServerConfig.port, () => {
    console.log('Express server listening on port ' + ServerConfig.port);
  })
