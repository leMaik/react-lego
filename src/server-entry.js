require('babel-polyfill');
const debug = require('debug');
require('./config/environment');
const isoTools = require('./server/isomorphic-tools');

const log = debug('lego: server-entry');

isoTools.server()
  .then((assets) => {
    // important! this require must come after the isoTools server has started
    const createServer = require('./server/server'); //eslint-disable-line
    return createServer(assets);
  })
  .then((server) => {
    server.listen(process.env.PORT, () => {
      console.log(`listening at http://localhost:${process.env.PORT}`); // eslint-disable-line
    });
  })
  .catch((e) => log(e));
