const { emptyValue, formatDate, getData, getValue, getMoney, getRow, getRowNumber, getRowMoney } = require("../../lib/utilities");
const { logoBase64 } = require("../../lib/imgBase64");

const report = async function(data) {
  const title = "Orden de compra";
  const subject = "Entrada de almacen";
  const keywords = "entrada, almacen";
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

  const rows = 23;
  const maxHeight = 20;
  const details_widths = [15, 50, 50, 35, "*", 65, 20, 60, 75];
  let details_heights = [10];
  let details_print = [
    [
      { text: `Referencia`, fillColor: "#CCCCCC", alignment: "center", colSpan: 2 },
      { text: `` },
      { text: `Cantidad`, fillColor: "#CCCCCC", alignment: "center" },
      { text: `Und`, fillColor: "#CCCCCC", alignment: "center" },
      { text: `Descripción`, fillColor: "#CCCCCC", alignment: "center" },
      { text: `Fabricante`, fillColor: "#CCCCCC", alignment: "center" },
      { text: `IVA`, fillColor: "#CCCCCC", alignment: "center" },
      { text: `Unitario`, fillColor: "#CCCCCC", alignment: "center" },
      { text: `Total`, fillColor: "#CCCCCC", alignment: "center" }
    ]
  ];
  for (let i = 0; i < rows; i++) {
    details_heights.push(maxHeight);
    const item_print = [
      { text: `${i + 1}`, alignment: "center", style: "td", maxHeight },
      { text: `${getRow(details, i, "code", "")}`, alignment: "center", maxHeight },
      { text: `${getRowNumber(details, i, "quantity", "")}`, alignment: "right", maxHeight },
      { text: `${getRow(details, i, "unity", "")}`, alignment: "center", maxHeight },
      { text: `${getRow(details, i, "description", "")}`, alignment: "left", maxHeight },
      { text: `${getRow(details, i, "manufacturer", "")}`, alignment: "left", maxHeight },
      { text: `${getRowNumber(details, i, "tax", "")}`, alignment: "center", maxHeight },
      { text: `${getRowMoney(details, i, "unitary", "")}`, alignment: "right", maxHeight },
      { text: `${getRowMoney(details, i, "cost", "")}`, alignment: "right", maxHeight }
    ];
    details_print.push(item_print);
  }
  details_heights.push(10);
  details_print.push([
    { text: `Subtotal`, fillColor: "#CCCCCC", alignment: "right", colSpan: 8 },
    { text: `` },
    { text: `` },
    { text: `` },
    { text: `` },
    { text: `` },
    { text: `` },
    { text: `` },
    { text: `${getMoney(master, "cost", "")}`, fillColor: "#CCCCCC", alignment: "right" }
  ]);
  details_heights.push(10);
  details_print.push([
    { text: `IVA`, fillColor: "#CCCCCC", alignment: "right", colSpan: 8 },
    { text: `` },
    { text: `` },
    { text: `` },
    { text: `` },
    { text: `` },
    { text: `` },
    { text: `` },
    { text: `${getMoney(master, "taxes", "")}`, fillColor: "#CCCCCC", alignment: "right" }
  ]);
  details_heights.push(10);
  details_print.push([
    { text: `Total`, fillColor: "#CCCCCC", alignment: "right", colSpan: 8 },
    { text: `` },
    { text: `` },
    { text: `` },
    { text: `` },
    { text: `` },
    { text: `` },
    { text: `` },
    { text: `${getMoney(master, "total", "")}`, fillColor: "#CCCCCC", alignment: "right" }
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
          text: [{ text: `No. ${master.code}`, alignment: "right", fontSize: 14 }]
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
          widths: [50, "*", 40, 160, 40, 75],
          heights: 10,
          headerRows: 1,
          dontBreakRows: true,
          body: [
            [
              { text: `Proveedor`, alignment: "left" },
              { text: `${getData(master, "provider", "").toUpperCase()}`, alignment: "left", colSpan: 3 },
              { text: `` },
              { text: `` },
              { text: `Despacho`, alignment: "left" },
              { text: `${formatDate(master.date_of, "MMMM d, yyyy")}`, alignment: "center" }
            ],
            [
              { text: `Dirección`, alignment: "left" },
              { text: `${getData(master, "address", "").toUpperCase()}`, alignment: "left" },
              { text: `Ciudad`, alignment: "left" },
              { text: `${getData(master, "city", "").toUpperCase()}`, alignment: "left" },
              { text: `RUT`, alignment: "left" },
              { text: `${getData(master, "rut", "")}`, alignment: "center" }
            ],
            [
              { text: `Correo`, alignment: "left" },
              { text: `${getData(master, "email", "")}`, alignment: "left" },
              { text: `Teléfono`, alignment: "left" },
              { text: `${getData(master, "phone", "")}`, alignment: "center" },
              { text: `Celular`, alignment: "left" },
              { text: `${getData(master, "cellphone", "")}`, alignment: "center" }
            ]
          ]
        },
        layout: tableLayout
      },
      {
        style: "tableData",
        table: {
          widths: [50, "*", 40, 160, 40, 75],
          heights: 10,
          headerRows: 1,
          dontBreakRows: true,
          body: [
            [
              { text: `Solicita`, alignment: "left" },
              { text: `${getData(master, "request", "").toUpperCase()}`, alignment: "left" },
              { text: `Autoriza`, alignment: "left" },
              { text: `${getData(master, "authorize", "").toUpperCase()}`, alignment: "left" },
              { text: `Pago`, alignment: "left" },
              { text: `${getData(master, "pay", "").toUpperCase()}`, alignment: "center" }
            ]
          ]
        },
        layout: tableLayout
      },
      {
        style: "tableList",
        table: {
          widths: details_widths,
          heights: details_heights,
          headerRows: 1,
          dontBreakRows: true,
          body: details_print
        },
        layout: tableLayout
      },
      {
        style: "tableData",
        table: {
          widths: ["30%", "70%"],
          heights: [35, 10],
          body: [
            [{ text: `` }, { text: `Observaciones: ${master.observations}`, alignment: "left", rowSpan: 2 }],
            [{ text: `Autoriza: ${getData(master, "authorize", "")}` }, { text: `` }]
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
