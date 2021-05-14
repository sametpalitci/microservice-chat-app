const express = require('express');
const router = express.Router();
const axios = require('axios');

const registry = require('../registry');

router.all('/:apiName/:path', async (req, res) => {
    try {
        return await axios({
            method: req.method,
            headers: req.headers,
            data: req.body,
            params: req.query,
            url: registry.host + ":" + registry.services[req.params.apiName].port + "/" + req.params.path
        }).then((response) => {
            return res.json(response.data);
        }).catch((e) => {
            return res.status(e.response.status).json(e.response.data);
        });
    } catch (err) {
        return res.status(403).json({notice: "API Name doesn't exist", status: 'NO'})
    }

});
module.exports = router;