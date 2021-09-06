var express = require('express');
var router = express.Router();
var db = require('../config/db');

router.post('/teacher-apply',(req,res)=>{
    let email = req.body.email;
    let userID = req.body.userID;
    let courseID = req.body.courseID;
    let number1 = req.body.number1;
    let number2 = req.body.number2;
    let status = req.body.status;
    let noteapply = req.body.noteapply; 
    console.log(email);
    let sqlcommand = `INSERT INTO teacherapplyta (userID,courseID,number1,number2,status,noteapply) VALUE (?,?,?,?,?,?)`;
    let applyItem = [userID,courseID,number1,number2,status,noteapply];
    // db.query(sqlcommand,applyItem,(err,result)=>{
    //     if(err){console.log(err)}
    //     else{
    //         res.send("Teacher apply success !!!");
    //     }
    // }) 
})


router.post('/student-apply',(req,res)=>{
    let userID = req.body.userID;
    let courseID = req.body.courseID;
    let hrperweek = req.body.hrperweek;
    let status = req.body.status;
    let noteapply = req.body.noteapply;

    let sqlcommand = `INSERT INTO studentapplyta (userID,courseID,hrperweek,status,noteapply) VALUE (?,?,?,?,?)`;
    let applyItem = [userID,courseID,hrperweek,status,noteapply];

    db.query(sqlcommand,applyItem,(err,result)=>{
        if(err){console.log(err)}
        else{
            res.send("student apply success !!!");
        }
    })
     
})



module.exports = router;