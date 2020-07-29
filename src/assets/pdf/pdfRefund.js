const { emptyValue, formatDate, getData, getValue, getMoney, getRow, getRowNumber, getRowMoney } = require("../../lib/utilities");
const { logoBase64 } = require("../../lib/imgBase64");

const report = async function(data) {
  const now = new Date();
  const title = "Reintegro de almacen";
  const subject = "Reintegro de almacen";
  const keywords = "reintegro, almacen";
  const master = getValue(data, "master", {});
  const project = getData(master, "project", {});
  const details = getValue(master, "details", []);
  const logoDefault = "./assets/images/logo.png";
  const avatar = emptyValue(project, "avatar", "");
  const logo = await logoBase64(avatar, logoDefault);
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

  let details_heights = [10];
  let details_print = [
    [
      { text: `Referencia`, fillColor: "#CCCCCC", alignment: "center", colSpan: 2 },
      { text: `` },
      { text: `Cantidad`, fillColor: "#CCCCCC", alignment: "center" },
      { text: `Und`, fillColor: "#CCCCCC", alignment: "center" },
      { text: `Descripción`, fillColor: "#CCCCCC", alignment: "center" },
      { text: `Unitario`, fillColor: "#CCCCCC", alignment: "center" },
      { text: `Total`, fillColor: "#CCCCCC", alignment: "center" }
    ]
  ];
  for (let i = 0; i < 35; i++) {
    details_heights.push(12);
    const item_print = [
      { text: `${i + 1}`, alignment: "center", style: "td", maxHeight: 12 },
      { text: `${getRow(details, i, "code", "")}`, alignment: "center", maxHeight: 12 },
      { text: `${getRowNumber(details, i, "quantity", "")}`, alignment: "right", maxHeight: 12 },
      { text: `${getRow(details, i, "unity", "")}`, alignment: "center", maxHeight: 12 },
      { text: `${getRow(details, i, "description", "")}`, alignment: "left", maxHeight: 12 },
      { text: `${getRowMoney(details, i, "unitary", "")}`, alignment: "right" },
      { text: `${getRowMoney(details, i, "cost", "")}`, alignment: "right" }
    ];
    details_print.push(item_print);
  }
  details_heights.push(10);
  details_print.push([
    { text: `Total`, fillColor: "#CCCCCC", alignment: "right", colSpan: 6 },
    { text: `` },
    { text: `` },
    { text: `` },
    { text: `` },
    { text: `` },
    { text: `${getMoney(master, "cost", "")}`, fillColor: "#CCCCCC", alignment: "right" }
  ]);

  const definition = {
    pageSize: "LETTER",
    pageOrientation: "portrait",
    pageMargins: [28, 68, 28, 28],
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
        {
          width: "*",
          text: `${project.caption.toUpperCase()}\n${project.address.toUpperCase()}\n${title.toUpperCase()}`,
          alignment: "center",
          fontSize: 9
        },
        {
          width: 130,
          text: [
            { text: `No. ${master.code}`, alignment: "right", fontSize: 14 },
            { text: `\nFecha: ${formatDate(now, "MMMM d, yyyy")}`, alignment: "right", fontSize: 9 }
          ]
        }
      ]
    },
    footer: function(currentPage, pageCount) {
      return [{ text: currentPage.toString() + " de " + pageCount, style: "footerPages" }];
    },
    content: [
      {
        style: "tableData",
        table: {
          widths: [60, "*", 60, 160],
          heights: 10,
          headerRows: 1,
          body: [
            [
              { text: `Bodega`, alignment: "left" },
              { text: `${getData(master, "cellar", "").toUpperCase()}`, alignment: "left" },
              { text: `Reintegro`, alignment: "left" },
              { text: `${formatDate(master.date_of, "MMMM d, yyyy")}`, alignment: "center" }
            ],
            [
              { text: `Reintegra`, alignment: "left" },
              { text: `${getData(master, "reintegra", "").toUpperCase()}`, alignment: "left" },
              { text: `${getData(master, "document_type", "")}`, alignment: "left" },
              { text: `${getData(master, "document_code", "")}`, alignment: "center" }
            ]
          ]
        },
        layout: tableLayout
      },
      {
        style: "tableData",
        table: {
          widths: [60, "*", 60, 160],
          heights: 10,
          headerRows: 1,
          body: [
            [
              { text: `Recibio`, alignment: "left" },
              { text: `${getData(master, "recibio", "").toUpperCase()}`, alignment: "left" },
              { text: `Reviso`, alignment: "left" },
              { text: `${getData(master, "reviso", "").toUpperCase()}`, alignment: "left" }
            ]
          ]
        },
        layout: tableLayout
      },
      {
        style: "tableList",
        table: {
          widths: [15, 50, 60, 40, "*", 80, 90],
          heights: details_heights,
          headerRows: 1,
          body: details_print
        },
        layout: tableLayout
      },
      {
        style: "tableData",
        table: {
          widths: ["33%", "33%", "34%"],
          heights: [38, 38, 10],
          body: [
            [
              { text: `Observaciones: ${master.observations}`, alignment: "left", colSpan: 3, maxHeight: 38 },
              { text: ``, maxHeight: 38 },
              { text: ``, maxHeight: 38 }
            ],
            [
              { text: ``, maxHeight: 38 },
              { text: ``, maxHeight: 38 },
              { text: ``, maxHeight: 38 }
            ],
            [
              { text: `Reintegra: ${getData(master, "reintegra", "")}`, alignment: "center", maxHeight: 10 },
              { text: `Recibio: ${getData(master, "recibio", "")}`, alignment: "center", maxHeight: 10 },
              { text: `Reviso: ${getData(master, "reviso", "")}`, alignment: "center", maxHeight: 10 }
            ]
          ]
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
      tableData: {
        fontSize: 8,
        margin: [0, 0, 0, 2]
      },
      tableList: {
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
