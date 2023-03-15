const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    if (process.env.NODE_ENV === 'production') {
        var target =  'https://ebrains-workbench.apps-dev.hbp.eu'
    }
    else {
        var target = 'http://localhost:8080'
    }
    app.use(
        '/api',
        createProxyMiddleware({
            target: target,
            changeOrigin: true,
        })
    );
};
