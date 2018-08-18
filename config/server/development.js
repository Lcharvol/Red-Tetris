const server = { host: 'localhost', port: 8080 };
const path = require('path');

module.exports = {
  httpCode: {
    Unauthorized: 201, // 401
    BadRequest: 202,  //  400
    Forbidden: 203,    // 403
    error: 306,       //  404
  },
  server,
  routes: {
  },
};
