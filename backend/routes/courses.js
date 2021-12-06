'use strict';
var express = require('express');
var router = express.Router();
var db = require('../config/db');
var upload = require('express-fileupload'); 
const csvtojson = require('csvtojson');

router.use(upload());

router.get('/',(req,res)=>{
    db.query("SELECT * FROM courses", (err,result)=>{
        if(err){
            console.log(err); 
        }
        else{
            res.send(result);
            console.log("course all officer");
        }
    });
})

router.get('/course-open',(req,res)=>{
  db.query("SELECT * FROM courses  WHERE year IN (SELECT DISTINCT(year) FROM datestudy  WHERE status = 1) AND term IN (SELECT DISTINCT(term) FROM datestudy  WHERE status = 1) ORDER BY courseID", (err,result)=>{
      if(err){
          console.log(err); 
      }
      else{
          res.send(result);
          console.log("course open");
      }
  });
})

router.get('/year',(req, res) => {
  db.query("SELECT DISTINCT year FROM courses ORDER BY year", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.get('/term',(req, res) => {
  db.query("SELECT DISTINCT term FROM courses", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.get('/sec/:id',(req, res) => {
  const id = req.params.id;
  let array = [];
  
  db.query("SELECT C.sec_D,C.sec_P FROM courses as C,teacherapplyta as TA WHERE  C.id =Ta.courseID AND TA.id = ?",id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if(result[0].sec_D){
        array.push(result[0].sec_D);
      }
      if(result[0].sec_P){
        let secP_Array = result[0].sec_P.split("_");
        for(let i = 0;i<secP_Array.length;i++){
        array.push(secP_Array[i]);
      }}
      console.log(array);
      res.send(array);
    }
  });
});

router.get('/student',(req,res)=>{
  db.query("SELECT C.id,C.courseID,C.title,C.sec_D,C.day_D,C.start_D,C.end_D,C.sec_P,C.day_P,C.start_P,C.end_P,C.major,C.teacher FROM courses as C,teacherapplyta as TA WHERE C.id=TA.courseID AND TA.status = 5 AND C.year IN (SELECT DISTINCT(year) FROM datestudy WHERE status = 1) AND C.term IN (SELECT DISTINCT(term) FROM datestudy WHERE status = 1 ) ORDER BY C.courseID", (err,result)=>{
      if(err){
          console.log(err); 
      }
      else{
          res.send(result);
          
      }
  });
})

router.get('/test',(req,res)=>{
  
  res.sendFile(__dirname+'/index.html');   
})

router.get("/student-history",(req,res)=>{
  db.query("SELECT C.courseID,C.title,C.level,C.major,C.teacher,C.sec_D,C.sec_P,C.day_D,C.start_D,C.end_D,C.day_P,C.start_P,C.end_P,C.year,C.term,C.number_D,C.number_P,C.numberReal,A.id as AID,A.status,A.hrperweek,A.noteapply,A.notereply,U.email,U.name_email,U.name,U.lastname,U.idStudent,U.department,U.tel,U.level as lvl,U.nameBank,U.idBank,U.fileCardStudent,U.fileBookBank FROM courses AS C,studentapplyta AS A,users AS U WHERE C.id = A.courseID AND U.id = A.userID",(err,result)=>{
    if(err){
      console.log(err);
    }
    else{
      res.send(result);
    }
  })
});

router.get("/teacher-apply/:email",(req,res)=>{
  const email = req.params.email;

  let checkRole = `SELECT R.id,R.title FROM users as U,roles as R,users_roles as UR WHERE U.id = UR.userID AND R.id = UR.roleID AND U.email = ?`;
  let historyUser = `SELECT C.courseID,C.title,C.level,C.major,C.teacher,C.sec_D,C.number_D,C.sec_P,C.number_P,C.day_D,C.day_P,C.start_D,C.end_D,C.start_P,C.end_P,C.numberReal,C.numberTAReal,C.year,C.term,A.id as AID,A.number1,A.number2,A.status,A.noteapply,A.notereply,U.email,U.name_email,U.name,U.lastname,U.department,U.tel,R.title as roleTitle FROM courses AS C,teacherapplyta AS A,users AS U,users_roles AS UR,roles AS R WHERE A.userID=U.id AND U.id=UR.userID AND R.id =UR.roleID AND C.id = A.courseID AND U.email = ?`;
  let historyAdmin = `SELECT C.courseID,C.title,C.level,C.major,C.teacher,C.sec_D,C.number_D,C.sec_P,C.number_P,C.day_D,C.day_P,C.start_D,C.end_D,C.start_P,C.end_P,C.numberReal,C.numberTAReal,C.year,C.term,A.id as AID,A.number1,A.number2,A.status,A.noteapply,A.notereply,U.email,U.name_email,U.name,U.lastname,U.department,U.tel,R.title as roleTitle FROM courses AS C,teacherapplyta AS A,users AS U,users_roles AS UR,roles AS R WHERE A.userID=U.id AND U.id=UR.userID AND R.id =UR.roleID AND C.id = A.courseID `;

  db.query(checkRole,email,(err,result)=>{
    if(err) throw err
    else{
      
      if(result[0].title=="เจ้าหน้าที่"){

        db.query(historyAdmin,(err,result)=>{
          if(err) throw err
          else{
              res.send(result);
          }
        });

      }
      else{//หัวหน้าภาค

        console.log("email: ",email);
        db.query(historyUser,email,(err,result)=>{
          if(err) throw err
          else{
            res.send(result);
          }
        })
        
      }
      
    }
  })
});

router.get('/:id',(req,res)=>{
  const id = req.params.id;
  db.query("SELECT * FROM courses WHERE id = ?", id,(err,result)=>{
      if(err){
          console.log(err);
      }
      else{
          res.send(result);
      }
  });
});

router.get("/request/:id",async (req, res) => {
  const id = req.params.id;
  await db.query("SELECT * FROM courses WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log("requestTA id:"+id);
    }
  });
});

router.get('/student-reply/:status',(req,res)=>{
  let status = req.params.status;
  let sqlcommand = `SELECT C.id as CID,C.courseID,C.title,C.level,C.major,C.teacher,C.sec_D,C.number_D,C.sec_P,C.number_P,C.day_D,C.day_P,C.start_D,C.end_D,C.start_P,C.end_P,C.numberReal,A.id as AID,A.status,A.hrperweek,A.noteapply,U.email,U.name_email,U.name,U.lastname,U.idStudent,U.department,U.tel,U.level as lvl,U.nameBank,U.idBank,U.fileCardStudent,U.fileBookBank,R.title as roleTitle,(SELECT U.name FROM teacherapplyta as TA,users as U WHERE U.id = TA.userID AND TA.status = 5 AND TA.courseID = C.id) as ownerName,(SELECT U.lastname FROM teacherapplyta as TA,users as U WHERE U.id = TA.userID AND TA.status = 5 AND TA.courseID = C.id) as ownerLastname FROM courses AS C,studentapplyta AS A,users AS U,users_roles AS UR,roles AS R WHERE C.id = A.courseID AND A.userID=U.id AND U.id=UR.userID AND R.id =UR.roleID AND C.year IN (SELECT DISTINCT(year) FROM datestudy WHERE status = 1) AND C.term IN (SELECT DISTINCT(term) FROM datestudy WHERE status = 1) AND A.status = ?`;
  
  db.query(sqlcommand,status,(err,result)=>{
      if(err){
          console.log(err);
      }
      else{
          res.send(result);
      }
  });
});

router.get('/courses-sa/:id',(req,res)=>{
  let userID = req.params.id;
  let sqlcommand = `SELECT C.id as CID,C.courseID,C.title,C.level,C.major,C.teacher,C.sec_D,C.number_D,C.sec_P,C.number_P,C.day_D,C.day_P,C.start_D,C.end_D,C.start_P,C.end_P,SA.hrperweek FROM courses as C,studentapplyta as SA WHERE C.id=SA.courseID AND SA.status = 3 AND SA.userID=? AND C.year IN (SELECT DISTINCT(year) FROM datestudy WHERE status = 1) AND C.term IN (SELECT DISTINCT(term) FROM datestudy WHERE status = 1) AND C.id IN (SELECT courseID FROM studentapplyta WHERE status=3 AND userID = ? ORDER BY C.courseID)`;
  
  db.query(sqlcommand,[userID,userID],(err,result)=>{
      if(err){
          console.log(err);
      }
      else{
          res.send(result);
      }
  });
  
});

router.get('/teacher-reply/:status',(req,res)=>{
  let status = req.params.status ;
    
  let sqlcommand = `SELECT C.id as CID,C.courseID,C.title,C.level,C.major,C.teacher,C.sec_D,C.number_D,C.sec_P,C.number_P,C.day_D,C.day_P,C.start_D,C.end_D,C.start_P,C.end_P,C.numberReal,C.numberTAReal,A.id as AID,A.number1,A.number2,A.status,A.noteapply,U.email,U.name_email,U.name,U.lastname,U.department,U.tel,R.title as roleTitle,(SELECT COUNT(*) FROM studentapplyta as SA,users as U WHERE U.id=SA.userID AND SA.status=3 AND SA.courseID = C.id) as number_SA FROM courses AS C,teacherapplyta AS A,users AS U,users_roles AS UR,roles AS R WHERE C.id = A.courseID AND A.userID=U.id AND U.id=UR.userID AND R.id =UR.roleID AND C.year IN (SELECT DISTINCT(year) FROM datestudy  WHERE status = 1) AND C.term IN (SELECT DISTINCT(term) FROM datestudy  WHERE status = 1) AND A.status = ? ORDER BY C.courseID`;
  let items = [status];
  db.query(sqlcommand,items,(err,result)=>{
      if(err){
          console.log(err);
      }
      else{
          
          res.send(result);
      }
  });
});

router.get("/student-apply-success/:email",(req,res)=>{
  const email = req.params.email;
  db.query("SELECT C.courseID,C.title,C.level,C.major,C.teacher,C.sec_D,C.sec_P,C.day_D,C.start_D,C.end_D,C.day_P,C.start_P,C.end_P,C.number_D,C.number_P,C.numberReal,A.id as AID,A.status,A.hrperweek FROM courses AS C,studentapplyta AS A ,users AS U WHERE C.id = A.courseID AND A.status = 3 AND U.id=A.userID AND C.year IN (SELECT DISTINCT(year) FROM datestudy WHERE status = 1) AND C.term IN (SELECT DISTINCT(term) FROM datestudy WHERE status = 1) AND U.email = ?",email,(err,result)=>{
    if(err){
      console.log(err);
    }
    else{
      res.send(result);
      console.log("course");
    }
  })
});

router.get("/student-request-success/:id",(req,res)=>{
  const id = req.params.id;
  db.query("SELECT C.courseID,C.title,C.level,C.major,C.teacher,C.sec_D,C.sec_P,C.day_D,C.start_D,C.end_D,C.day_P,C.start_P,C.end_P,C.number_D,C.number_P,C.numberReal,A.id as AID,A.status,A.hrperweek FROM courses AS C,studentapplyta AS A ,users AS U WHERE C.id = A.courseID AND A.status = 3 AND U.id=A.userID AND C.year IN (SELECT DISTINCT(year) FROM datestudy WHERE status = 1) AND C.term IN (SELECT DISTINCT(term) FROM datestudy WHERE status = 1) AND U.id = ?",id,(err,result)=>{
    if(err){
      console.log(err);
    }
    else{
      res.send(result);
      console.log("course");
    }
  })
});

router.post('/course-success',(req,res)=>{

  let role = req.body.role;
  let email = req.body.email;
  let sqlcommand,item=null;

  if(role == 1){
    sqlcommand = `SELECT C.id as CID,C.courseID,C.title,C.level,C.major,C.teacher,C.sec_D,C.number_D,C.sec_P,C.number_P,C.day_D,C.day_P,C.start_D,C.end_D,C.start_P,C.end_P,C.numberReal,C.numberTAReal,A.id as AID,A.number1,A.number2,A.status,A.noteapply,U.email,U.name_email,U.name,U.lastname,U.department,U.tel,R.title as roleTitle,(SELECT COUNT(*) FROM studentapplyta as SA,users as U WHERE U.id=SA.userID AND SA.status=3 AND SA.courseID = C.id) as number_SA FROM courses AS C,teacherapplyta AS A,users AS U,users_roles AS UR,roles AS R WHERE C.id = A.courseID AND A.userID=U.id AND U.id=UR.userID AND R.id =UR.roleID AND C.year IN (SELECT DISTINCT(year) FROM datestudy  WHERE status = 1) AND C.term IN (SELECT DISTINCT(term) FROM datestudy  WHERE status = 1) AND A.status = 5 ORDER BY C.courseID`;
  }
  else{
    sqlcommand = `SELECT C.id as CID,C.courseID,C.title,C.level,C.major,C.teacher,C.sec_D,C.number_D,C.sec_P,C.number_P,C.day_D,C.day_P,C.start_D,C.end_D,C.start_P,C.end_P,C.numberReal,C.numberTAReal,A.id as AID,A.number1,A.number2,A.status,A.noteapply,U.email,U.name_email,U.name,U.lastname,U.department,U.tel,R.title as roleTitle,(SELECT COUNT(*) FROM studentapplyta as SA,users as U WHERE U.id=SA.userID AND SA.status=3 AND SA.courseID = C.id) as number_SA FROM courses AS C,teacherapplyta AS A,users AS U,users_roles AS UR,roles AS R WHERE C.id = A.courseID AND A.userID=U.id AND U.id=UR.userID AND R.id =UR.roleID AND C.year IN (SELECT DISTINCT(year) FROM datestudy  WHERE status = 1) AND C.term IN (SELECT DISTINCT(term) FROM datestudy  WHERE status = 1) AND A.status = 5 AND U.email=? ORDER BY C.courseID`
    item=[email];
  }
  
  db.query(sqlcommand,item,(err,result)=>{
      if(err){
          console.log(err);
      }
      else{
          
          res.send(result);
      }
  });
});

router.post("/student-apply",(req,res)=>{
    const email = req.body.email;
    db.query("SELECT C.courseID,C.title,C.level,C.major,C.teacher,C.sec_D,C.sec_P,C.day_D,C.start_D,C.end_D,C.day_P,C.start_P,C.end_P,C.year,C.term,C.number_D,C.number_P,C.numberReal,A.id as AID,A.status,A.hrperweek,A.noteapply,A.notereply FROM courses AS C,studentapplyta AS A,users AS U WHERE C.id = A.courseID AND U.id = A.userID AND U.email = ?",email,(err,result)=>{
      if(err){
        console.log(err);
      }
      else{
        res.send(result);
        
      }
    })
});

router.post('/student-reply',(req,res)=>{
  let status = req.body.status;
  let roleID = req.body.roleID;
  let email = req.body.email;
  let sqlcommand,item;
  if(roleID==1){
    sqlcommand = `SELECT C.id as CID,C.courseID,C.title,C.level,C.major,C.teacher,C.sec_D,C.number_D,C.sec_P,C.number_P,C.day_D,C.day_P,C.start_D,C.end_D,C.start_P,C.end_P,C.numberReal,A.id as AID,A.status,A.hrperweek,A.noteapply,U.email,U.name_email,U.name,U.lastname,U.idStudent,U.department,U.tel,U.level as lvl,U.nameBank,U.idBank,U.fileCardStudent,U.fileBookBank,R.title as roleTitle,(SELECT U.id FROM teacherapplyta as TA,users as U WHERE U.id = TA.userID AND TA.status = 5 AND TA.courseID = C.id) as userID,(SELECT U.name FROM teacherapplyta as TA,users as U WHERE U.id = TA.userID AND TA.status = 5 AND TA.courseID = C.id) as ownerName,(SELECT U.lastname FROM teacherapplyta as TA,users as U WHERE U.id = TA.userID AND TA.status = 5 AND TA.courseID = C.id) as ownerLastname FROM courses AS C,studentapplyta AS A,users AS U,users_roles AS UR,roles AS R WHERE C.id = A.courseID AND C.year IN (SELECT DISTINCT(year) FROM datestudy  WHERE status = 1) AND C.term IN (SELECT DISTINCT(term) FROM datestudy  WHERE status = 1) AND A.userID=U.id AND U.id=UR.userID AND R.id =UR.roleID AND  A.status = ?`;
    item =[status];
  }

  else{
    sqlcommand = `SELECT C.id as CID,C.courseID,C.title,C.level,C.major,C.teacher,C.sec_D,C.number_D,C.sec_P,C.number_P,C.day_D,C.day_P,C.start_D,C.end_D,C.start_P,C.end_P,C.numberReal,A.id as AID,A.status,A.hrperweek,A.noteapply,U.name as ownerName ,U.lastname as ownerLastname, R.title as roleTitle,TA.userID,U2.email,U2.name_email,U2.name,U2.lastname,U2.idStudent,U2.department,U2.tel,U2.level as lvl,U2.nameBank,U2.idBank,U2.fileCardStudent,U2.fileBookBank FROM courses AS C,studentapplyta AS A,users AS U,users as U2,users_roles AS UR,roles AS R,teacherapplyta as TA  WHERE C.year IN (SELECT DISTINCT(year) FROM datestudy WHERE status = 1) AND C.term IN (SELECT DISTINCT(term) FROM datestudy WHERE status = 1) AND C.id = A.courseID AND TA.userID=U.id AND U.id=UR.userID AND R.id =UR.roleID AND A.courseID = TA.courseID AND U2.id = A.userID AND TA.status=5 AND A.status = ? AND U.email = ?`;
    item =[status,email];
  }
  console.log("item: ",item);
  
  db.query(sqlcommand,item,(err,result)=>{
      if(err){
          console.log(err);
      }
      else{
          res.send(result);
      }
  });
});



router.post('/teacher-reply',(req,res)=>{ //แสดงรายวิชาที่อาจารย์ยื่นขอ sa ของหัวหน้าภาค
  let email = req.body.email;
  let status = req.body.status ;
  let major=null;
  
  let checkRole = `SELECT R.id,R.title FROM users as U,roles as R,users_roles as UR WHERE U.id = UR.userID AND R.id = UR.roleID AND U.email = ?`;

  let courseAdmin = `SELECT C.id as CID,C.courseID,C.title,C.level,C.major,C.teacher,C.sec_D,C.number_D,C.sec_P,C.number_P,C.day_D,C.day_P,C.start_D,C.end_D,C.start_P,C.end_P,C.numberReal,C.numberTAReal,A.id as AID,A.number1,A.number2,A.status,A.noteapply,U.email,U.name_email,U.name,U.lastname,U.department,U.tel,R.title as roleTitle,(SELECT COUNT(*) FROM studentapplyta as SA,users as U WHERE U.id=SA.userID AND SA.status=3 AND SA.courseID = C.id) as number_SA FROM courses AS C,teacherapplyta AS A,users AS U,users_roles AS UR,roles AS R WHERE C.id = A.courseID AND A.userID=U.id AND U.id=UR.userID AND R.id =UR.roleID AND A.status = ?`;
  
  let courseHead = `SELECT C.id as CID,C.courseID,C.title,C.level,C.major,C.teacher,C.sec_D,C.number_D,C.sec_P,C.number_P,C.day_D,C.day_P,C.start_D,C.end_D,C.start_P,C.end_P,C.numberReal,C.numberTAReal,A.id as AID,A.number1,A.number2,A.status,A.noteapply,U.email,U.name_email,U.name,U.lastname,U.department,U.tel,R.title as roleTitle,(SELECT COUNT(*) FROM studentapplyta as SA,users as U WHERE U.id=SA.userID AND SA.status=3 AND SA.courseID = C.id) as number_SA FROM courses AS C,teacherapplyta AS A,users AS U,users_roles AS UR,roles AS R WHERE C.id = A.courseID AND A.userID=U.id AND U.id=UR.userID AND R.id =UR.roleID AND A.status = ? AND C.major = ?`;

  db.query(checkRole,email,(err,result)=>{
      if(err) throw err
      else{

        if(result[0].title=="เจ้าหน้าที่"){

          db.query(courseAdmin,[status],(err,result)=>{
            if(err) throw err
            else{
                res.send(result);
            }
          });

        }
        else{//หัวหน้าภาค

          major = result[0].title.substring(result[0].title.lastIndexOf(" ")+1);
          console.log("major: ",major)
          db.query(courseHead,[status,major],(err,result)=>{
            if(err) throw err
            else{
                res.send(result);
            }
          });
        }
        
        
      }
  });
});

router.post("/delete",(req,res)=>{ //multiple delete ลบรายวิชาที่เพิ่มจากเจ้าหน้าที่
  let year = req.body.year;
  let term = req.body.term;
  let major = req.body.major;
  let sqlcommand=null,item=null; 
  let message ;
  
  if(!year){
     sqlcommand = `TRUNCATE TABLE courses`;
     message = "ลบทั้งหมด";
     console.log("delete all");
  }
  else if(year){
    if(term){
      if(major){
        sqlcommand = `DELETE FROM courses WHERE year = ? AND term = ? AND major = ?`;
        item = [year,term,major];
        message = "ลบวิชาทั้งหมดวิชาของสาขา "+major+" ปีการศึกษา "+year+" ภาคเรียน "+term;
        console.log("delete at year,term,major");
      }
      else if(!major){
        sqlcommand = `DELETE FROM courses WHERE year = ? AND term = ?`;
        item = [year,term];
        message = "ลบวิชาทั้งหมดวิชาของ"+" ปีการศึกษา "+year+" ภาคเรียน "+term;
        console.log("delete at year,term");
      }
    }
    else if(!term){
      sqlcommand = `DELETE FROM courses WHERE year = ?`;
      item = [year]; 
      message = "ลบวิชาทั้งหมดวิชาของ"+" ปีการศึกษา "+year;
      console.log("delete at year");
    }
  }

  db.query(sqlcommand,item,(err,result)=>{
    if(err) throw(err);
    
    else{
      db.query("SELECT * FROM courses", (err,result)=>{
        if(err) throw(err);
        else{
            let respose = { message: message, data: result };
            res.send(respose);
            
        }
    });
    }
  })
});

router.post('/single-upload',(req,res)=>{//อัดโหลดไฟล์เดียว เพิ่มรายวิชาด้วย excel.csv
    let file = req.files.filename;
    let filename = Date.now()+'-'+file.name;
    let level = "ปริญญาตรี";
    let major = req.body.major;
    let year = req.body.year;
    let term = req.body.term;

    // var major   = name.substring(0, name.lastIndexOf("("));
    
    file.mv('./uploads/excel/'+ filename,(err)=>{
        if(err){
            res.send('fail to upload');
        }
        else{
            csvtojson().fromFile('./uploads/excel/'+filename).then(source=>{
                // res.send(source);
                // console.log(source.length);
                let success=0;
                let unsucess=0;
                let preSec,preDay,preStart,perEnd,preRoom,preMajor,preNUmber,preTeacher;

                for (let i = 0; i < source.length; i++) {
                    let courseID = source[i]["courseID"],
                        courseYear = source[i]["courseYear"],
                        title = source[i]["title"],
                        credit = source[i]["credit"],
                        unit_D = source[i]["unit_D"],
                        hr_D = source[i]["hr_D"],
                        sec_D = source[i]["sec_D"],
                        day_D = source[i]["day_D"],
                        start_D = source[i]["start_D"],
                        dat1 = source[i]["dat1"],
                        end_D = source[i]["end_D"],
                        room_D = source[i]["room_D"],
                        major_D = source[i]["major_D"],
                        number_D = source[i]["number_D"],
                        unit_P = source[i]["unit_P"],
                        hr_P = source[i]["hr_P"],
                        sec_P = source[i]["sec_P"],
                        day_P = source[i]["day_P"],
                        start_P = source[i]["start_P"],
                        dat2 = source[i]["dat2"],
                        end_P = source[i]["end_P"],
                        room_P = source[i]["room_P"],
                        major_P = source[i]["major_P"],
                        number_P = source[i]["number_P"],
                        teacher = source[i]["teacher"],
                        codeTeacher = source[i]["codeTeacher"],
                        subjectBefore = source[i]["subjectBefore"],
                        testTime = source[i]["testTime"],
                        central_M = source[i]["central_M"],
                        decentral_M = source[i]["decentral_M"],
                        central_F = source[i]["central_F"],
                        decentral_F = source[i]["decentral_F"],
                        note = source[i]["note"],
                        status = true,
                        numberTa = 0

                        // if(!courseID){
                          
                        // }
                        // else  if( !number_D && !number_P && number_D - number_P!=0 ){
                        //    preSec = sec_P
                        //    preDay
                        //    preStart
                        //    perEnd
                        //    preRoom
                        //    preMajor
                        //    preNUmber=number_P;
                        //    preTeacher
                        //    console.log("preNUmber: ",preNUmber);
                        //  }
                        
                        if(courseID=="03602312"){ //03602312 วิศวกรรมอุสาหการและระบบเบื้องต้น 1 คน 2ชม.
                          console.log("03602312 วิชาอุตขอได้พิเศษ");
                          success++;
                          numberTa = 1;
                        }
                        else if(courseID=="03602362"){//03602362 ระบบการผลิตอัตโนมัติ  1 คน 4ชม.
                          console.log("03602362 วิชาการผลิดขอได้พิเศษ");
                          success++;
                          numberTa = 1;
                        }
                        else if(courseID=="01999111"){
                          console.log(courseID +" "+ sec_D +" "+ sec_P +"ไม่รับนิสิต");//ศาสตร์แห่งแผ่นดิน
                          unsucess++;
                          status = false;
                        }
                        else if(courseID=="03601371"){
                          console.log(courseID +" "+ sec_D +" "+ sec_P +"ไม่รับนิสิต");//เตรียมก่อนฝึกงาน
                          unsucess++;
                          status = false;
                        }
                        else if(title=="Seminar"){
                          console.log(courseID +" "+ sec_D +" "+ sec_P +"สัมมนาไม่รับนิสิต");//สัมมนา
                          unsucess++;
                          status = false;
                        }
                        else if(number_P && number_D){//เงื่อนไขบรรยายและปฎิบัติ
                            if(number_D < 40){
                              console.log(courseID +" "+ sec_D +" "+ sec_P +"บรรยายและปฎิบัติมีน้อยกว่า 40 คน");
                              unsucess++;
                              status = false;
                              
                            }
                            else if(number_D >= 40 && number_D <= 60 ){
                              console.log(courseID +" "+ sec_D +" "+ sec_P +"บรรยายและปฎิบัติมี 40-60  คน");
                              success++;
                              numberTa = 1;
                              
                            }
                            else{
                              console.log(courseID +" "+ sec_D +" "+ sec_P +"บรรยายและปฎิบัติมีมากกว่า 60 คน");
                              success++;
                              numberTa = 2;
                              
                            }
                        }
                        else if(!number_P){//เงื่อนไขบรรยาย
                            if(number_D < 40){
                              console.log(courseID +" "+ sec_D +" "+ sec_P +"บรรยายมีน้อยกว่า 40 คน");
                              unsucess++;
                              status = false;
                            }
                            else if(number_D >= 40 && number_D <= 60 ){
                              console.log(courseID +" "+ sec_D +" "+ sec_P +"บรรยายมี 40-60  คน");
                              success++;
                              numberTa = 1;
                              
                            }
                            else{
                              console.log(courseID +" "+ sec_D +" "+ sec_P +"บรรยายมีมากกว่า 60 คน");
                              success++;
                              numberTa = 2;
                              
                            }
                        }
                        else if(!number_D){//เงื่อนไขปฎิบัติ   
                          console.log(courseID +" "+ sec_D +" "+ sec_P +"หมู่เรียนปฎิบัติให้ผ่านมาก่อน");
                          success++;
                          numberTa = 1;
                        }
                        else{
                          console.log(courseID +" "+ sec_D +" "+ sec_P +" "+"ไม่เข้าเงื่อนไขใดๆไม่มีสิทธิ์ขอ");
                          unsucess++;
                          status = false;
                        }

                    var insertStatement = `INSERT INTO courses (courseID,courseYear,title,credit,unit_D,hr_D,sec_D,day_D,start_D,dat1,end_D,
                          room_D,major_D,number_D,unit_P,hr_P,sec_P,day_P,start_P,dat2,end_P,room_P,major_P,number_P,teacher,codeTeacher,subjectBefore,
                          testTime,central_M,decentral_M,central_F,decentral_F,note,level,major,year,term,status,numberTa)
                          values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
                    var items = [courseID,courseYear,title,credit,unit_D,hr_D,sec_D,day_D,start_D,dat1,end_D,room_D,major_D,number_D,unit_P,
                          hr_P,sec_P,day_P,start_P,dat2,end_P,room_P,major_P,number_P,teacher,codeTeacher,subjectBefore,testTime,central_M,decentral_M,
                          central_F,decentral_F,note,level,major,year,term,status,numberTa];
              

                        db.query(insertStatement,items,(err,result,fields)=>{
                          if(err) throw err;
                        })
                }
                console.log("not pass total "+ unsucess + " Course");
                console.log("import total "+ success + " Course");
                res.send("import excel success");
                
            });
        }
    })


});


router.post("/multiple-upload", (req, res) => {//ไม่ได้ใช้ อัพโหลดไฟล์หลายไฟล์พร้อมกัน
  let file = req.files.filename;
  for (let i = 0; i < file.length; i++) {
    let filename = Date.now() + "-" + file[i].name;
    file[i].mv("./uploads/excel/" + filename, (err) => {
      if (err) {
        res.send("fail to upload");
      } else {
        csvtojson()
          .fromFile("./uploads/excel/" + filename)
          .then((source) => {
            // res.send(source);
            // console.log(source.length);
            let j = 0;
            for (var i = 0; i < source.length; i++) {
              var courseID = source[i]["courseID"],
                courseYear = source[i]["courseYear"],
                title = source[i]["title"],
                credit = source[i]["credit"],
                unit_D = source[i]["unit_D"],
                hr_D = source[i]["hr_D"],
                sec_D = source[i]["sec_D"],
                day_D = source[i]["day_D"],
                start_D = source[i]["start_D"],
                dat1 = source[i]["dat1"],
                end_D = source[i]["end_D"],
                room_D = source[i]["room_D"],
                major_D = source[i]["major_D"],
                number_D = source[i]["number_D"],
                unit_P = source[i]["unit_P"],
                hr_P = source[i]["hr_P"],
                sec_P = source[i]["sec_P"],
                day_P = source[i]["day_P"],
                start_P = source[i]["start_P"],
                dat2 = source[i]["dat2"],
                end_P = source[i]["end_P"],
                room_P = source[i]["room_P"],
                major_P = source[i]["major_P"],
                number_P = source[i]["number_P"],
                teacher = source[i]["teacher"],
                codeTeacher = source[i]["codeTeacher"],
                subjectBefore = source[i]["subjectBefore"],
                testTime = source[i]["testTime"],
                central_M = source[i]["central_M"],
                decentral_M = source[i]["decentral_M"],
                central_F = source[i]["central_F"],
                decentral_F = source[i]["decentral_F"],
                note = source[i]["note"];
                j++;

              var insertStatement = `INSERT INTO courses (courseID,courseYear,title,credit,unit_D,hr_D,sec_D,day_D,start_D,dat1,end_D,
                        room_D,major_D,number_D,unit_P,hr_P,sec_P,day_P,start_P,dat2,end_P,room_P,major_P,number_P,teacher,codeTeacher,subjectBefore,
                        testTime,central_M,decentral_M,central_F,decentral_F,note)
                        values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
              var items = [
                courseID,
                courseYear,
                title,
                credit,
                unit_D,
                hr_D,
                sec_D,
                day_D,
                start_D,
                dat1,
                end_D,
                room_D,
                major_D,
                number_D,
                unit_P,
                hr_P,
                sec_P,
                day_P,
                start_P,
                dat2,
                end_P,
                room_P,
                major_P,
                number_P,
                teacher,
                codeTeacher,
                subjectBefore,
                testTime,
                central_M,
                decentral_M,
                central_F,
                decentral_F,
                note,
              ];

              db.query(insertStatement, items, (err, result, fields) => {
                if (err) throw err;
                // else{

                //     console.log("items stored into database successfully");
                // }
              });
            }
            console.log("import total " + j + " Course");
          });
      }
    });
  }
  res.send("import excel success");
});

router.put('/updateNumber',(req,res)=>{ //เพิ่มจำนวนนิสิตที่ลงทะเบียนจริงๆ
  let id = req.body.id,
      numberReal = req.body.numberReal;
                      
  db.query("UPDATE courses SET numberReal = ? WHERE id = ?",[numberReal,id],(err,result)=>{
    if(err) throw(err);
    else{
      db.query("SELECT C.id as CID,C.courseID,C.title,C.level,C.major,C.teacher,C.sec_D,C.number_D,C.sec_P,C.number_P,C.day_D,C.day_P,C.start_D,C.end_D,C.start_P,C.end_P,C.numberReal,A.id as AID,A.number1,A.number2,A.status,A.noteapply,U.name_email FROM courses AS C,teacherapplyta AS A,users AS U WHERE C.id = A.courseID AND A.userID=U.id AND A.status = 4",(err,result)=>{
        if(err) throw(err);
        else{
          res.send(result);
          console.log("update จำนวนคนลงทะเบียน");
          
        }
      });
      
    }
  });
});

router.put('/update',(req,res)=>{ //ไม่ได้ใช้
    const id = req.body.id,
        courseID = req.body.courseID,
        courseYear = req.body.courseYear,
        title = req.body.title,
        credit = req.body.credit,
        unit_D = req.body.unit_D,
        hr_D = req.body.hr_D,
        sec_D = req.body.sec_D,
        day_D = req.body.day_D,
        start_D = req.body.start_D,
        dat1 = req.body.dat1,
        end_D = req.body.end_D,
        room_D = req.body.room_D,
        major_D = req.body.major_D,
        number_D = req.body.number_D,
        unit_P = req.body.unit_P,
        hr_P = req.body.hr_P,
        sec_P = req.body.sec_P,
        day_P = req.body.day_P,
        start_P = req.body.start_P,
        dat2 = req.body.dat2,
        end_P = req.body.end_P,
        room_P = req.body.room_P,
        major_P = req.body.major_P,
        number_P = req.body.number_P,
        teacher = req.body.teacher,
        codeTeacher =req.body.codeTeacher,
        subjectBefore = req.body.subjectBefore,
        testTime = req.body.testTime,
        central_M = req.body.central_M,
        decentral_M = req.body.decentral_M,
        central_F = req.body.central_F,
        decentral_F = req.body.decentral_F,
        note = req.body.note
                        
    db.query("UPDATE users SET courseID = ?,courseYear = ?,title = ?,credit = ?,unit_D = ?,hr_D = ?,sec_D = ?,day_D = ?,start_D = ?,dat1 = ?,end_D = ?,room_D = ?,major_D=? ,number_D = ?,unit_P = ?,hr_P =?,sec_P =?,day_P = ?,start_P =?,dat2 =?,end_P =?,room_P = ?,major_P =?,number_P = ?,teacher =?,codeTeacher = ?,subjectBefore =?,testTime =?,central_M =?,decentral_M =?,central_F =?,decentral_F =?,note =? WHERE id = ?"
    ,[courseID,courseYear,title,credit,unit_D,hr_D,sec_D,day_D,start_D,dat1,end_D,room_D,major_D,number_D,unit_P,hr_P,sec_P,day_P,start_P,dat2,end_P,room_P,major_P,number_P,teacher,codeTeacher,subjectBefore,testTime,central_M,decentral_M,central_F,decentral_F,note,id],(err,result)=>{
      if(err){
        console.log(err);
      }
      else{
        res.send("User Updated");
      }
    });
});



router.delete("/delete/:id",(req,res)=>{ //ลบทีละตัว
    const id = req.params.id;
    db.query("DELETE FROM courses WHERE id = ?",id,(err,result)=>{
      if(err) throw(err);
      else{
        db.query("SELECT * FROM courses",id,(err,result)=>{
          if(err){
            console.log(err);
          }
          else{
            let respose = { message: "ลบรายวิชาสำเร็จ", data: result };
            res.send(respose);
          }
        });
      }
    });
});

module.exports = router;