var express = require('express');
var router = express.Router();
var db = require('../config/db');


router.put('/teacher-reply',(req,res)=>{
  let id = req.body.id;
  let status = req.body.status;
  // let notereply = req.body.notereply;
  let userID = req.body.userID;

  let sqlcommand = `UPDATE teacherapplyta SET status = ? WHERE id = ?`;
  let applyItem = [status,id];
  db.query(sqlcommand,applyItem,(err,result)=>{
      if(err){console.log(err)}
      else{
          db.query("INSERT INTO userreplyteacher value (?,?,?)",[id,userID,status],(err,result)=>{
            if(err) console.log(err)
            else{
            db.query("SELECT C.id,C.courseID,C.title,C.level,C.major,C.teacher,C.sec_D,C.sec_P,A.number1,A.number2,A.status,A.noteapply,U.name_email FROM courses AS C,Teacherapplyta AS A,users AS U WHERE C.id = A.courseID AND A.userID=U.id AND A.status = ?",(status-1),(err,result)=>{
                if(err) console.log(err);
                else{
                  res.send(result);
                  console.log("success reply!!!")
                }
            }
            )}
          })
      }
  })
})

router.put('/teacher-reply-note',(req,res)=>{
  let id = req.body.id;
  let notereply = req.body.notereply;

  let sqlcommand = `UPDATE teacherapplyta SET note = ? WHERE id = ?`;
  let applyItem = [notereply,id];
  db.query(sqlcommand,applyItem,(err,result)=>{
      if(err){console.log(err)}
      else{
          res.send("Teacher reply note!!!");
      }
  })
})


router.put('/student-reply',(req,res)=>{
  let id = req.body.id;
  let status = req.body.status;
  // let notereply = req.body.notereply;
  let userID = req.body.userID;
  

  let sqlcommand = `UPDATE studentapplyta SET status = ? WHERE id = ?`;
  let applyItem = [status,id];

  db.query(sqlcommand,applyItem,(err,result)=>{
      if(err){console.log(err)}
      else{
        db.query("INSERT INTO userreplystudent value (?,?,?)",[id,userID,status],(err,result)=>{
          if(err) console.log(err)
          else{
            db.query("SELECT C.id,C.courseID,C.title,C.level,C.major,C.teacher,C.sec_D,C.sec_P,A.status,U.name_email FROM courses AS C,studentapplyta AS A,users AS U WHERE C.id = A.courseID AND A.userID=U.id AND A.status = 1",(err,result)=>{
                if(err){
                  console.log(err);
                }
                else{
                  res.send(result);
                  console.log("success reply!!!")
                }
            })
          }
        })
      }
  })
})

router.put('/student-reply-note',(req,res)=>{
  let id = req.body.id;
  let note = req.body.note;

  let sqlcommand = `UPDATE studentapplyta SET note = ? WHERE id = ?`;
  let applyItem = [note,id];
  db.query(sqlcommand,applyItem,(err,result)=>{
      if(err){console.log(err)}
      else{
          res.send("student reply note!!!");
      }
  })
})


module.exports = router;