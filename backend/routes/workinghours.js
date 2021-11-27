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
      "SELECT * FROM teacherapplyta as TA,courses as C WHERE C.id= TA.courseID AND Ta.id = ?",
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
  console.log();
  let day = req.body.day;
  let start = req.body.start;
  let end = req.body.end;
  let hour = req.body.hour;
  let teacherapplytaID = req.body.teacherapplytaID;
  

  let checkCount = `SELECT COUNT(id) as countID  FROM workinghours WHERE teacherapplytaID = ?`;
  let itemExpenses = [teacherapplytaID];

  let checkHour = `SELECT TA.hrperweek,SUM(WH.hour) as sumHour FROM teacherapplyta as TA,workinghours as WH WHERE  TA.id=WH.teacherapplytaID AND TA.id = ?`;
  let itemHour = [teacherapplytaID];

  let sqlcommand = `INSERT INTO workinghours (day,start,end,hour,teacherapplytaID) VALUES (?,?,?,?,?)`;
  let item = [day, start, end,hour, teacherapplytaID];

  db.query(checkCount,itemExpenses, (err, result) => {
    if (err) {
      console.log(err);
    } else if(result[0].countID>=3){
        let response = {check:0,
            message: "เพิ่มได้ไม่เกิน 3 วิชา"}
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
