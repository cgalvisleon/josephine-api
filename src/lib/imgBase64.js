const axios = require("axios");
const path = require("path");
const { genImgBase64 } = require("./utilities");

const urlBase64 = async function(imgUrl) {
  const result = await axios.get(imgUrl, {
    responseType: "arraybuffer"
  });
  const ext = path.extname(imgUrl);
  const base64 = result.data.toString("base64");
  return `data:image/${ext.split(".").pop()};base64,${base64}`;
};

const logoBase64 = async function(url, defaultUrl) {
  if (url === "") {
    url = defaultUrl;
    return genImgBase64(url);
  } else {
    return await urlBase64(url).then(result => {
      return result;
    });
  }
};

module.exports = {
  urlBase64,
  logoBase64
};
