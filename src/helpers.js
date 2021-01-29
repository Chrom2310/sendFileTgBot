const fs = require("fs");

exports.setStore = async function setStore(store = {}) {
  await fs.writeFileSync(`${__dirname}/store.json`, JSON.stringify(store));
};

exports.getStore = async function getStore() {
  const store = await fs.readFileSync(`${__dirname}/store.json`);
  return JSON.parse(store);
};

exports.checkFile = async function checkFile(path) {
    try {
        if (await fs.existsSync(`./tmp/${path}`)) {
            return true;
        }
        return false;
      } catch(err) {
        console.error(err)
      }
}