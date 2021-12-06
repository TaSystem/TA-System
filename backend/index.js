const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
var fs = require('fs');
var db = require('./config/db');

var users = require('./routes/users');
var courses = require('./routes/courses');
var apply = require('./routes/applyta');
var reply = require('./routes/reply');
var document = require('./routes/document');
var login = require('./routes/login');
var system = require('./routes/system');
var download = require('./routes/downloadfile');
var setdate = require('./routes/setdate');
var historyreply = require('./routes/historyreply');
var cost = require('./routes/cost');
var workinghours = require('./routes/workinghours');

app.set("view engine","ejs");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/',login);
app.use('/users',users);
app.use('/courses',courses);
app.use('/apply',apply);
app.use('/reply',reply);
app.use('/system',system);
app.use('/setdate',setdate);
app.use('/historyreply',historyreply);
app.use('/cost',cost);
app.use('/document', document);
app.use('/workinghours', workinghours);


app.get("/download",(req,res)=>{ //ดาวน์โหลดไฟล์ excel.csv เป็น  header
  const file = `${__dirname}/uploads/download/Header-form.csv`;
  res.download(file);
  console.log("File downloaded!!!");
})

app.get("/download-filecard/:filecard",(req,res)=>{
  const filecard = req.params.filecard;
  const file = `${__dirname}/uploads/img/${filecard}`;
  res.download(file);
  
  console.log("Filecard downloaded!!!");
})

app.get("/download-filebookbank/:filebookbank",(req,res)=>{
  const filebookbank = req.params.filebookbank;
  const file = `${__dirname}/uploads/img/${filebookbank}`;
  let response ={data:file,
                name:filebookbank
                }
  res.download(file);
  
  
  console.log("Filecard downloaded!!!");
})

app.put("/clear-file", async (req, res) => {
  let fileCardStudent = req.body.fileCardStudent;
  let fileBookBank = req.body.fileBookBank;
  let email = req.body.email;
  let path=null;
  

  if(fileCardStudent){
    db.query("UPDATE users SET fileCardStudent = null  WHERE email = ?", email, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        try {
          path = `${__dirname}/uploads/img/${fileCardStudent}`;
          fs.unlinkSync(path);
          console.log("ลบไฟล์บัตรนิสิตสำเร็จ!!!");
          res.send("ลบไฟล์บัตรนิสิตสำเร็จ!!!");
          //file removed
        } catch(err) {
          console.error(err)
        }
      }
    });

  }else{
    db.query("UPDATE users SET fileBookBank = null  WHERE email = ?", email, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // res.send("อัปเดตข้อมูลสำเร็จ");
        try {
          path = `${__dirname}/uploads/img/${fileBookBank}`;
          fs.unlinkSync(path);
          console.log("ลบไฟล์หน้าธนาคารสำเร็จ!!!!");
          res.send("ลบไฟล์หน้าธนาคารสำเร็จ!!!!");
          //file removed
        } catch(err) {
          console.error(err)
        }
      }
    });

  }

});


app.listen(port, () => {
  console.log(`running app listening at http://localhost:${port}`)
})
