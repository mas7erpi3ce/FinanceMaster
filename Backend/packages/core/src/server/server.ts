import app from "../app/app";
import { ServerConfig } from "./server.config";

app.listen(ServerConfig.port, () => {
  console.log('Express server listening on port ' + ServerConfig.port);
})