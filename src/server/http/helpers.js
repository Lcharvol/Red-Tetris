import debug from 'debug';
import multer from 'multer';
import path from 'path';

export const getUrl = server => `http://${server.address().address}:${server.address().port}`;

export const bindCtx = (ctx) => (req, res, next) => {
  req.ctx = ctx;
  next();
};

export const bindError = (req, res, next) => {
  req.Err = (msg, er) => {
    const { stack } = new Error();
    try {
      res.status(201);
      res.json({ details: msg });
    } catch (err) {
      res.status(201);
      res.json({ details: msg });
    }
  };
  next();
};

export const bindLogger = (req, res, next) => {
  req.log = (msg) => {
    const { stack } = new Error();
    const regex = /\(.*[Mm]atcha\/src\/server\/(.*):(\d*):(\d*)\)/igm;
    const matches = regex.exec(stack.split('\n')[2]);
    const [file, line] = matches;
    const log = debug(`tetris:${file}:${line}`);
    log(msg);
  };
  next();
};