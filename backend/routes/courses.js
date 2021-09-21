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

router.get('/student',(req,res)=>{
  db.query("SELECT C.id,C.courseID,C.title,C.sec_D,C.day_D,C.start_D,C.end_D,C.sec_P,C.day_P,C.start_P,C.end_P,C.major,C.teacher FROM courses as C,teacherapplyta as TA WHERE C.id=TA.courseID AND TA.status = 5 ORDER BY TA.courseID", (err,result)=>{
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

router.get("/teacher-apply",(req,res)=>{
  
  db.query("SELECT C.courseID,C.title,C.level,C.major,C.teacher,A.number1,A.number2,A.status FROM courses AS C,teacherapplyta AS A WHERE C.id = A.courseID",(err,result)=>{
    if(err){
      console.log(err);
    }
    else{
      res.send(result);
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

router.post("/student-apply-success",(req,res)=>{
  const email = req.body.email;
  db.query("SELECT C.courseID,C.title,C.level,C.major,C.teacher,C.sec_D,C.sec_P,C.day_D,C.start_D,C.end_D,C.day_P,C.start_P,C.end_P,A.status FROM courses AS C,studentapplyta AS A ,users AS U WHERE C.id = A.courseID AND A.status = 3 AND U.id=A.userID AND U.email = ?",email,(err,result)=>{
    if(err){
      console.log(err);
    }
    else{
      res.send(result);
      console.log("course");
    }
  })
});

router.post("/student-apply",(req,res)=>{
    const email = req.body.email;
    db.query("SELECT C.courseID,C.title,C.level,C.major,C.teacher,A.status FROM courses AS C,studentapplyta AS A,users AS U WHERE C.id = A.courseID AND U.id = A.userID AND U.email = ?",email,(err,result)=>{
      if(err){
        console.log(err);
      }
      else{
        res.send(result);
        console.log("hisory reuest:",email);
      }
    })
});

router.post('/student-reply',(req,res)=>{
    
  let status = req.body.status;    
  let sqlcommand = `SELECT C.courseID,C.title,C.level,C.major,C.teacher,C.sec_D,C.sec_P,A.id,A.userID,A.status,A.noteapply,U.name_email FROM courses AS C,studentapplyta AS A,users AS U WHERE C.id = A.courseID AND A.userID=U.id AND A.status = ?`;
  
  db.query(sqlcommand,status,(err,result)=>{
      if(err){
          console.log(err);
      }
      else{
          res.send(result);
      }
  });
});

router.post('/teacher-reply',(req,res)=>{//รอส่ง userID
  let status = req.body.status ;
    
  let sqlcommand = `SELECT C.id as CID,C.courseID,C.title,C.level,C.major,C.teacher,C.sec_D,C.number_D,C.sec_P,C.number_P,C.day_D,C.day_P,C.start_D,C.end_D,C.start_P,C.end_P,C.numberReal,A.id as AID,A.number1,A.number2,A.status,A.noteapply,U.email,U.name_email,U.name,U.lastname,U.department,U.tel,R.title as roleTitle FROM courses AS C,teacherapplyta AS A,users AS U,users_roles AS UR,roles AS R WHERE C.id = A.courseID AND A.userID=U.id AND U.id=UR.userID AND R.id =UR.roleID AND A.status = ?`;
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

router.post("/delete",(req,res)=>{ //multiple delete 
  let year = req.body.year;
  let term = req.body.term;
  let major = req.body.major;
  let sqlcommand=null,item=null; 
  let message ;
  
  if(!year){
     sqlcommand = `TRUNCATE TABLE courses`;
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

router.post('/single-upload',(req,res)=>{//อัดโหลดไฟล์เดียว
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
              

                        db.query(insertStatement,items,(err,result,fields)=>{if(err) throw err;})
                }
                console.log("not pass total "+ unsucess + " Course");
                console.log("import total "+ success + " Course");
                res.send("import excel success");
                
            });
        }
    })
});


router.post("/multiple-upload", (req, res) => {
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

router.put('/updateNumber',(req,res)=>{
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

router.put('/update',(req,res)=>{
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



router.delete("/delete/:id",(req,res)=>{
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