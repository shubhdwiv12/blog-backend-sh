const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const router = express.Router();

// Proxy requests to the User Service
router.use('/users', createProxyMiddleware({
    target: process.env.USER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '': '/api/v1/users' } 
}));

// Proxy requests to the Command Service (Blog write operations)
router.use('/blogs', createProxyMiddleware({
    target: process.env.COMMAND_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '': '/api/v1/blogs' }
}));

// Proxy requests to the Query Service (Blog read operations)
router.use('/blog-query', createProxyMiddleware({
    target: process.env.QUERY_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '': '/api/v1/blogs' }
}));

module.exports = router;
