const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api/', { target: 'http://localhost:8080' }));
  app.use(proxy('/api-user/', { target: 'http://localhost:8080' }));
  app.use(proxy('/api-product/', { target: 'http://localhost:8080' }));
  app.use(proxy('/api-order/', { target: 'http://localhost:8080' }));
};