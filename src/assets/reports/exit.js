const fs = require("fs");
const { getValue, getData, getRow, getRowNumber, getRowMoney, formatDate, formatMoney, genImgBase64 } = require("../../lib/utilities");

const report = async function(title, data) {
  const fileStyle = "./assets/css/pdf.scss";
  const style = fs.readFileSync(fileStyle, "utf8");
  const logoDefault = genImgBase64("./assets/images/logo.png");
  const _now = formatDate(new Date(), "MMM d, yyyy");
  const master = data;
  const details = getValue(data, "details", []);
  const project = getData(data, "project", {});
  const logo = getValue(project, "avatar", logoDefault);
  const config = {
    cols: [4, 8, 12, 6, 85.3, 16],
    hrows: 3,
    hclass: "dt",
    footer: {
      cols: [35, 35, 35, 31.3],
      hrows: 8
    }
  };
  let body = "";
  let r = 0;
  let ri = 35;
  let rj = 35;
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
  <table class="w-100">
    <tr>
      <td colspan="2"><div class="">Bodega: ${master._data.cellar}</div></td>
      <td style="width:35mm;><div class="">Fecha de entrega: ${formatDate(master.date_of, 'MMM d, yyyy')}</div></td>
    </tr>
    <tr>
      <td colspan="2"><div class="">Destino: ${master._data.destino}</div></td>
      <td><div class="">${master._data.document_type}: ${master._data.document_code}</div></td>
    </tr>
  </table>`;
  // prettier-ignore
  let tableMasterFooter = `
  <table>
    <tr>
      <td style="width:${config.footer.cols[0]}mm;"><div class="" style="height:${config.footer.hrows}mm;"></div></td>
      <td style="width:${config.footer.cols[1]}mm;"><div class="" style="height:${config.footer.hrows}mm;"></div></td>
      <td style="width:${config.footer.cols[2]}mm;"><div class="" style="height:${config.footer.hrows}mm;"></div></td>
      <td style="width:${config.footer.cols[3]}mm;"><div class="" style="height:${config.footer.hrows}mm;"></div></td>
    </tr>
    <tr>
      <td><div class="">Recibio: ${master._data.recibio}</div></td>
      <td><div class="">Solicito: ${master._data.solicito}</div></td>
      <td><div class="">Entrego: ${master._data.entrego}</div></td>
      <td><div class="">Aprobo: ${master._data.aprobo}</div></td>
    </tr>
    <tr>
      <td colspan="4" class=""><div class="" style="height:5mm;">Observaciones: ${master.observations}</div></td>
    </tr>
  </table>`;
  // prettier-ignore
  let tableHeads = `
  <table>
  <tr>
    <th style="width:${config.cols[0]}mm;">#</th>
    <th style="width:${config.cols[1]}mm;">Referencia</th>
    <th style="width:${config.cols[2]}mm;">Cantidad</th>
    <th style="width:${config.cols[3]}mm;">Und</th>
    <th style="width:${config.cols[4]}mm;">Descripción</th>
    <th style="width:${config.cols[5]}mm;">Total</th>
  </tr>`;
  // prettier-ignore
  let tableTotal = `
  <tr class="bh">
    <td colspan="5"><div class="t-r" style="height:${config.hrows}mm;">Total</div></td>
    <td><div class="t-r" style="height:${config.hrows}mm;">${formatMoney(master.cost)}</div></td>
  </tr>`;
  // prettier-ignore
  let pages = [];
  for (var i = 0; i < pt; i++) {
    pages[i] = `<div class="page-body">`;
    if (i === 0) {
      pages[i] = pages[i] + tableMaster;
      for (var j = 0; j < ri; j++) {
        if (j === 0) {
          pages[i] = pages[i] + tableHeads;
        }
        // prettier-ignore
        pages[i] = pages[i] +
        `<tr>
          <td><div class="${config.hclass} t-c" style="height:${config.hrows}mm;">${r+1}</div></td>
          <td><div class="${config.hclass} t-c" style="height:${config.hrows}mm;">${getRow(details, r, 'code', '')}</div></td>
          <td><div class="${config.hclass} t-r" style="height:${config.hrows}mm;">${getRowNumber(details, r, 'quantity', '')}</div></td>
          <td><div class="${config.hclass} t-c" style="height:${config.hrows}mm;">${getRow(details, r, 'unity', '')}</div></td>
          <td><div class="${config.hclass} t-e" style="height:${config.hrows}mm;">${getRow(details, r, 'description', '')}</div></td>
          <td><div class="${config.hclass} t-r" style="height:${config.hrows}mm;">${getRowNumber(details, r, 'cost', '')}</div></td>
         </tr>`;
        r = r + 1;
      }
      pages[i] = pages[i] + tableTotal;
      pages[i] = pages[i] + "</table>";
    } else {
      for (var k = 0; k < rj; k++) {
        if (k === 0) {
          pages[i] = pages[i] + tableHeads;
        }
        // prettier-ignore
        pages[i] = pages[i] +
        `<tr>
          <td><div class="${config.hclass} t-c" style="height:${config.hrows}mm;">${r+1}</div></td>
          <td><div class="${config.hclass} t-c" style="height:${config.hrows}mm;">${getRow(details, r, 'code', '')}</div></td>
          <td><div class="${config.hclass} t-r" style="height:${config.hrows}mm;">${getRowNumber(details, r, 'quantity', '')}</div></td>
          <td><div class="${config.hclass} t-c" style="height:${config.hrows}mm;">${getRow(details, r, 'unity', '')}</div></td>
          <td><div class="${config.hclass} t-e" style="height:${config.hrows}mm;">${getRow(details, r, 'description', '')}</div></td>
          <td><div class="${config.hclass} t-r" style="height:${config.hrows}mm;">${getRowMoney(details, r, 'cost', '')}</div></td>
         </tr>`;
        r = r + 1;
      }
      // prettier-ignore
      pages[i] = pages[i] + tableTotal;
      pages[i] = pages[i] + "</table>";
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
