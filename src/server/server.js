import koa from 'koa';
import debug from 'debug';
import compress from 'koa-compress';

import handleError from './middleware/handle-error';
import logger from './middleware/logger';
import responseTime from './middleware/response-time';
import pageRenderers from './middleware/page-renderers';
import headers from './middleware/headers';
import { router, setRoutes } from './router';

const server = koa();
const log = debug('lego:server.js');
log('starting');

server.use(handleError('render500'));
server.use(responseTime());
server.use(compress({ threshold: 2048 }));
server.use(logger());
server.use(headers());
server.use(pageRenderers());

export default (assets) => {
  setRoutes(assets);
  server.use(router.routes());
  return server;
};
