const fs = require("fs");
const { getValue, getItem, getRow, genImgBase64, formatDate, getDateFormat } = require("../../lib/utilities");
const report = async function(data) {
  const fileStyle = "./assets/css/pdf.scss";
  const style = fs.readFileSync(fileStyle, "utf8");
  const logoDefault = genImgBase64("./assets/images/logo.png");
  const _now = formatDate(new Date(), "MMM d, yyyy");
  const title = "Operaciones por tipo";
  const master = getValue(data, "inform", {});
  const details = getValue(data, "details", []);
  const project = getValue(data, "project", {});
  const logo = getValue(project, "avatar", logoDefault);
  const config = {
    cols: [5, 12, 13, 12, 43.3, 13, 35],
    hrows: 3,
    hclass: "dt",
    footer: {
      cols: [35, 35, 35, 31.3],
      hrows: 8
    }
  };
  let body = "";
  let r = 0;
  let ri = 41;
  let rj = 41;
  let pt = 1;
  if (details.length - ri > 0) {
    pt = pt + Math.ceil((details.length - ri) / rj);
  }
  // prettier-ignore
  let pageHeader = `
  <div class="page-header">
    <div class="table border-0">
      <div class="col" style="width:35mm;">
        <img class="logo" src="${logo}">
      </div>
      <div class="col">
        <div class="tr">
          <div class="td t-c title" style="width:71.3mm;">${project.caption.toUpperCase()}</div>
        </div>
        <div class="tr">
          <div class="td t-c">${project.address}</div>
        </div>
        <div class="tr">
          <div class="td t-c">${title.toUpperCase()}</div>
        </div>
      </div>
      <div class="col" style="width:35mm;">
        <div class="tr">
          <div class="td t-r" style="width:35mm;">${_now}</div>
        </div>
        <div class="tr">
          <div class="td code">No. ${master.code}</div>
        </div>
      </div>
    </div>
  </div>`;
  // prettier-ignore
  let tableMaster = `
  <table>
    <tr class="bh">
      <td><div class="t-c" style="width:141.3mm;">${data.type.toUpperCase()}</div></td>
    </tr>
  </table>`;
  // prettier-ignore
  let tableMasterFooter = ``;
  // prettier-ignore
  let tableHeads = `
  <table>
  <tr>
    <th style="width:${config.cols[0]}mm;">#</th>
    <th style="width:${config.cols[1]}mm;">Reporte</th>
    <th style="width:${config.cols[2]}mm;">Fecha</th>
    <th style="width:${config.cols[3]}mm;">Operación</th>
    <th style="width:${config.cols[4]}mm;">Direccion</th>
    <th style="width:${config.cols[5]}mm;">Luminaria</th>
    <th style="width:${config.cols[6]}mm;">Tipo</th>
  </tr>`;
  // prettier-ignore
  let tableTotal = ``;
  let pages = [];
  // prettier-ignore
  for (var i = 0; i < pt; i++) {
    pages[i] = `<div class="page-body">`;
    if (i === 0) {
      pages[i] = pages[i] + tableMaster;
      for (var j = 0; j < ri; j++) {
        if (j === 0) {
          pages[i] = pages[i] + tableHeads;
        }
        const item = getItem(details, r);
        // prettier-ignore
        pages[i] = pages[i] +
        `<tr>
          <td><div class="${config.hclass} t-c" style="height:${config.hrows}mm;">${r+1}</div></td>
          <td><div class="${config.hclass} t-c" style="height:${config.hrows}mm;">${getValue(getRow(details, r, 'data', {}), 'report', '')}</div></td>
          <td><div class="${config.hclass} t-c" style="height:${config.hrows}mm;">${getDateFormat(item, 'date_int', 'MMM d, yyyy', '')}</div></td>
          <td><div class="${config.hclass} t-c" style="height:${config.hrows}mm;">${getRow(details, r, 'code', '')}</div></td>
          <td><div class="${config.hclass} t-e" style="height:${config.hrows}mm;">${getValue(getRow(details, r, 'data', {}), 'address', '')}</div></td>
          <td><div class="${config.hclass} t-c" style="height:${config.hrows}mm;">${getValue(getRow(details, r, 'data', {}), 'equipment_code', '')}</div></td>
          <td><div class="${config.hclass}" style="height:${config.hrows}mm;">${getValue(getRow(details, r, 'data', {}), 'component_tipe', '')}</div></td>
         </tr>`;
        r = r + 1;
      }
      pages[i] = pages[i] + tableTotal;
      pages[i] = pages[i] + '</table>';
    } else {
      for (var k = 0; k < rj; k++) {
        if (k === 0) {
          pages[i] = pages[i] + tableHeads;
        }
        const item = getItem(details, r);
        // prettier-ignore
        pages[i] = pages[i] +
        `<tr>
          <td><div class="${config.hclass} t-c" style="height:${config.hrows}mm;">${r+1}</div></td>
          <td><div class="${config.hclass} t-c" style="height:${config.hrows}mm;">${getValue(getRow(details, r, 'data', {}), 'report', '')}</div></td>
          <td><div class="${config.hclass} t-c" style="height:${config.hrows}mm;">${getDateFormat(item, 'date_int', 'MMM d, yyyy', '')}</div></td>
          <td><div class="${config.hclass} t-c" style="height:${config.hrows}mm;">${getRow(details, r, 'code', '')}</div></td>
          <td><div class="${config.hclass} t-e" style="height:${config.hrows}mm;">${getValue(getRow(details, r, 'data', {}), 'address', '')}</div></td>
          <td><div class="${config.hclass} t-c" style="height:${config.hrows}mm;">${getValue(getRow(details, r, 'data', {}), 'equipment_code', '')}</div></td>
          <td><div class="${config.hclass}" style="height:${config.hrows}mm;">${getValue(getRow(details, r, 'data', {}), 'component_tipe', '')}</div></td>
         </tr>`;
        r = r + 1;
      }
      // prettier-ignore
      pages[i] = pages[i] + tableTotal;
      pages[i] = pages[i] + '</table>';
    }
    pages[i] = pages[i] + tableMasterFooter;
    pages[i] = pages[i] + `</div>`;
  }
  // prettier-ignore
  for (var p = 0; p < pages.length; p++) {
    if (p > 0) {      
      body = body + '<div class="page-break"></div>';
    }
    body = body + '<div class="page">';
    body = body + pageHeader;
    body = body + pages[p];
    body =
      body +
      `<div class="page-fotter">
      <div class="page-counter">Pagina ${p + 1} de ${pages.length}</div></div>`;
    body = body + '</div>';
  }
  // prettier-ignore
  let html = `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
      <style>${style}</style>
    </head>    
    ${body}
  </html>
  `;
  return await html;
};

module.exports = report;
