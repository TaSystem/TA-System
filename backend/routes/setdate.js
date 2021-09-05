var express = require('express');
var router = express.Router();
var db = require('../config/db');

router.get("/",(req,res)=>{
    db.query("SELECT * FROM datestudy",(err,result)=>{
       if(err) throw(err);
       else{
           res.send(result)
       } 
    });
})

router.post("/setDateStudy",(req,res)=>{
    let year = req.body.year;
    let term = req.body.term;
    let openDate = req.body.openDate;
    let closeDate = req.body.closeDate;
    let sqlcommand = `INSERT INTO datestudy (year,term,opendate,closedate) VALUE (?,?,?,?)`;
    let dateItems = [year,term,openDate,closeDate];
    db.query(sqlcommand,dateItems,(err,result)=>{
        if (err) throw(err); 
        else{
            res.send("set date study success!!!")
        }
    })
})

router.post("/setDateStop",(req,res)=>{
    let title = req.body.title;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    let sqlcommand = `INSERT INTO datestop (title,startDate,endDate) VALUE (?,?,?)`;
    let dateItems = [title,startDate,endDate];
    db.query(sqlcommand,dateItems,(err,result)=>{
        if (err) throw(err); 
        else{
            res.send("set date stop success!!!")
        }
    })
})

module.exports = router;