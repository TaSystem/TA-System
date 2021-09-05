var express = require('express');
var router = express.Router();
var db = require('../config/db');

router.get("/",(req,res)=>{
    console.log("File downloaded!!!");
    res.download(__dirname+'../uploads/download/Header-form.csv','Header-form.csv');
})

module.exports = router;