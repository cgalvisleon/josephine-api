const {
  emptyValue,
  formatDate,
  getData,
  getValue,
  getNumber,
  getMoney,
  getRow,
  getRowNumber,
  getRowMoney,
  formatNumber,
  formatMoney
} = require("../../lib/utilities");
const { logoBase64 } = require("../../lib/imgBase64");

const report = async function(data) {
  const title = "Entrada de almacen";
  const subject = "Entrada de almacen";
  const keywords = "entrada, almacen";
  const master = getValue(data, "master", {});
  const project = getData(master, "project", {});
  const details = getValue(master, "details", []);
  const movements = getValue(master, "movements", []);
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

  /** Details */
  let details_widths = [15, 50, 60, 40, "*", 80, 90];
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

  /** Movements */
  let movements_widths = [20, 45, "*", 30, 55, 60, 55, 60, 60];
  let movements_heights = [10];
  let movements_print = [
    [
      { text: `Kadex`, fillColor: "#CCCCCC", alignment: "center", colSpan: 9 },
      { text: `` },
      { text: `` },
      { text: `` },
      { text: `` },
      { text: `` },
      { text: `` },
      { text: `` },
      { text: `` }
    ],
    [
      { text: `\nReferencia`, fillColor: "#CCCCCC", alignment: "center", colSpan: 2, rowSpan: 2 },
      { text: `` },
      { text: `\nDescripción`, fillColor: "#CCCCCC", alignment: "center", rowSpan: 2 },
      { text: `\nUnd`, fillColor: "#CCCCCC", alignment: "center", rowSpan: 2 },
      { text: `Movimiento`, fillColor: "#CCCCCC", alignment: "center", colSpan: 2 },
      { text: `` },
      { text: `Saldo`, fillColor: "#CCCCCC", alignment: "center", colSpan: 3 },
      { text: `` },
      { text: `` }
    ],
    [
      { text: `` },
      { text: `` },
      { text: `` },
      { text: `` },
      { text: `Cantidad`, fillColor: "#CCCCCC", alignment: "center" },
      { text: `Costo`, fillColor: "#CCCCCC", alignment: "center" },
      { text: `Cantidad`, fillColor: "#CCCCCC", alignment: "center" },
      { text: `Costo`, fillColor: "#CCCCCC", alignment: "center" },
      { text: `Unitario`, fillColor: "#CCCCCC", alignment: "center" }
    ]
  ];
  movements.map((item, i) => {
    const int_quantity = getValue(item, "int_quantity", "");
    const int_cost = getValue(item, "int_cost", "");
    const end_quantity = getValue(item, "end_quantity", "");
    const end_cost = getValue(item, "end_cost", "");
    const item_print = [
      { text: `${i + 1}`, alignment: "center", style: "td", maxHeight: 12 },
      { text: `${getValue(item, "code", "")}`, alignment: "center", maxHeight: 12 },
      { text: `${getValue(item, "description", "")}`, alignment: "left", maxHeight: 12 },
      { text: `${getValue(item, "unity", "")}`, alignment: "center", maxHeight: 12 },
      { text: `${int_quantity > 0 ? formatNumber(int_quantity) : formatNumber(end_quantity * -1)}`, alignment: "right", maxHeight: 12 },
      { text: `${int_quantity > 0 ? formatMoney(int_cost) : formatMoney(end_cost * -1)}`, alignment: "right", maxHeight: 12 },
      { text: `${getNumber(item, "balance_quantity", "")}`, alignment: "right" },
      { text: `${getMoney(item, "balance_cost", "")}`, alignment: "right" },
      { text: `${getMoney(item, "unitary", "")}`, alignment: "right" }
    ];
    movements_heights.push(12);
    movements_print.push(item_print);
  });
  movements_heights.push(10);
  movements_print.push([
    { text: `Total`, fillColor: "#CCCCCC", alignment: "right", colSpan: 7 },
    { text: `` },
    { text: `` },
    { text: `` },
    { text: `` },
    { text: `` },
    { text: `` },
    { text: `${getMoney(master, "cost", "")}`, fillColor: "#CCCCCC", alignment: "right", colSpan: 2 },
    { text: `` }
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
          widths: [60, "*", 60, 160],
          heights: 10,
          headerRows: 1,
          body: [
            [
              { text: `Proveedor`, alignment: "left" },
              { text: `${getData(master, "proveedor", "").toUpperCase()}`, alignment: "left" },
              { text: `Entrega`, alignment: "left" },
              { text: `${formatDate(master.date_of, "MMMM d, yyyy")}`, alignment: "center" }
            ],
            [
              { text: `Bodega`, alignment: "left" },
              { text: `${getData(master, "cellar", "").toUpperCase()}`, alignment: "left" },
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
          widths: details_widths,
          heights: details_heights,
          headerRows: 1,
          body: details_print
        },
        layout: tableLayout
      },
      {
        style: "tableData",
        table: {
          widths: ["50%", "50%"],
          heights: [38, 38, 10],
          body: [
            [
              { text: `Observaciones: ${master.observations}`, alignment: "left", colSpan: 2, maxHeight: 38 },
              { text: ``, maxHeight: 38 }
            ],
            [
              { text: ``, maxHeight: 38 },
              { text: ``, maxHeight: 38 }
            ],
            [
              { text: `Recibio: ${getData(master, "recibio", "")}`, alignment: "center", maxHeight: 10 },
              { text: `Reviso: ${getData(master, "reviso", "")}`, alignment: "center", maxHeight: 10 }
            ]
          ]
        },
        layout: tableLayout
      },
      {
        text: "",
        pageBreak: "after"
      },
      {
        style: "tableList",
        table: {
          widths: movements_widths,
          heights: movements_heights,
          headerRows: 3,
          dontBreakRows: true,
          body: movements_print
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
