var express = require("express");
var router = express.Router();
var db = require("../config/db");

router.get("/:id", (req, res) => {
  // เวลปฎิบัตืงานแต่ละวิชา
  const id = req.params.id;
  db.query(
    "SELECT * FROM workinghours WHERE teacherapplytaID =?",
    id,
    (err, result) => {
      if (err) throw err;
      else {
        res.send(result);
      }
    }
  );
});

router.get("/course/:id", (req, res) => {//รายละเอียดวิชา
    const id = req.params.id;
    db.query(
      "SELECT * FROM teacherapplyta as TA,courses as C WHERE C.id= TA.courseID AND TA.id = ?",
      id,
      (err, result) => {
        if (err) throw err;
        else {
          res.send(result);
        }
      }
    );
  });

router.post("/add", (req, res) => {
  
  let sec_D = req.body.sec_D;
  let day_D = req.body.day_D;
  let start_D = req.body.start_D;
  let end_D = req.body.end_D;
  let sec_P = req.body.sec_P;
  let day_P = req.body.day_P;
  let start_P = req.body.start_P;
  let end_P = req.body.end_P;
  let hour = req.body.hour;
  let teacherapplytaID = req.body.teacherapplytaID;
  let sqlcommand,item,checkCount,itemExpenses,sec;
  

  

  let checkHour = `SELECT TA.hrperweek,SUM(WH.hour) as sumHour FROM teacherapplyta as TA,workinghours as WH WHERE  TA.id=WH.teacherapplytaID AND TA.id = ?`;
  let itemHour = [teacherapplytaID];

  if(sec_D){
    checkCount = `SELECT id FROM workinghours WHERE sec_D = ? AND teacherapplytaID =?`;
    itemExpenses = [sec_D,teacherapplytaID];
    sec = sec_D;
    sqlcommand = `INSERT INTO workinghours (sec_D,day_D,start_D,end_D,hour,teacherapplytaID) VALUES (?,?,?,?,?,?)`;
    item = [sec_D,day_D, start_D, end_D,hour, teacherapplytaID];
    console.log("secD");
  }
  else{
    checkCount = `SELECT id FROM workinghours WHERE sec_P = ? AND teacherapplytaID =?`;
    itemExpenses = [sec_P,teacherapplytaID];
    sec = sec_P;
    sqlcommand = `INSERT INTO workinghours (sec_P,day_P,start_P,end_P,hour,teacherapplytaID) VALUES (?,?,?,?,?,?)`;
    item = [sec_P,day_P, start_P, end_P,hour, teacherapplytaID];
    console.log("secP");
  }

  db.query(checkCount,itemExpenses, (err, result) => {
    if (err) {
      console.log(err);
    } else if(result[0]){
        let response = {check:0,
            message: "มีการเพิ่มหมู่ "+sec+" แล้ว"}
        res.send(response);
    }else {
        db.query(checkHour,itemHour, (err, result) => {
            if (err) {
              console.log(err);
            }else if(result[0].sumHour+hour > result[0].hrperweek){
                let response = {check:0,
                    message: "เพิ่มเวลาเกิน "+ result[0].hrperweek +" ชั่วโมง"}
                res.send(response);
            } else {
                db.query(sqlcommand, item, (err, result) => {
                    if (err) {
                      console.log(err);
                    } else {
                        let response = {check:1,
                            message: "เพิ่มวันปฎิบัติงานสำเร็จ"}
                        res.send(response);
                    }
                  });
            }
          });
    }
  });
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM workinghours WHERE id = ?", id, (err, result) => {
    if (err) throw err;
    else {
      res.send("ลบเวลาปฎิบัติงานสำเร็จสำเร็จ");
    }
  });
});

module.exports = router;
