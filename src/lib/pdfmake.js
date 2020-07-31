const PdfPrinter = require("pdfmake");
const fonts = {
  Roboto: {
    normal: "./src/assets/fonts/Roboto-Regular.ttf",
    bold: "./src/assets/fonts/Roboto-Medium.ttf",
    italics: "./src/assets/fonts/Roboto-Italic.ttf",
    bolditalics: "./src/assets/fonts/Roboto-MediumItalic.ttf",
  },
};

class PdfMake {
  constructor() {
    this.printer = new PdfPrinter(fonts);
    this.options = {};
  }

  async setOptions(options) {
    this.options = options;
    return await this;
  }

  async toStream(definition, options, callback) {
    try {
      definition = definition || {};
      options = options || this.options;
      let doc = this.printer.createPdfKitDocument(definition, options);
      let chunks = [];
      let result;

      doc.on("data", function (chunk) {
        chunks.push(chunk);
      });
      doc.on("end", function () {
        result = Buffer.concat(chunks);
        callback(result);
      });
      doc.end();
    } catch (err) {
      return err;
    }
  }
}

module.exports = PdfMake;
