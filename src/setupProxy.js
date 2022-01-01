const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/chatService',
    createProxyMiddleware({
      target: 'https://chat-service-lost-n-found.herokuapp.com',
      changeOrigin: true,
      pathRewrite: { '^/chatService': '' },
    })
  );
};
