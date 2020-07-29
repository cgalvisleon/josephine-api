const nodemailer = require("nodemailer");
const { config } = require("../config/index");
const { mailAction, mailAlert } = require("../assets/mails/templates");
const { capitalize } = require("./utilities");

class MailerLib {
  constructor() {
    const project = capitalize(config.project);
    this.from = `"${project}" ${config.email}`;
    this.transporter = nodemailer.createTransport({
      host: config.emailHost,
      port: config.emailPort,
      secure: config.emailPort === 465, // true for 465, false for other ports
      auth: {
        user: config.email,
        pass: config.emailPassword,
      },
    });
  }

  sendMail(to, subject, text, html) {
    return this.transporter
      .sendMail({
        from: this.from,
        to: to,
        subject: subject,
        text: text,
        html: html,
      })
      .then(() => {
        return { send: true };
      })
      .catch((err) => {
        throw err;
      });
  }

  sendActionMail(to, subject, title, message, button, href) {
    const template = mailAction(title, message, button, href);
    return this.sendMail(to, subject, title, template);
  }

  sendAlertMail(to, subject, title, subtitle, message, button, href, thanks) {
    const template = mailAlert(title, subtitle, message, button, href, thanks);
    return this.sendMail(to, subject, title, template);
  }
}

module.exports = MailerLib;
