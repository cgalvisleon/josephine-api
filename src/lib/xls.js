const Excel = require("excel4node");
const AwsLib = require("./aws");
const { socket } = require("./socket");
const Mailer = require("../models/mailer");

class XlsLib {
  constructor(params) {
    this.aws = new AwsLib();
    this.mailer = new Mailer();
    this.params = params;
    this.wb = new Excel.Workbook({
      jszip: {
        compression: "DEFLATE",
      },
      dateFormat: "d/m/yyyy hh:mm:ss",
    });
    this.title = this.wb.createStyle({
      font: {
        bold: true,
      },
      alignment: {
        wrapText: false,
        horizontal: "center",
      },
    });
    this.text = this.wb.createStyle({
      alignment: {
        wrapText: false,
        horizontal: "left",
      },
    });
    this.number = this.wb.createStyle({
      alignment: {
        wrapText: false,
        horizontal: "right",
      },
    });
  }

  addWorkSheet(name) {
    return this.wb.addWorksheet(name);
  }

  async setData(sheetName, data) {
    sheetName = sheetName || "Tabla";
    data = data || [];
    let sheet = this.addWorkSheet(sheetName);
    let r = 1;
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (r === 1) {
        const keys = Object.keys(item);
        for (let j = 0; j < keys.length; j++) {
          const val = keys[j];
          sheet
            .cell(r, j + 1)
            .string(val.toUpperCase())
            .style(this.title);
        }
        r = r + 1;
      }
      const values = Object.values(item);
      for (let j = 0; j < values.length; j++) {
        const val = values[j];
        sheet.cell(r, j + 1).string(String(val));
      }
      r = r + 1;
    }
    return sheet;
  }

  saveFile(project_id, name, to, user_id) {
    return this.wb.writeToBuffer().then((buff) => {
      let base64 = buff.toString("base64");
      this.aws.uploadBase64(base64, `${project_id}/export/xlsx`, name, ".xlsx").then((result) => {
        const location = result.Location;
        socket.io.emit(`/export/xls/${user_id}`, { location });
        socket.io.emit(`/export/xls/${project_id}`, { location });
        this.mailer.sendActionMail(
          to,
          "Archivo exportado",
          "Exportación a excel",
          "El sistema ha terminado el proceso de exportación a excel de los datos colicitados.",
          "Descargar",
          location
        );
        return { location };
      });
    });
  }
}

module.exports = XlsLib;
