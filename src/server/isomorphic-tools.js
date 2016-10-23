const IsomorphicTools = require('webpack-isomorphic-tools');
const isomorphicConfig = require('../config/iso-config.js');
const paths = require('../config/paths');

const isomorphicTools = new IsomorphicTools(isomorphicConfig);

module.exports = {
  server() {
    return isomorphicTools
      .server(process.env.NODE_ENV === 'production' ? paths.COMPILED : paths.SRC)
      .then(() => {
        const assets = isomorphicTools.assets();
        return {
          javascript: Object.keys(assets.javascript).map((asset) => assets.javascript[asset]),
          styles: Object.keys(assets.styles).map((asset) => assets.styles[asset]),
          assets: assets.assets
        };
      });
  }
};
