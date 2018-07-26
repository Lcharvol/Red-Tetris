import express from 'express';
import socketIo from 'socket.io';
import bodyParser from 'body-parser';

import debug from 'debug';
import fs from 'fs';

import { getUrl, bindError, bindLogger, bindCtx } from './helpers';
import eventListener from './eventListener';

const logger = debug('tetris:http');
const logerror = debug('tetris:http:error');

const init = async ctx => {
    
    const app = await express();
    const { server: { host, port } } = ctx.config;
    const httpServer = await app.listen(port, host, () => {
      httpServer.url = getUrl(httpServer);
      logger(`Connected at this address: ${httpServer.url}`);
    });

    const io = socketIo(httpServer);
    io.on('connection', function(socket){
        eventListener(socket, io);
    });

    const handler = (req, res) => {
        const file = req.url === '/bundle.js' ? '/../../../build/bundle.js' : '/../../../public/index.html';
        fs.readFile(__dirname + file, (err, data) => {
            if (err) {
                logerror(err)
                res.writeHead(500)
                return res.end('Error loading index.html')
            }
            res.writeHead(200)
            res.end(data)
        })
    }
  
    await app
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({ extended: true }))
        .use(bindCtx(ctx))
        .use(bindError)
        .use('/', handler);
    return ({ ...ctx, http: httpServer });
  };
  
  export default init;