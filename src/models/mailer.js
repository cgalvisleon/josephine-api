const MailerLib = require("../lib/mailer");
const { validEmail, getValue, respond } = require("../lib/utilities");
const { MSG0004 } = require("../lib/msg");

class Model {
  constructor(params) {
    this.mailer = new MailerLib();
    this.params = params;
    this.key = getValue(this.params, "key", "");
  }

  async sendMail(to, subject, text, html) {
    if (to === "") {
      return respond(400, {}, 400, "Destinatario requerido");
    } else if (!validEmail(to)) {
      return respond(400, {}, 400, "Destinatario no es un correo valido");
    } else if (subject === "") {
      return respond(400, {}, 400, "Asunto requerido");
    } else {
      return await this.mailer
        .sendMail(to, subject, text, html)
        .then((result) => {
          return respond(200, result);
        })
        .catch((err) => {
          return respond(200, { err }, 400, MSG0004);
        });
    }
  }

  async sendActionMail(to, subject, title, message, button, href) {
    if (to === "") {
      return respond(400, {}, 400, "Destinatario requerido");
    } else if (!validEmail(to)) {
      return respond(400, {}, 400, "Destinatario no es un correo valido");
    } else if (subject === "") {
      return respond(400, {}, 400, "Asunto requerido");
    } else {
      return await this.mailer
        .sendActionMail(to, subject, title, message, button, href)
        .then((result) => {
          return respond(200, result);
        })
        .catch((err) => {
          return respond(200, { err }, 400, MSG0004);
        });
    }
  }

  async sendAlertMail(to, subject, title, subtitle, message, button, href, thanks) {
    if (to === "") {
      return respond(400, {}, 400, "Destinatario requerido");
    } else if (!validEmail(to)) {
      return respond(400, {}, 400, "Destinatario no es un correo valido");
    } else if (subject === "") {
      return respond(400, {}, 400, "Asunto requerido");
    } else {
      return await this.mailer
        .sendAlertMail(to, subject, title, subtitle, message, button, href, thanks)
        .then((result) => {
          return respond(200, result);
        })
        .catch((err) => {
          return respond(200, { err }, 400, MSG0004);
        });
    }
  }
}

module.exports = Model;
