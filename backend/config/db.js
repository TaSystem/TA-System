const mysql = require('mysql'); // เรียกใช้งาน MySQL module

// กำหนดการเชื่อมต่อฐานข้อมูล
const db = mysql.createConnection({
  host: `${process.env.DB_HOST}`,
  user: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASS}`,
  database: `${process.env.DB_NAME}`,
  // host: `localhost`, //
  // user: `root`,
  // password: `admintasystem`,
  // database: `TASystem`,
  // dialect: 'mysql',
  connectTimeout: 300000,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

db.connect((err) => {
  if (!!err) {
    // กรณีเกิด error
    console.log(err);
  } else {
    console.log('Connected database...');
  }
});

db.on('error', function (err) {
  console.log('[mysql error]', err);
});

// ปิดการเชื่อมต่อฐานข้อมูล MySQL ในที่นี้เราจะไม่ให้ทำงาน
// db.end()

module.exports = db;
