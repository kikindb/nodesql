const express = require("express");
const helmet = require("helmet");
const users = require("../routes/users");
const tasks = require("../routes/tasks");
const auth = require("../routes/auth");
const cors = require("cors");
const morgan = require("morgan");

module.exports = function (app) {
  //TODO: origin based in config
  app.use(helmet());
  app.use(
    cors({
      origin: [
        "http://localhost",
        "http://localhost:3001",
        "http://localhost:3000",
        "https://localhost:3001",
        "http://192.168.0.3",
        "https://192.168.0.3",
        "http://localhost:5000",
        "http://127.0.0.1:5173/",
        "http://localhost:5173/",
        "http://localhost:5000",
        "http://127.0.0.1:5173",
        "http://localhost:5173",
        "*",
      ],
      credentials: true,
      exposedHeaders: ["Vary", "Content-Length", "x-auth-token"],
    })
  );
  app.use(express.json());
  app.use(morgan("combined"));
  app.use("/api/users", users);
  app.use("/api/tasks", tasks);
  app.use("/api/auth", auth);
};
