const fs = require("fs");
const {
  getValue,
  getData,
  getDate,
  getRow,
  getRowNumber,
  getRowMoney,
  now,
  formatDate,
  formatMoney,
  genImgBase64
} = require("../../lib/utilities");

const report = async function(title, data) {
  const fileStyle = "./assets/css/portrait.scss";
  const style = fs.readFileSync(fileStyle, "utf8");
  const logoDefault = genImgBase64("./assets/images/logo.png");
  const _now = now();
  const dateOf = getDate(data, "date_of", _now);
  const _data = getValue(data, "_data", {});
  const project = getData(data, "project", {});
  const details = getValue(data, "details", []);
  const logo = getValue(project, "avatar", logoDefault);
  const logoBase64 = logo;
  const page = 1;
  const pages = 1;
  const n = 23;
  let rows = "";
  for (var i = 0; i < n; i++) {
    const row = `    
    <div class="tr">
      <div class="td" style="width:5mm;height:5mm">
        <div class="label t-c">${i + 1}</div>
      </div>
      <div class="td" style="width:11mm;height:5mm">
        <div class="label t-c">${getRow(details, i, "code", "")}</div>
      </div>
      <div class="td" style="width:12mm;height:5mm">
        <div class="label t-r">${getRowNumber(details, i, "quantity", "")}</div>
      </div>
      <div class="td" style="width:8mm;height:5mm">
        <div class="label t-c e">${getRow(details, i, "unity", "")}</div>
      </div>
      <div class="td" style="width:40mm;height:5mm">
        <div class="label small">${getRow(details, i, "description", "")}</div>
      </div>
      <div class="td" style="width:16mm;height:5mm">
        <div class="label">${getRow(details, i, "manufacturer", "")}</div>
      </div>
      <div class="td" style="width:8mm;height:5mm">
        <div class="label t-c">${getRowNumber(details, i, "tax", "")}</div>
      </div>
      <div class="td" style="width:19mm;height:5mm">
        <div class="label t-r">${getRowMoney(details, i, "unitary", "")}</div>
      </div>
      <div class="td" style="width:21mm;height:5mm">
        <div class="label t-r">${getRowMoney(details, i, "cost", "")}</div>
      </div>
    </div>`;
    rows = rows + row;
  }
  let html = `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>${title} - ${data.code}</title>
      <style>${style}</style>
    </head>
    <body class="letter">
      <div class="table">
        <div class="tr th">
          <div class="td logo">
            <img class="img" style="width:38mm;height:13mm;" src="${logoBase64}">
          </div>
          <div class="col">
            <div class="tr">
              <div class="td" style="width:77.5mm;"><div class="label">${project.caption}</div></div>
            </div>
            <div class="tr">
              <div class="td" style="width:77.5mm;"><div class="label">${project.address}, ${project.city}</div></div>
            </div>
            <div class="tr">
              <div class="td" style="width:77.5mm;"><div class="label">${title}</div></div>
            </div>
          </div>
          <div class="col">
            <div class="tr">
              <div class="td bl0" style="width:25mm;"><div class="label">${formatDate(dateOf)}</div></div>
            </div>
            <div class="tr">
              <div class="td bl0" style="width:25mm;height:8.8mm;"><div class="code">${data.code}</div></div>
            </div>
          </div>
        </div>
      </div>      
      <div class="table">
        <div class="tr">
          <div class="td" style="width:16mm;"><div class="caption">Proveedor</div></div>
          <div class="td" style="width:84.5mm;"><div class="label">${_data.provider}</div></div>
          <div class="td" style="width:16mm;"><div class="caption">Despacho</div></div>
          <div class="td" style="width:25mm;"><div class="label t-c">${formatDate(dateOf)}</div></div>
        </div>
        <div class="tr">
          <div class="td" style="width:16mm;"><div class="caption">Dirección</div></div>
          <div class="td" style="width:43mm;"><div class="label">${_data.address}</div></div>
          <div class="td" style="width:16mm;"><div class="caption">Ciudad</div></div>
          <div class="td" style="width:25mm;"><div class="label">${_data.city}</div></div>
          <div class="td" style="width:16mm;"><div class="caption">RUT</div></div>
          <div class="td" style="width:25mm;"><div class="label t-c">${_data.rut}</div></div>
        </div>
        <div class="tr">
          <div class="td" style="width:16mm;"><div class="caption">Correo</div></div>
          <div class="td" style="width:43mm;"><div class="label">${_data.email}</div></div>
          <div class="td" style="width:16mm;"><div class="caption">Teléfono</div></div>
          <div class="td" style="width:25mm;"><div class="label">${_data.phone}</div></div>
          <div class="td" style="width:16mm;"><div class="caption">Celular</div></div>
          <div class="td" style="width:25mm;"><div class="label">${_data.cellphone}</div></div>
        </div>
      </div>      
      <div class="table">
        <div class="tr">
          <div class="td" style="width:16mm;"><div class="caption">Solicita</div></div>
          <div class="td" style="width:43mm;"><div class="label">${_data.request}</div></div>
          <div class="td" style="width:16mm;"><div class="caption">Autoriza</div></div>
          <div class="td" style="width:25mm;"><div class="label">${_data.authorize}</div></div>
          <div class="td" style="width:16mm;"><div class="caption">Pago</div></div>
          <div class="td" style="width:25mm;"><div class="label">${_data.pay}</div></div>
        </div>
      </div>
      <div class="table">
        <div class="tr th">
          <div class="td" style="width:16.1mm;"><div class="caption">Referencia</div></div>
          <div class="td" style="width:12.1mm;"><div class="caption">Cantidad</div></div>
          <div class="td" style="width:8mm;"><div class="caption">Und</div></div>
          <div class="td" style="width:40mm;"><div class="caption">Descripción</div></div>
          <div class="td" style="width:16mm;"><div class="caption">Fabricante</div></div>
          <div class="td" style="width:8mm;"><div class="caption">IVA</div></div>
          <div class="td" style="width:19mm;"><div class="caption">Unitario</div></div>
          <div class="td" style="width:21mm;"><div class="caption">Total</div></div>
        </div>
      </div>
      <div class="table">
      ${rows}
      </div>
      <div class="table">
        <div class="tr th">
          <div class="td" style="width:121mm;"><div class="caption t-r">Subtotal</div></div>
          <div class="td" style="width:21mm;"><div class="caption t-r">${formatMoney(data.cost)}</div></div>
        </div>
        <div class="tr th">
          <div class="td" style="width:121mm;"><div class="caption t-r">IVA</div></div>
          <div class="td" style="width:21mm;"><div class="caption t-r">${formatMoney(data.taxes)}</div></div>
        </div>
        <div class="tr th">
          <div class="td" style="width:121mm;"><div class="caption t-r">Total</div></div>
          <div class="td" style="width:21mm;"><div class="caption t-r">${formatMoney(data.total)}</div></div>
        </div>
      </div>
      <div class="table">
        <div class="tr th">
          <div class="td" style="width:50mm;height:12.5mm;"><div class="caption t-l">Autoriza</div></div>
          <div class="td" style="width:92mm;height:12.5mm;"><div class="caption t-l">Observación: ${data.observations}</div></div>
        </div>
      </div>
    </body>
    <footer>
      <div>
        <div class="date_print"> </div>        
        <div class="username"> </div>
        <div class="pages">Página ${page} de ${pages}</div>
      </div>
    </footer>
  </html>
  `;
  return await html;
};

module.exports = report;
