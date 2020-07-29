const { emptyValue, formatMoney, getValue, getRow, getRowNumber, getRowMoney } = require("../../lib/utilities");
const { logoBase64 } = require("../../lib/imgBase64");

const report = async function(data) {
  const title = "Existencias de almacen";
  const subject = "Existencias de almacen";
  const keywords = "existencias, almacen";
  const master = getValue(data, "master", {});
  const project = getValue(data, "project", {});
  const details = getValue(data, "details", {});
  const list = getValue(details, "list", []);
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

  let tables_widths = [20, 50, "*", 70, 40, 70, 80];
  let tables = [];
  let table = {};
  let details_heights = [];
  let details_print = [];
  let bodega = "";
  let item_print = [];
  let index = 0;
  let total = 0;
  list.map((item, i) => {
    if (bodega !== item.cellar) {
      if (details_print.length > 0) {
        item_print = [
          { text: `Total`, fillColor: "#CCCCCC", alignment: "right", colSpan: 6 },
          { text: `` },
          { text: `` },
          { text: `` },
          { text: `` },
          { text: `` },
          { text: `${formatMoney(total)}`, fillColor: "#CCCCCC", alignment: "right" }
        ];
        details_heights.push(10);
        details_print.push(item_print);
        table = {
          style: "tableList",
          table: {
            widths: tables_widths,
            heights: details_heights,
            headerRows: 2,
            dontBreakRows: true,
            body: details_print
          },
          layout: tableLayout
        };
        tables.push(table);
        tables.push({ text: "", pageBreak: "after" });
      }
      details_heights = [];
      details_print = [];
      total = 0;
      index = 0;
      item_print = [
        { text: `Bodega`, fillColor: "#CCCCCC", alignment: "left", colSpan: 2 },
        { text: `` },
        { text: `${item.cellar.toUpperCase()}`, fillColor: "#CCCCCC", alignment: "left", colSpan: 5 },
        { text: `` },
        { text: `` },
        { text: `` },
        { text: `` }
      ];
      details_heights.push(10);
      details_print.push(item_print);
      item_print = [
        { text: `Referencia`, fillColor: "#CCCCCC", alignment: "center", colSpan: 2 },
        { text: `` },
        { text: `Descripción`, fillColor: "#CCCCCC", alignment: "center" },
        { text: `Unitario`, fillColor: "#CCCCCC", alignment: "center" },
        { text: `Und`, fillColor: "#CCCCCC", alignment: "center" },
        { text: `Existencia`, fillColor: "#CCCCCC", alignment: "center" },
        { text: `Total`, fillColor: "#CCCCCC", alignment: "center" }
      ];
      details_heights.push(10);
      details_print.push(item_print);
      bodega = item.cellar;
    }
    index = index + 1;
    item_print = [
      { text: `${index}`, alignment: "center", style: "td", maxHeight: 12 },
      { text: `${getRow(list, i, "code", "")}`, alignment: "center", maxHeight: 12 },
      { text: `${getRow(list, i, "caption", "")}`, alignment: "left", maxHeight: 12 },
      { text: `${getRowMoney(list, i, "unitary", "")}`, alignment: "right" },
      { text: `${getRow(list, i, "unity", "")}`, alignment: "center", maxHeight: 12 },
      { text: `${getRowNumber(list, i, "stock", "")}`, alignment: "right", maxHeight: 12 },
      { text: `${getRowMoney(list, i, "cost", "")}`, alignment: "right" }
    ];
    total = total + item.cost;
    details_heights.push(12);
    details_print.push(item_print);
  });
  item_print = [
    { text: `Total`, fillColor: "#CCCCCC", alignment: "right", colSpan: 6 },
    { text: `` },
    { text: `` },
    { text: `` },
    { text: `` },
    { text: `` },
    { text: `${formatMoney(total)}`, fillColor: "#CCCCCC", alignment: "right" }
  ];
  details_heights.push(10);
  details_print.push(item_print);
  table = {
    style: "tableList",
    table: {
      widths: tables_widths,
      heights: details_heights,
      headerRows: 2,
      dontBreakRows: true,
      body: details_print
    },
    layout: tableLayout
  };
  tables.push(table);
  tables.unshift({
    style: "tableData",
    table: {
      widths: [60, "*", 60, 90],
      heights: 10,
      headerRows: 1,
      dontBreakRows: true,
      body: [
        [
          { text: `Almacen`, alignment: "left" },
          { text: `${getValue(master, "caption", "").toUpperCase()}`, alignment: "left", maxHeight: 10 },
          { text: `Ciudad`, alignment: "left" },
          { text: `${getValue(master, "city", "").toUpperCase()}`, alignment: "right", maxHeight: 10 }
        ],
        [
          { text: `Almacenista`, alignment: "left" },
          { text: `${getValue(master, "storer", "").toUpperCase()}`, alignment: "left", maxHeight: 10 },
          { text: `Costo`, alignment: "left" },
          { text: `${formatMoney(master.cost)}`, alignment: "right", maxHeight: 10 }
        ],
        [
          { text: `Descripción`, alignment: "left" },
          { text: `${getValue(master, "description", "").toUpperCase()}`, alignment: "left", colSpan: 3, maxHeight: 10 },
          { text: `` },
          { text: `` }
        ]
      ]
    },
    layout: tableLayout
  });

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
          text: []
        }
      ]
    },
    footer: function(currentPage, pageCount) {
      return [{ text: currentPage.toString() + " de " + pageCount, style: "footerPages" }];
    },
    content: tables,
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
