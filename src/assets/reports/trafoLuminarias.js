const fs = require("fs");
const { getValue, getRow, genImgBase64 } = require("../../lib/utilities");

const report = async function(title, data) {
  const fileStyle = "./assets/css/pdf.scss";
  const style = fs.readFileSync(fileStyle, "utf8");
  const logoDefault = genImgBase64("./assets/images/logo.png");
  const project = getValue(data, "project", {});
  const master = getValue(data, "master", {});
  const details = getValue(data, "details", []);
  const logo = getValue(project, "avatar", logoDefault);
  const config = {
    cols: [4, 8, 8, 7, 12, 12, 12, 12, 18, 8, 8, 5, 8, 8, 5, 8, 5, 5],
    hrows: 6,
    hclass: "dt"
  };
  let r = 0;
  let ri = 17;
  let rj = 18;
  let pt = 1 + Math.ceil((details.length - ri) / rj);

  let equipmen_data = getValue(master, "equipmen_data", {});
  let atribs = getValue(equipmen_data, "atribs", {});
  let master_data = getValue(master, "data", {});
  let master_data_atribs = getValue(master_data, "atribs", {});
  let tableMaster = `
  <div class="group">
    <div class="gr">
      <div class="gd" style="width:30mm">Tranformador: ${master.code}</div>
      <div class="gd" style="width:25mm">Tipo: ${getValue(atribs, "tipo", "")}</div>
      <div class="gd" style="width:15mm">Fases: ${getValue(atribs, "fases", "")}</div>
      <div class="gd" style="width:15mm">kVA: ${getValue(atribs, "kva", "")}</div>
      <div class="gd" style="width:25mm">Tensión de alta: ${getValue(atribs, "tension_de_alta", "")}</div>
      <div class="gd" style="width:25mm">Tensión de baja: ${getValue(atribs, "tension_de_baja", "")}</div>
      <div class="gd" style="width:46mm">Uso: ${getValue(master_data_atribs, "uso", "")}</div>
    </div>
    <div class="gr">
      <div class="gd" style="width:56mm">Sitio: ${master.address}</div>
      <div class="gd" style="width:58mm">Área: ${master.area}</div>
      <div class="gd" style="width:25mm">Circuito: ${getValue(master_data_atribs, "circuito", "")}</div>
      <div class="gd" style="width:30mm">Luminarias: ${details.length}</div>
    </div>
  </div>`;

  let tableHeads = `
  <table>
  <tr>
    <th colspan="7">Luminaria</th>
    <th colspan="2">Sitio</th>
    <th colspan="3">Poste</th>
    <th colspan="3">Red</th>
    <th colspan="3">Canalización</th>
  </tr>
  <tr>
    <th style="width:${config.cols[0]}mm;">#</th>
    <th style="width:${config.cols[1]}mm;">Código</th>
    <th style="width:${config.cols[2]}mm;">Fuente</th>
    <th style="width:${config.cols[3]}mm;">Pot.</th>
    <th style="width:${config.cols[4]}mm;">Tipo</th>
    <th style="width:${config.cols[5]}mm;">Balasto</th>
    <th style="width:${config.cols[6]}mm;">Control</th>
    <th style="width:${config.cols[7]}mm;">Tipo</th>
    <th style="width:${config.cols[8]}mm;">Sitio</th>
    <th style="width:${config.cols[9]}mm;">Código</th>
    <th style="width:${config.cols[10]}mm;">Material</th>
    <th style="width:${config.cols[11]}mm;">Long</th>
    <th style="width:${config.cols[12]}mm;">Tipo</th>
    <th style="width:${config.cols[13]}mm;">Material</th>
    <th style="width:${config.cols[14]}mm;">Cal</th>
    <th style="width:${config.cols[15]}mm;">Tipo</th>
    <th style="width:${config.cols[16]}mm;">Cajas</th>
    <th style="width:${config.cols[17]}mm;">Ductos</th>
  </tr>`;

  let pages = [];
  for (var i = 0; i < pt; i++) {
    pages[i] = `<div class="page-body">`;
    if (i === 0) {
      pages[i] = pages[i] + tableMaster;
      for (var j = 0; j < ri; j++) {
        if (j === 0) {
          pages[i] = pages[i] + tableHeads;
        }
        pages[i] =
          pages[i] +
          `<tr>
        <td><div class="${config.hclass} t-c" style="height:${config.hrows}mm;">${r + 1}</div></td>
        <td><div class="${config.hclass} t-c" style="height:${config.hrows}mm;">${getRow(details, r, "code", "")}</div></td>
        <td><div class="${config.hclass} t-c" style="height:${config.hrows}mm;">${getRow(details, r, "fuente", "")}</div></td>
        <td><div class="${config.hclass} t-c" style="height:${config.hrows}mm;">${getRow(details, r, "potencia", "")}</div></td>
        <td><div class="${config.hclass}" style="height:${config.hrows}mm;">${getRow(details, r, "clase", "")}</div></td>
        <td><div class="${config.hclass} t-o" style="height:${config.hrows}mm;">${getRow(details, r, "balasto_type", "")}</div></td>
        <td><div class="${config.hclass} t-o" style="height:${config.hrows}mm;">${getRow(details, r, "control", "")}</div></td>
        <td><div class="${config.hclass}" style="height:${config.hrows}mm;">${getRow(details, r, "sitio_tipo", "")}</div></td>
        <td><div class="${config.hclass} t-o" style="height:${config.hrows}mm;">${getRow(details, r, "address_short", "")}</div></td>
        <td><div class="${config.hclass} t-o" style="height:${config.hrows}mm;">${getRow(details, r, "apoyo", "")}</div></td>
        <td><div class="${config.hclass} t-o" style="height:${config.hrows}mm;">${getRow(details, r, "apoyo_material", "")}</div></td>
        <td><div class="${config.hclass} t-c" style="height:${config.hrows}mm;">${getRow(details, r, "apoyo_longitud", "")}</div></td>
        <td><div class="${config.hclass}" style="height:${config.hrows}mm;">${getRow(details, r, "red_tipo", "")}</div></td>
        <td><div class="${config.hclass}" style="height:${config.hrows}mm;">${getRow(details, r, "red_material", "")}</div></td>
        <td><div class="${config.hclass}" style="height:${config.hrows}mm;">${getRow(details, r, "red_calibre", "")}</div></td>
        <td><div class="${config.hclass}" style="height:${config.hrows}mm;">${getRow(details, r, "canalizacion_tipo", "")}</div></td>
        <td><div class="${config.hclass} t-r" style="height:${config.hrows}mm;">${getRow(details, r, "canalizacion_cajas", "")}</div></td>
        <td><div class="${config.hclass} t-r" style="height:${config.hrows}mm;">${getRow(details, r, "canalizacion_ductos", "")}</div></td>
        </tr>`;
        r = r + 1;
      }
      pages[i] = pages[i] + "</table>";
    } else {
      for (var k = 0; k < rj; k++) {
        if (k === 0) {
          pages[i] = pages[i] + tableHeads;
        }
        pages[i] =
          pages[i] +
          `<tr>
        <td><div class="${config.hclass} t-c" style="height:${config.hrows}mm;">${r + 1}</div></td>
        <td><div class="${config.hclass} t-c" style="height:${config.hrows}mm;">${getRow(details, r, "code", "")}</div></td>
        <td><div class="${config.hclass} t-c" style="height:${config.hrows}mm;">${getRow(details, r, "fuente", "")}</div></td>
        <td><div class="${config.hclass} t-c" style="height:${config.hrows}mm;">${getRow(details, r, "potencia", "")}</div></td>
        <td><div class="${config.hclass}" style="height:${config.hrows}mm;">${getRow(details, r, "clase", "")}</div></td>
        <td><div class="${config.hclass} t-o" style="height:${config.hrows}mm;">${getRow(details, r, "balasto_type", "")}</div></td>
        <td><div class="${config.hclass} t-o" style="height:${config.hrows}mm;">${getRow(details, r, "control", "")}</div></td>
        <td><div class="${config.hclass}" style="height:${config.hrows}mm;">${getRow(details, r, "sitio_tipo", "")}</div></td>
        <td><div class="${config.hclass} t-o" style="height:${config.hrows}mm;">${getRow(details, r, "address_short", "")}</div></td>
        <td><div class="${config.hclass} t-o" style="height:${config.hrows}mm;">${getRow(details, r, "apoyo", "")}</div></td>
        <td><div class="${config.hclass} t-o" style="height:${config.hrows}mm;">${getRow(details, r, "apoyo_material", "")}</div></td>
        <td><div class="${config.hclass} t-c" style="height:${config.hrows}mm;">${getRow(details, r, "apoyo_longitud", "")}</div></td>
        <td><div class="${config.hclass}" style="height:${config.hrows}mm;">${getRow(details, r, "red_tipo", "")}</div></td>
        <td><div class="${config.hclass}" style="height:${config.hrows}mm;">${getRow(details, r, "red_material", "")}</div></td>
        <td><div class="${config.hclass}" style="height:${config.hrows}mm;">${getRow(details, r, "red_calibre", "")}</div></td>
        <td><div class="${config.hclass}" style="height:${config.hrows}mm;">${getRow(details, r, "canalizacion_tipo", "")}</div></td>
        <td><div class="${config.hclass} t-r" style="height:${config.hrows}mm;">${getRow(details, r, "canalizacion_cajas", "")}</div></td>
        <td><div class="${config.hclass} t-r" style="height:${config.hrows}mm;">${getRow(details, r, "canalizacion_ductos", "")}</div></td>
         </tr>`;
        r = r + 1;
      }
      pages[i] = pages[i] + "</table>";
    }
    pages[i] = pages[i] + `</div>`;
  }

  let pageHeader = `
  <div class="page-header">
    <div class="table border-0">
      <div class="col" style="width:35mm;">
        <img class="logo" src="${logo}">
      </div>
      <div class="col">
        <div class="tr">
          <div class="td t-c title" style="width:125mm;">${project.caption.toUpperCase()}</div>
        </div>
        <div class="tr">
          <div class="td t-c">${project.address}</div>
        </div>
        <div class="tr">
          <div class="td t-c">${title.toUpperCase()}</div>
        </div>
      </div>
      <div class="col" style="width:35mm;">
      </div>
    </div>
  </div>`;

  let body = "";
  for (var p = 0; p < pages.length; p++) {
    if (p > 0) {
      body = body + '<div class="page-break"></div>';
    }
    body = body + '<div class="page landscape">';
    body = body + pageHeader;
    body = body + pages[p];
    body =
      body +
      `<div class="page-fotter">
      <div class="page-counter">Pagina ${p + 1} de ${pages.length}</div></div>`;
    body = body + "</div>";
  }

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
