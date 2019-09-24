const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api', { target: 'http://localhost:8000/' }));
  app.use('/records', proxy({
    target: 'http://localhost:3000/records',
    changeOrigin: true,
  }));
};