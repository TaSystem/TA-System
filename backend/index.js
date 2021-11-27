const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
var fs = require('fs');

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


app.listen(port, () => {
  console.log(`running app listening at http://localhost:${port}`)
})
