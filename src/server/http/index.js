import express from 'express';

import debug from 'debug';
import fs from 'fs';
import http from 'http';

import { getUrl, bindError, bindLogger, bindCtx } from './helpers';
import { BUNDLE_ERROR } from '../constants/messages';

const logger = debug('tetris:http');
const logerror = debug('tetris:http:error');

export const handler = (req, res) => {
    const file = req.url === '/bundle.js' ? '/../../../build/bundle.js' : '/../../../public/index.html';
    fs.readFile(__dirname + file, (err, data) => {
        if (err) {
            logerror(err)
            res.writeHead(500)
            return res.end(BUNDLE_ERROR)
        }
        res.writeHead(200)
        res.end(data)
    })
};

const init = ctx => {
    const { config } = ctx;
    const { server: { host, port } } = config;
    const app = express();
    const httpServer = http.createServer(app);
    const promise = new Promise((resolve) => {
        app
        .use(bindCtx(ctx))
        .use(bindError)
        .use('/', handler);

        httpServer.listen(port, host, () => {
            httpServer.url = getUrl(httpServer);
            logger(`server started on ${httpServer.url}`);
            resolve({ ...ctx, http: httpServer });
        });
    });

    return promise;
};
  
  export default init;