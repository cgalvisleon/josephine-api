const express = require("express");
const app = express();
const server = require("http").Server(app);
const { config } = require("./src/config/index");
const cors = require("./src/middleware/cors");
const { logErrors, wrapErrors, errorHandler } = require("./src/middleware/errorHandlers");
const notFoundHandler = require("./src/middleware/notFoundHandler");
const { SocketIO } = require("./src/lib/socket");
const api = require("./src/routes/api");
const webhookApi = require("./src/routes/webhook");

// Definitions
const josephinQL = require("./src/routes/josephineQL");
const logsApi = require("./src/routes/logs");
const printsApi = require("./src/routes/prints");

// Body parser limit
app.use(express.json({ limit: "50mb" }));

// Cors
app.use(cors);

// Public
app.use("/app", express.static("public"));

// Socket.io
SocketIO(server);

// Routs
api(app);
webhookApi(app);
josephinQL(app);
logsApi(app);
printsApi(app);

// Catch 404
app.use(notFoundHandler);

// Error middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

server.listen(config.port, function () {
  const debug = require("debug")("app:server");
  debug(`Listening http://localhost:${config.port}`);
});
