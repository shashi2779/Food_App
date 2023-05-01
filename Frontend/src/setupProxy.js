const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    // sare "api" se start hone wale 3000 prr bhej dega
    app.use("/api",
        createProxyMiddleware({
            // backend chal rha 3000 k upar , frontend chal rha 3001 k upar -> toh ye code redirect krr diya 3000[backend] k upar 
           // server ke home page ka link
            target: 'http://localhost:3000',
            changeOrigin: true,
        })
    );
};
