import express from "express";
import config from "./config";
import router from "./routes";
import { genericErrorHandler, NotFounnd } from "./middleware/errorHandler";
import { requestLogger } from "./middleware/logger";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";

const app = express();

const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  message: "Too many request",
});

const allowedOrigins = ["http://www.test.com"];

app.use(helmet());
app.use(limiter);
app.use(
  cors({
    origin(requestOrigin, callback) {
      if (!requestOrigin || !allowedOrigins.includes(requestOrigin)) {
        callback(null, requestOrigin);
      } else {
        callback(new Error("Not allowed"));
      }
    },
  }),
);
app.use(express.json());
app.use(requestLogger);
app.use(router);
app.use(genericErrorHandler);
app.use(NotFounnd);

app.listen(config.port, () => {
  console.log(`Server listening on: http://localhost:${config.port}`);
});
