const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    const target = process.env.NODE_ENV === 'production'
        ? 'https://ebrains-workbench.apps-dev.hbp.eu'
        : 'http://localhost:8080';

    app.use(
        '/api',
        createProxyMiddleware({
            target,
            changeOrigin: true,
        })
    );
};