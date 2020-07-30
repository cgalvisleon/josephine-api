const os = require("os");
const { config } = require("../config/index");
const { genId } = require("../lib/utilities");
const LogLib = require("../lib/logs");
const log = new LogLib(config.project, "monitor");

function monitor(req, res, next) {
  const status = {
    date_of: new Date(),
    _id: genId("-1"),
    ip_address: os.networkInterfaces().en0.map((i) => i.address),
    cpu: os.cpus(),
    free_memory: os.freemem(),
    total_memory: os.totalmem(),
  };
  log.monitor(status);
  next();
}

module.exports = monitor;
