const express = require("express");
const app = express();
const server = require("http").Server(app);
const { config } = require("./src/config/index");
const cors = require("./src/middleware/cors");
const monitor = require("./src/middleware/monitor");
const { logErrors, wrapErrors, errorHandler } = require("./src/middleware/errorHandlers");
const notFoundHandler = require("./src/middleware/notFoundHandler");
const { SocketIO } = require("./src/lib/socket");
const api = require("./src/routes/api");
const webhookApi = require("./src/routes/webhook");

// Definitions
const logsApi = require("./src/routes/logs");
const monitorApi = require("./src/routes/monitor");
const printsApi = require("./src/routes/prints");
const usersApi = require("./src/routes/users");
const match360 = require("./src/routes/match360");
const contactsApi = require("./src/routes/contacts");
const profilesApi = require("./src/routes/profiles");
const projectsApi = require("./src/routes/projects");
const typesApi = require("./src/routes/types");
const talkingApi = require("./src/routes/talkings");
const attachmensApi = require("./src/routes/attachments");
const pdfApi = require("./src/routes/pdf");

// Body parser limit
app.use(express.json({ limit: "50mb" }));

// Cors
app.use(cors);

// Monitor
app.use(monitor);

// Public
app.use("/app", express.static("public"));

// Socket.io
SocketIO(server);

// Routs
api(app);
webhookApi(app);
logsApi(app);
monitorApi(app);
printsApi(app);
usersApi(app);
match360(app);
contactsApi(app);
profilesApi(app);
projectsApi(app);
typesApi(app);
talkingApi(app);
attachmensApi(app);
pdfApi(app);

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
