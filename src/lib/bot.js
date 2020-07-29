const { getRow, getValue } = require("./utilities");

class ToolBot {
  constructor() {
    this.scene = [];
  }

  isCommand(msg) {
    const entities = getValue(msg, "entities", []);
    const type = getRow(entities, 0, "type", "text");
    const _scene = this.scene[msg.from.id] || "";
    const text = msg.text;
    let result = true;
    if (type === "bot_command") {
      result = false;
    } else if (_scene !== "") {
      result = false;
    } else if (text.match(/^[/]/)) {
      result = false;
    }
    console.log(`scene: ${_scene} - ${result}`);
    return result;
  }

  setScene(from, scene) {
    this.scene[from.id] = scene;
    return this.scene[from.id];
  }

  getScene(from) {
    return this.scene[from.id] || "";
  }
}

function buttomMain(bot) {
  return bot.inlineKeyboard([[bot.inlineButton("Menú principal", { callback: "/start" })]]);
}

function buttomCalendar(bot) {
  return bot.inlineKeyboard([[bot.inlineButton("Menú principal", { ask: "dateof" })]]);
}

module.exports = { ToolBot, buttomMain, buttomCalendar };
