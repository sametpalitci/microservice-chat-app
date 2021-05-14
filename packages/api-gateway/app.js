require('dotenv').config({path: '../../.env'});
const express = require('express');
const app = express();
const cors = require('cors');
const {createProxyMiddleware} = require('http-proxy-middleware');
const registry = require('./registry');

const mainRoutes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/api/v1/api-gateway', mainRoutes);
app.use(
    createProxyMiddleware('/socket.io', {
        target: registry.host + ":" + registry.services['chat'].port,
        ws: true,
    })
);


app.listen(process.env.API_GATEWAY_PORT, () => {
    console.log(process.env.API_GATEWAY_PORT + " listening ");
});