const crypto = require("crypto");
const format = require("date-fns/format");
const getUnixTime = require("date-fns/getUnixTime");
const differenceInMinutes = require("date-fns/differenceInMinutes");
const { esLA } = require("date-fns/locale");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const mime = require("./mime");

const valid = function(a, b) {
  let result = false;
  const typea = typeof a;
  const typeb = typeof b;
  if (typea === typeb) {
    if (typea === "object" && Array.isArray(a)) {
      for (let i = 0; i < a.length; i++) {
        const vala = a[i];
        const valb = b[i];
        result = valid(vala, valb);
        if (result) {
          break;
        }
      }
    } else if (typeb === "object") {
      const bKeys = Object.keys(b).sort();
      for (let i = 0; i < bKeys.length; i++) {
        const key = bKeys[i];
        const vala = a[key];
        const valb = b[key];
        result = valid(vala, valb);
        if (result) {
          break;
        }
      }
    } else {
      result = a !== b;
    }
  }
  return result;
};

const equal = function(a, b) {
  let result = false;
  let msg = "";
  const typea = typeof a;
  const typeb = typeof b;
  if (typea === typeb) {
    if (typea === "object" && Array.isArray(a)) {
      for (let i = 0; i < a.length; i++) {
        const vala = a[i];
        const valb = b[i];
        result = equal(vala, valb);
        if (!result.result) {
          result = result.result;
          msg = result.msg;
          break;
        }
      }
    } else if (typea === "object") {
      const aKeys = Object.keys(a).sort();
      const bKeys = Object.keys(b).sort();
      if (aKeys.length !== bKeys.length) {
        result = false;
        msg = "Different Schema";
      } else if (aKeys.join("") !== bKeys.join("")) {
        result = false;
        msg = "Different Schema";
      } else {
        for (let i = 0; i < aKeys.length; i++) {
          const aKey = aKeys[i];
          const bKey = bKeys[i];
          const vala = a[aKey];
          const valb = b[bKey];
          result = equal(vala, valb);
          if (!result.result) {
            result = result.result;
            msg = { aKey };
            break;
          }
        }
      }
    } else {
      result = a === b;
      if (!result) {
        msg = { a, b };
      }
    }
  } else {
    msg = { msg: "Different type", typea, typeb };
  }
  return { result, msg };
};

const cryptoMd5 = function(value) {
  return crypto
    .createHash("md5")
    .update(value)
    .digest("hex");
};

const emptyValue = function(data, fieldName, _default) {
  if (data === undefined || data === null) {
    return _default;
  } else if (
    data[fieldName] === undefined ||
    data[fieldName] === null ||
    data[fieldName] === "" ||
    Object.keys(data[fieldName]).length === 0
  ) {
    return _default;
  } else {
    return data[fieldName];
  }
};

const getValue = function(data, fieldName, _default) {
  if (data === undefined || data === null) {
    return _default;
  } else if (data[fieldName] === undefined || data[fieldName] === null) {
    return _default;
  } else {
    return data[fieldName];
  }
};

const getData = function(result, fieldName, _default) {
  const data = getValue(result, "_data", {});
  return getValue(data, fieldName, _default);
};

const getStringify = function(data, fieldName, _default) {
  _default = _default || [];
  let result = "";
  if (data === undefined || data === null) {
    result = _default;
  } else if (data[fieldName] === undefined || data[fieldName] === null) {
    result = _default;
  } else {
    result = data[fieldName];
  }
  return JSON.stringify(result);
};

const getArray = function(data, fieldName) {
  if (data === undefined || data === null) {
    return "[]";
  } else if (data[fieldName] === undefined || data[fieldName] === null) {
    return "[]";
  } else {
    const result = data[fieldName];
    return `'${result}'`;
  }
};

const getDateValue = function(data, fieldName, _default) {
  _default = _default || new Date();
  const date = getValue(data, fieldName, _default);
  try {
    if (date === "") {
      return _default;
    } else {
      return new Date(date);
    }
  } catch (err) {
    return date;
  }
};

const getDateTime = function(data, fieldName, _default) {
  _default = _default || new Date();
  const date = getValue(data, fieldName, _default);
  try {
    return formatDate(new Date(date), "yyyy-MM-dd'T'HH:mm:ss");
  } catch (err) {
    return date;
  }
};

const getDate = function(data, fieldName, _default) {
  _default = _default || new Date();
  const date = getValue(data, fieldName, _default);
  try {
    return formatDate(new Date(date), "yyyy-MM-dd");
  } catch (err) {
    return date;
  }
};

const getDateFormat = function(data, fieldName, _format, _default) {
  _format = _format || "yyyy-MM-dd";
  _default = _default || "";
  const date = getValue(data, fieldName, _default);
  if (date === _default) {
    return date;
  } else {
    try {
      return formatDate(new Date(date), _format);
    } catch (err) {
      return date;
    }
  }
};

const getTime = function(data, fieldName, _default) {
  _default = _default || new Date();
  const date = getValue(data, fieldName, _default);
  try {
    return formatDate(new Date(date), "HH:mm:ss");
  } catch (err) {
    return date;
  }
};

const getDateDifference = function(data, fieldDateInt, fieldDateEnd, exclude) {
  const now = new Date();
  exclude = exclude || false;
  const dateInt = getDateValue(data, fieldDateInt, now);
  const dateEnd = getDateValue(data, fieldDateEnd, now);
  try {
    if (exclude) {
      return differenceInMinutes(dateEnd, dateInt);
    } else {
      return differenceInMinutes(dateEnd, dateInt);
    }
  } catch (err) {
    return 0;
  }
};

const getNumber = function(data, fieldName, _default) {
  const value = getValue(data, fieldName, _default);
  if (typeof value == "number") {
    return formatNumber(value, 2);
  } else {
    return value;
  }
};

const getMoney = function(data, fieldName, _default) {
  const value = getValue(data, fieldName, _default);
  if (typeof value == "number") {
    return formatMoney(value);
  } else {
    return value;
  }
};

const getPassword = function(data, fieldName) {
  if (data === undefined || data === null) {
    return "";
  } else if (data[fieldName] === undefined) {
    return "";
  } else {
    return cryptoMd5(data[fieldName]);
  }
};

const getPayload = function(value) {
  const payload = Buffer.from(value, "base64").toString();
  return JSON.parse(payload);
};

const getId = function(data) {
  if (data === undefined || data === null) {
    return genId("-1");
  } else if (data["_id"] === undefined || data["_id"] === null) {
    return genId("-1");
  } else {
    return data["_id"];
  }
};

const genId = function(id) {
  if (id === "-1" || id === "new") {
    return uuidv4();
  } else {
    return id;
  }
};

const genFileName = function(name, ext, size) {
  const now = new Date();
  const payload = {
    name: name,
    ext: ext,
    size: size,
    iat: getUnixTime(now)
  };
  const result = JSON.stringify(payload);
  return Buffer.from(result, "utf8").toString("base64");
};

const genImgBase64 = function(fileName) {
  const file = fs.readFileSync(fileName);
  const ext = path.extname(fileName);
  const base64 = file.toString("base64");
  return `data:image/${ext.split(".").pop()};base64,${base64}`;
};

const getItem = function(list, index) {
  if (list === undefined) {
    return {};
  } else if (list[index] === undefined) {
    return {};
  } else {
    return list[index];
  }
};

const getRow = function(list, index, fieldName, _default) {
  if (list === undefined) {
    return _default;
  } else if (list[index] === undefined) {
    return _default;
  } else if (list[index][fieldName] === undefined) {
    return _default;
  } else if (list[index][fieldName] === null) {
    return _default;
  } else {
    return list[index][fieldName];
  }
};

const getRowNumber = function(list, index, fieldName, _default) {
  _default = _default === undefined ? 0 : _default;
  const value = getRow(list, index, fieldName, _default);
  if (value === "") {
    return _default;
  } else {
    return formatNumber(value);
  }
};

const getRowMoney = function(list, index, fieldName, _default) {
  _default = _default === undefined ? 0 : _default;
  const value = getRow(list, index, fieldName, _default);
  if (value === "") {
    return _default;
  } else {
    return formatMoney(value);
  }
};

const getRowData = function(list, row, fieldName, _default) {
  const item = getItem(list, row);
  return getData(item, fieldName, _default);
};

const validStr = function(val, len) {
  len = len || 0;
  if (val === null) {
    return false;
  } else if (val === undefined) {
    return false;
  } else if (val.length === 0) {
    return false;
  } else if (len > 0) {
    return val.length >= len;
  } else {
    return true;
  }
};

const validEmail = function(value) {
  return /^\w+([.+-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(value);
};

const validCellPhone = function(value) {
  return /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(value);
};

const validValue = function(data, fieldName, valid, _default) {
  const value = getValue(data, fieldName, _default);
  if (value === valid) {
    return _default;
  } else {
    return value;
  }
};

const now = function(_format) {
  const date = new Date();
  _format = _format === undefined ? "dd/MM/yyyy HH:mm:SSSS" : _format;
  return formatDate(date, _format);
};

const div = function(divisor, dividendo) {
  if (dividendo === 0) {
    return divisor;
  } else {
    return divisor / dividendo;
  }
};

const number = function(value) {
  let result = Number(value);
  if (isNaN(result)) {
    result = 0;
  }
  return result;
};

const chart = function(str, int) {
  return str.charAt(int);
};

const formatDate = function(value, formato) {
  formato = formato || "dd/MM/yyyy"; /** 'dd/MM/yyyy HH:mm a' */
  try {
    return format(new Date(value), formato, { locale: esLA });
  } catch (err) {
    return value;
  }
};

const formatFloat = function(value, precision) {
  precision = precision || 2;
  if (value === undefined) {
    return "0";
  } else {
    value = number(value);
    value = value.toLocaleString("es-us", {
      maximumFractionDigits: precision,
      minimumFractionDigits: precision
    });
    return `${value}`;
  }
};

const formatNumber = function(value) {
  if (value === undefined) {
    return "0";
  } else {
    value = number(value);
    value = value.toLocaleString("es-CO", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    });
    return `${value}`;
  }
};

const formatInteger = function(value) {
  value = formatNumber(value);
  value = value.toString().split(",")[0];
  return value;
};

const formatMoney = function(value) {
  if (value === undefined) {
    return "$ 0";
  } else {
    value = number(value);
    value = value.toLocaleString("es-CO", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    });
    return `$ ${value}`;
  }
};

const formatDHM = function(value) {
  let M = Math.trunc(value / 43200);
  let Y = Math.trunc(M / 12);
  let d = Math.trunc((value - M * 43200) / 1440);
  let h = Math.trunc((value - M * 43200 - d * 1440) / 60);
  let m = Math.trunc(value - M * 43200 - d * 1440 - h * 60);
  M = Math.trunc(M - Y * 12);
  return Y > 0 ? `${Y}A ${M}M ${d}D ${h}H ${m}M` : M > 0 ? `${M}M ${d}D ${h}H ${m}M` : `${d}D ${h}H ${m}M`;
};

const setValue = function(data, fieldName, value) {
  if (data === undefined || data === null) {
    data = {};
    data[fieldName] = value;
  } else if (data[fieldName] === undefined || data[fieldName] === null) {
    data[fieldName] = value;
  } else {
    data[fieldName] = value;
  }
  return data;
};

const jsonToString = function(value) {
  return JSON.stringify(value);
};

const jsonBlank = function(value) {
  return JSON.stringify(value) === "{}";
};

const respond = function(status, data, msg, message) {
  return {
    status: status || 200,
    results: {
      msg: msg || "",
      message: message || "",
      data: data || {}
    }
  };
};

const section = function(s) {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const capitalize = function(s) {
  if (typeof s !== "string") return "";
  return s.replace(/(?:^|\s)\S(?!^|\s)/g, function(a) {
    return a.toUpperCase();
  });
};

const phone = function(s) {
  let cleaned = ("" + s).replace(/\D/g, "");
  let match = cleaned.match(/^(\d{2})(\d{3})(\d{4})$/);
  if (match) {
    return ["(+", match[1], ") ", match[2], "-", match[3]].join("");
  } else {
    match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return ["(", match[1], ") ", match[2], "-", match[3]].join("");
    }
  }
  return cleaned;
};

const float = function(s) {
  s = s.toString();
  const a = s.split(".");
  if (a.length > 1) {
    s = `${a[0]}.${a[1]}`;
  }
  s = s.replace(/[a-zA-Z-*+/=<>,:;?^${}()|[\]\\`~!@#%&]/g, "");
  return s;
};

const minicount = function(value) {
  if (value > 999999999) {
    const v = value / 1000000000;
    const i = v.toString().split(".")[0];
    const d = (v.toString().split(".")[1] || 0).toString().substring(0, 1) || 0;
    return `${i}.${d}B`;
  } else if (value > 999999) {
    const v = value / 1000000;
    const i = v.toString().split(".")[0];
    const d = (v.toString().split(".")[1] || 0).toString().substring(0, 1) || 0;
    return `${i}.${d}M`;
  } else if (value > 999) {
    const v = value / 1000;
    const i = v.toString().split(".")[0];
    const d = (v.toString().split(".")[1] || 0).toString().substring(0, 1) || 0;
    return `${i}.${d}K`;
  } else if (value <= 0 || !value) {
    return "";
  } else {
    return formatInteger(value);
  }
};

const appendStr = function(str, add, space) {
  str = str || "";
  add = add || "";
  space = space || " ";
  if (add.length === 0) {
    return str;
  } else if (str.length === 0) {
    return add;
  } else {
    return `${str}${space}${add}`;
  }
};

const MIME = function(ext) {
  return mime[ext] || "";
};

module.exports = {
  valid,
  equal,
  cryptoMd5,
  emptyValue,
  getValue,
  getData,
  getStringify,
  getArray,
  getDateValue,
  getDateTime,
  getDate,
  getDateFormat,
  getTime,
  getDateDifference,
  getNumber,
  getMoney,
  getPassword,
  getPayload,
  getId,
  genId,
  genFileName,
  genImgBase64,
  getItem,
  getRow,
  getRowNumber,
  getRowMoney,
  getRowData,
  validStr,
  validEmail,
  validCellPhone,
  validValue,
  now,
  div,
  number,
  chart,
  formatDate,
  formatFloat,
  formatNumber,
  formatInteger,
  formatMoney,
  formatDHM,
  setValue,
  jsonToString,
  jsonBlank,
  respond,
  section,
  capitalize,
  phone,
  float,
  minicount,
  appendStr,
  MIME
};
