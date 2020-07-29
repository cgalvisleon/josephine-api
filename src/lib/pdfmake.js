const fonts = {
  Roboto: {
    normal: "./assets/fonts/Roboto-Regular.ttf",
    bold: "./assets/fonts/Roboto-Medium.ttf",
    italics: "./assets/fonts/Roboto-Italic.ttf",
    bolditalics: "./assets/fonts/Roboto-MediumItalic.ttf"
  }
};
const PdfPrinter = require("pdfmake");

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

      doc.on("data", function(chunk) {
        chunks.push(chunk);
      });
      doc.on("end", function() {
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
