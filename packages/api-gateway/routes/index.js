const express = require('express');
const router = express.Router();
const axios = require('axios');

const registry = require('../registry');

router.all('/:apiName/:path',(req,res)=>{
    try {
        axios({
            method:req.method,
            headers:req.headers,
            body:req.body,
            url:registry.host+":"+registry.services[req.params.apiName].port +"/"+ req.params.path
        }).then((response)=>{
            res.json(response.data);
        });
    } catch (err){
        return res.status(403).json({notice:"API Name doesn't exist",status:'NO'})
    }

});

module.exports = router;