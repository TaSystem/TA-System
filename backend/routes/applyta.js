var express = require('express');
var router = express.Router();
var db = require('../config/db');

router.post('/teacher-apply',(req,res)=>{
    let email = req.body.email;
    
    let courseID = req.body.courseID;
    let number1 = req.body.number1;
    let number2 = req.body.number2;
    let status = req.body.status;
    let noteapply = req.body.noteapply; 
    let id ;
    console.log(email);
    let sqlcommand = `INSERT INTO teacherapplyta (userID,courseID,number1,number2,status,noteapply) VALUE (?,?,?,?,?,?) `;
    // let applyItem = [id,courseID,number1,number2,status,noteapply];

    db.query("SELECT id FROM users WHERE email= ?",email,(err,result)=>{
        if(err) throw(err)
        else{
            console.log("result: ",result[0].id)
            id = result[0].id;
            console.log("id: ",id)
            db.query("SELECT * FROM teacherapplyta WHERE courseID = ?",courseID,(err,result)=>{
                console.log("id: ",result)
                if(err) throw(err)

                else if(!result[0]){
                    db.query(sqlcommand,[id,courseID,number1,number2,status,noteapply,id],(err,result)=>{
                        if(err) throw(err)
                        else{
                            res.send("Teacher apply success !!!");
                            console.log("Teacher apply success !!!");
                        }
                    }) 
                }
                else{
                    res.send("เคยขอแล้ว");
                    console.log("เคยขอแล้ว");
                }
            }) 
        }
    }) 

    
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