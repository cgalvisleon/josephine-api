const TeleBot = require("telebot");
const { config } = require("../config/index");
const { respond } = require("./utilities");

class BotLib {
  constructor(token) {
    this.token = token || config.dployToken;
  }

  connect(token) {
    if (!BotLib.bot) {
      BotLib.bot = new TeleBot({
        token: token,
        usePlugins: [],
        pluginConfig: {},
      });
    }
    return BotLib.bot;
  }

  async sendError(message) {
    const bot = await this.connect(this.token);
    const chatId = 990572733;
    return await bot.sendMessage(chatId, message, { parseMode: "markdown" }).then((res) => {
      return respond(200, res);
    });
  }
}

module.exports = BotLib;
