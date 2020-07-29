const { getValue, emptyValue } = require("../../lib/utilities");
const { logoBase64 } = require("../../lib/imgBase64");

const report = async function (data) {
  const title = "Listado de usuarios";
  const subject = "Listado de los usuarios del sistema";
  const keywords = "usuarios";
  const project = getValue(data, "project", {});
  const details = getValue(data, "details", {});
  const logoDefault = "./assets/images/logo.png";
  const avatar = emptyValue(project, "avatar", "");
  const logo = await logoBase64(avatar, logoDefault).then((result) => {
    return result;
  });

  let details_print = [];
  details.list.map((item, i) => {
    const item_print = [
      { text: `${i + 1}`, alignment: "center", style: "td" },
      { text: `${item.caption}`, alignment: "left" },
      { text: `${item.username}`, alignment: "left" },
      { text: `${item.profile}`, alignment: "left" },
      { text: `${item.phone}`, alignment: "center" },
      { text: `${item.cellphone}`, alignment: "center" },
      { text: `${item.address}`, alignment: "left" },
    ];
    details_print.push(item_print);
  });

  const tableLayout = {
    paddingLeft: function () {
      return 1;
    },
    paddingRight: function () {
      return 1;
    },
    paddingTop: function () {
      return 1;
    },
    paddingBottom: function () {
      return 1;
    },
  };

  const definition = {
    pageSize: "LETTER",
    pageOrientation: "portrait",
    pageMargins: [28, 70, 28, 28],
    info: {
      title: title,
      author: "Josephine Platform",
      subject: subject,
      keywords: keywords,
    },
    compress: true,
    header: {
      margin: [28, 28, 28, 0],
      columns: [
        { width: 130, image: logo, fit: [130, 38] },
        { width: "*", text: `${project.caption.toUpperCase()}\n${title.toUpperCase()}`, alignment: "center", fontSize: 9 },
        { width: 130, text: "" },
      ],
    },
    footer: function (currentPage, pageCount) {
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
              { text: `Dirección`, fillColor: "#CCCCCC", alignment: "center" },
            ],
          ],
        },
        layout: tableLayout,
      },
      {
        style: "tableData",
        table: {
          widths: [15, "*", 120, 80, 50, 50, 120],
          heights: 20,
          headerRows: 2,
          body: details_print,
        },
        layout: tableLayout,
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
      },
      subheader: {
        fontSize: 15,
        bold: true,
      },
      quote: {
        italics: true,
      },
      small: {
        fontSize: 6,
      },
      footerPages: {
        fontSize: 8,
        alignment: "center",
      },
      pageHeader: {
        fontSize: 8,
        margin: [0, 0, 0, 2],
      },
      tableHeader: {
        fontSize: 8,
        margin: [0, 0, 0, 1],
      },
      tableData: {
        fontSize: 8,
        margin: [0, 0, 0, 2],
      },
      td: {
        height: 20,
      },
    },
  };
  return await definition;
};

module.exports = report;
