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
                    db.query("SELECT name,lastname,level,department,tel FROM users WHERE email = ?",[email],(err,result)=>{
                        if(err) throw(err)
                        else{
                            if(!result[0].name || !result[0].lastname ||   !result[0].department || !result[0].tel ){
                                let response = {check:0,
                                    message: "กรอกข้อมูลอาจารย์ไม่ครบ !!!"}
                                res.send(response);
                                console.log("กรอกข้อมูลอาจารย์ไม่ครบ !!!");
                            }
                            else{
                                db.query(sqlcommand,[id,courseID,number1,number2,status,noteapply,id],(err,result)=>{
                                if(err) throw(err)
                                else{
                                    
                                    let response = {check:1,
                                        message: "ขอรายวิชาสำเร็จ !!!"}
                                    res.send(response);
                                    console.log("ขอรายวิชาสำเร็จ !!!");
                                }
                            }) 
                        }
                        }
                    }) 
                }
                else{
                    let response = {check:0,
                        message: "มีการขอวิชานี้แล้ว !!!"}
                    res.send(response);
                    console.log("มีการขอวิชานี้แล้ว !!!");
                }
            }) 
        }
    }) 

    
})

router.post('/student-apply',(req,res)=>{
    let userID = req.body.userID;
    let level = req.body.level;
    let courseID = req.body.courseID;
    let hrperweek = req.body.hrperweek;
    let status = req.body.status;
    let noteapply = req.body.noteapply;

    let sqlcommand = `INSERT INTO studentapplyta (userID,courseID,hrperweek,status,noteapply) VALUE (?,?,?,?,?)`;
    let applyItem = [userID,courseID,hrperweek,status,noteapply];
    
    let commandCheckHour = `SELECT SUM(A.hrperweek) as sumHour FROM courses AS C,studentapplyta AS A ,users AS U WHERE C.id = A.courseID  AND U.id=A.userID AND  C.year IN (SELECT DISTINCT(year) FROM datestudy  WHERE status = 1) AND C.term IN (SELECT DISTINCT(term) FROM datestudy  WHERE status = 1) AND U.id = ?`;

    db.query(commandCheckHour,userID,(err,result)=>{
        if(err) throw(err)
        else{
            console.log("sumHour: ",result[0].sumHour);
            console.log("level: ",level)
            if(result[0].sumHour>=10 && level=="ปริญญาตรี"){
                let response = {check:0,
                                message: level+" ยื่นขอได้ไม่เกิน 10 ชั่วโมง"}
                res.send(response);
                
            }
            else{

                db.query("SELECT name,lastname,idStudent,level,department,tel,nameBank,idBank,Branch,fileCardStudent,fileBookBank FROM users WHERE id = ?",userID,(err,result)=>{
                    if(err)throw err
                    else{
                        if(!result[0].name || !result[0].lastname || !result[0].idStudent || !result[0].level || !result[0].department || !result[0].tel || !result[0].nameBank || !result[0].idBank || !result[0].Branch || !result[0].fileCardStudent || !result[0].fileBookBank){
                            let response = {check:0,
                                message: "กรอกข้อมูลนิสิตไม่ครบ"}
                            res.send(response);
                        }
                        else{
                            db.query("SELECT courseID FROM `studentapplyta` WHERE userID=? AND courseID = ?",[userID,courseID],(err,result)=>{
                                if(err)throw err
                                else{
                                    
                                    if(result[0]){
                                        let response = {check:0,
                                            message: "เคยยื่นขอแล้ว"}
                                        res.send(response);
                                    }
                                    else{
                                        db.query(sqlcommand,applyItem,(err,result)=>{
                                            if(err)throw err
                                            else{
                                                let response = {check:1,
                                                    message: "ยื่นขอรายวิชาสำเร็จ"}
                                                res.send(response);
                                            }
                                        })
                                    }
                                    
                                }
                            })
                            
                        }
                    }
                })

                
            }
            
        }
    })
     
})


module.exports = router;