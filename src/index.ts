import express from "express";
import config from "./config";

import router from "./routes";
import { genericErrorHandler, NotFounnd } from "./middleware/errorHandler";
import { requestLogger } from "./middleware/logger";

const app = express();
app.use(express.json());
app.use(requestLogger);
app.use(router);
app.use(genericErrorHandler);
app.use(NotFounnd);

app.listen(config.port, () => {
  console.log(`Server listening on: http://localhost:${config.port}`);
});
