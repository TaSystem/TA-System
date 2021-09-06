const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
var fs = require('fs');

var users = require('./routes/users');
var courses = require('./routes/courses');
var apply = require('./routes/applyta');
var reply = require('./routes/reply');
var login = require('./routes/login');
var system = require('./routes/system');
var download = require('./routes/downloadfile');
var setdate = require('./routes/setdate');

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


app.get("/download",(req,res)=>{
  const file = `${__dirname}/uploads/download/Header-form.csv`;
  res.download(file);
  console.log("File downloaded!!!");
})


app.listen(port, () => {
  console.log(`running app listening at http://localhost:${port}`)
})
