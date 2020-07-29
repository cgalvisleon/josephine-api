const { /*genImgBase64,*/ getValue } = require("../../lib/utilities");

const report = async function(data) {
  const project = getValue(data, "project", {});
  //const logoDefault = genImgBase64("./assets/images/logo.png");
  //const master = getValue(data, "master", {});
  //const details = getValue(data, "details", []);
  //const logo = getValue(project, "avatar", logoDefault);
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

  const definition = {
    pageSize: "LETTER",
    pageOrientation: "landscape",
    pageMargins: [28, 28, 28, 28],
    info: {
      title: "Luminarias por transformador",
      author: "Josephine Platform",
      subject: "Detalle de luminarias por tranformador",
      keywords: "Tranformador, Luminarias"
    },
    compress: true,
    footer: function(currentPage, pageCount) {
      return [{ text: currentPage.toString() + " de " + pageCount, style: "footerPages" }];
    },
    content: [
      {
        style: "tableHeader",
        table: {
          widths: [130, "*", 100],
          heights: 10,
          headerRows: 3,
          body: [
            [
              { text: "", rowSpan: 3 },
              { text: project.caption.toUpperCase(), alignment: "center" },
              { text: "", alignment: "center" }
            ],
            ["", { text: "", alignment: "center" }, { text: "", alignment: "center" }],
            ["", { text: "", alignment: "center" }, { text: "", alignment: "center" }]
          ]
        },
        layout: tableLayout
      },
      {
        style: "tableHeader",
        table: {
          widths: [130, 110, 50, 50, 90, 90, "*", 100],
          heights: 10,
          headerRows: 2,
          body: [
            [
              { text: `Transformador: ` },
              { text: `Tipo: ` },
              { text: `Fases: ` },
              { text: `kVA: ` },
              { text: `Tensión de alta: ` },
              { text: `Tensión de baja: ` },
              { text: `Uso: `, colSpan: 2 },
              ""
            ],
            [
              { text: `Sitio: `, colSpan: 3 },
              "",
              "",
              { text: `Area: `, colSpan: 3 },
              "",
              "",
              { text: `Circuito: ` },
              { text: `Luminarias: ` }
            ]
          ]
        },
        layout: tableLayout
      },
      {
        style: "tableData",
        table: {
          widths: [15, 40, 30, 25, 50, 50, 50, 50, "*", 40, 50, 20, 40, 40, 20, 40, 20, 20],
          heights: [10, 10],
          headerRows: 2,
          body: [
            [
              { text: `Luminaria`, fillColor: "#CCCCCC", colSpan: 7, alignment: "center" },
              "",
              "",
              "",
              "",
              "",
              "",
              { text: `Sitio`, fillColor: "#CCCCCC", colSpan: 2, alignment: "center" },
              "",
              { text: `Apoyo`, fillColor: "#CCCCCC", colSpan: 3, alignment: "center" },
              "",
              "",
              { text: `Red`, fillColor: "#CCCCCC", colSpan: 3, alignment: "center" },
              "",
              "",
              { text: `Canalización`, fillColor: "#CCCCCC", colSpan: 3, alignment: "center" },
              "",
              ""
            ],
            [
              { text: `Código`, fillColor: "#CCCCCC", colSpan: 2, alignment: "center" },
              "",
              { text: `Fuente`, fillColor: "#CCCCCC", alignment: "center" },
              { text: `Pot.`, fillColor: "#CCCCCC", alignment: "center" },
              { text: `Tipo`, fillColor: "#CCCCCC", alignment: "center" },
              { text: `Balasto`, fillColor: "#CCCCCC", alignment: "center" },
              { text: `Control`, fillColor: "#CCCCCC", alignment: "center" },
              { text: `Tipo`, fillColor: "#CCCCCC", alignment: "center" },
              { text: `Sitio`, fillColor: "#CCCCCC", alignment: "center" },
              { text: `Código`, fillColor: "#CCCCCC", alignment: "center" },
              { text: `Material`, fillColor: "#CCCCCC", alignment: "center" },
              { text: `Long.`, fillColor: "#CCCCCC", alignment: "center" },
              { text: `Tipo`, fillColor: "#CCCCCC", alignment: "center" },
              { text: `Material`, fillColor: "#CCCCCC", alignment: "center" },
              { text: `Cal.`, fillColor: "#CCCCCC", alignment: "center" },
              { text: `Tipo`, fillColor: "#CCCCCC", alignment: "center" },
              { text: `Cajas`, fillColor: "#CCCCCC", alignment: "center" },
              { text: `Duct.`, fillColor: "#CCCCCC", alignment: "center" }
            ],
            [
              { text: `1`, alignment: "center", style: "td" },
              { text: ``, alignment: "center" },
              { text: ``, alignment: "center" },
              { text: ``, alignment: "center" },
              { text: ``, alignment: "center" },
              { text: ``, alignment: "center" },
              { text: ``, alignment: "center" },
              { text: ``, alignment: "center" },
              { text: ``, alignment: "center" },
              { text: ``, alignment: "center" },
              { text: ``, alignment: "center" },
              { text: ``, alignment: "center" },
              { text: ``, alignment: "center" },
              { text: ``, alignment: "center" },
              { text: ``, alignment: "center" },
              { text: ``, alignment: "center" },
              { text: ``, alignment: "center" },
              { text: ``, alignment: "center" }
            ]
          ]
        },
        layout: tableLayout
      },
      { qr: "12345", foreground: "red", background: "yellow", fit: "50" },
      {
        text: "This is a header, using header style",
        style: "header"
      },
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam.\n\n",
      {
        text: "Subheader 1 - using subheader style",
        style: "subheader"
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
      tableHeader: {
        fontSize: 8,
        margin: [0, 0, 0, 2]
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
