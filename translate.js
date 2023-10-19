const { translate } = require('bing-translate-api');
async function tr(to, text) {
    try {
      const res = await translate(text, null, to, false);
      return res.translation;
    } catch (error) {
      return "#The_American_News";
    }
  }

const translateText = (to, text) => {
    const translation = await tr(to, text);
  }
  module.exports = { translateText }