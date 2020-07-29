const { getValue, emptyValue, getData } = require("../../lib/utilities");
const { logoBase64 } = require("../../lib/imgBase64");

const report = async function(data) {
  const title = "Entrada de almacen";
  const subject = "Entrada de almacen";
  const keywords = "entrada, almacen";
  const master = getValue(data, "master", {});
  const project = getData(master, "project", {});
  const details = getValue(master, "details", []);
  const logoDefault = "./assets/images/logo.png";
  const avatar = emptyValue(project, "avatar", "");
  const logo = await logoBase64(avatar, logoDefault).then(result => {
    return result;
  });
  const tableLayout = {
    paddingLeft: function() {
      return 1;
    },
    paddingRight: function() {
      return 1;
    },
    paddingTop: function() {
      return 1;
    },
    paddingBottom: function() {
      return 1;
    }
  };

  let details_print = [];
  details.map((item, i) => {
    const item_print = [
      { text: `${i + 1}`, alignment: "center", style: "td" },
      { text: ``, alignment: "left" },
      { text: ``, alignment: "left" },
      { text: ``, alignment: "left" },
      { text: ``, alignment: "center" },
      { text: ``, alignment: "center" },
      { text: ``, alignment: "left" }
    ];
    details_print.push(item_print);
  });

  const definition = {
    pageSize: "LETTER",
    pageOrientation: "portrait",
    pageMargins: [28, 64, 28, 28],
    info: {
      title: title,
      author: "Josephine Platform",
      subject: subject,
      keywords: keywords
    },
    compress: true,
    header: {
      margin: [28, 28, 28, 0],
      columns: [
        { width: 130, image: logo, fit: [130, 38] },
        { width: "*", text: `${project.caption.toUpperCase()}\n${title.toUpperCase()}`, alignment: "center", fontSize: 9 },
        {
          width: 130,
          text: [{ text: `No. ${master.code}`, alignment: "right", fontSize: 14 }]
        }
      ]
    },
    footer: function(currentPage, pageCount) {
      return [{ text: currentPage.toString() + " de " + pageCount, style: "footerPages" }];
    },
    content: [
      {
        style: "tableHeader",
        table: {
          widths: ["*", 120, 80, 50, 50, 120],
          heights: 10,
          headerRows: 1,
          body: [
            [
              { text: `Nombre`, fillColor: "#CCCCCC", alignment: "center" },
              { text: `Usuario`, fillColor: "#CCCCCC", alignment: "center" },
              { text: `Perfil`, fillColor: "#CCCCCC", alignment: "center" },
              { text: `Telefono`, fillColor: "#CCCCCC", alignment: "center" },
              { text: `Celular`, fillColor: "#CCCCCC", alignment: "center" },
              { text: `Dirección`, fillColor: "#CCCCCC", alignment: "center" }
            ]
          ]
        },
        layout: tableLayout
      },
      {
        style: "tableData",
        table: {
          widths: [15, "*", 120, 80, 50, 50, 120],
          heights: 20,
          headerRows: 2,
          body: details_print
        },
        layout: tableLayout
      }
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true
      },
      subheader: {
        fontSize: 15,
        bold: true
      },
      quote: {
        italics: true
      },
      small: {
        fontSize: 6
      },
      footerPages: {
        fontSize: 8,
        alignment: "center"
      },
      pageHeader: {
        fontSize: 8,
        margin: [0, 0, 0, 2]
      },
      tableHeader: {
        fontSize: 8,
        margin: [0, 0, 0, 1]
      },
      tableData: {
        fontSize: 8,
        margin: [0, 0, 0, 2]
      },
      td: {
        height: 20
      }
    }
  };
  return await definition;
};

module.exports = report;
