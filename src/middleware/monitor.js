const os = require("os");
const { config } = require("../config/index");
const { genId } = require("../lib/utilities");
const LogLib = require("../lib/logs");
const log = new LogLib(config.project, "monitor");

function monitor(req, res, next) {
  const _id = genId("-1");
  const free = os.freemem();
  const total = os.totalmem();
  const use = free / total;
  const status = {
    date: new Date(),
    _id: _id,
    ip_address: os.networkInterfaces().en0.map((i) => i.address),
    cpu: os.cpus(),
    free_memory: free,
    total_memory: total,
    use: use,
  };
  log.monitor(status);
  res.header("Monitor-id", _id);
  next();
}

module.exports = monitor;
