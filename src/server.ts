import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./library/Logging";
import authorRoutes from "./routes/Author";
import bookRoutes from "./routes/Book";

const router = express();

/** Connect to Mongo */
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    Logging.info("Connected to mongoDB.");
    StartServer();
  })
  .catch((error) => {
    Logging.error("Unable to connect: ");
    Logging.error(error);
  });

/** Only start the server if Mongo Connects */
const StartServer = () => {
  router.use((req, res, next) => {
    /** Log the Request */
    Logging.info(
      `Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );

    res.on("finish", () => {
      /** Log the Response */
      Logging.info(
        `Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
      );
    });

    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  /** Rules of our API */
  router.use((req, res, next) => {
    res.header("Acess-Control-Allow-Origin", "*");
    res.header(
      "Acess-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method == "OPTIONS") {
      res.header(
        "Acess-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }

    next();
  });

  /** Routes */
  router.use("/authors", authorRoutes);
  router.use("/books", bookRoutes);

  /** Healthcheck  */
  router.get("/ping", (req, res, next) => {
    res.status(200).json({ message: "pong" });
  });

  /** Error handling */
  router.use((req, res, next) => {
    const error = new Error("not found");
    Logging.error(error);

    return res.status(404).json({ message: error.message });
  });

  http
    .createServer(router)
    .listen(config.server.port, () =>
      Logging.info(`Server is running on port ${config.server.port}.`)
    );
};