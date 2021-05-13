require('dotenv').config({path: '../../.env'});
const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');

const mainRoutes = require('./routes');

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use('/api/v1/api-gateway', mainRoutes);

app.listen(process.env.API_GATEWAY_PORT, () => {
    console.log(process.env.API_GATEWAY_PORT + " listening ");
})