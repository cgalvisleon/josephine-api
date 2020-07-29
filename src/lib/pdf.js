const pdf = require("html-pdf");
const AwsLib = require("./aws");
const Mailer = require("../models/mailer");
const { getValue } = require("./utilities");
const fs = require("fs");

class PdfLib {
  constructor(params) {
    this.aws = new AwsLib();
    this.mailer = new Mailer();
    this.params = params;
    this.projectId = getValue(params, "projectId", "");
    this.options = {
      format: getValue(params, "format", "Letter"),
      orientation: getValue(params, "orientation", "portrait"),
      border: getValue(params, "border", "10mm"),
      units: getValue(params, "units", "mm")
    };
    this.html = "";
  }

  async setOptions(options) {
    this.options = options;
    return await this;
  }

  async setHtml(html) {
    this.html = html;
    return await this;
  }

  async setHtmlFile(fileName) {
    const file = `./assets/reports/${fileName}`;
    this.html = fs.readFileSync(`${file}`, "utf8");
    return await this;
  }

  async toFile(fileName) {
    try {
      const html = this.html;
      const options = this.options;
      return await new Promise(function(resolve, reject) {
        fileName = `./public/pdf/${fileName}`;
        pdf.create(html, options).toFile(fileName, async function(err, res) {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      });
    } catch (err) {
      return err;
    }
  }

  async toStream() {
    try {
      const html = this.html;
      const options = this.options;
      return await new Promise(function(resolve, reject) {
        pdf.create(html, options).toStream(function(err, stream) {
          if (err) {
            reject(err);
          } else {
            resolve(stream);
          }
        });
      });
    } catch (err) {
      return err;
    }
  }

  async toBuffer() {
    try {
      const html = this.html;
      const options = this.options;
      return await new Promise(function(resolve, reject) {
        pdf.create(html, options).toBuffer(function(err, _buffer) {
          if (err) {
            reject(err);
          } else {
            resolve(_buffer);
          }
        });
      });
    } catch (err) {
      return err;
    }
  }
}

module.exports = PdfLib;
