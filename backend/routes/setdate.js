var express = require("express");
var router = express.Router();
var db = require("../config/db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM datestudy ORDER BY openDate", (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
    }
  });
});

router.get("/getNow", (req, res) => {
  db.query("SELECT * FROM datestudy WHERE status = 1", (err, result) => {
    if (err) throw err;
    if (!result[0]) {
      res.send("result = null");
    } else {
      res.send(result);
    }
  });
});

router.get("/year", (req, res) => {
  db.query(
    "SELECT DISTINCT year FROM datestudy ORDER BY year",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.get("/term", (req, res) => {
  db.query("SELECT DISTINCT term FROM datestudy", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.get("/date-study/:id", async (req, res) => {
  const id = req.params.id;
  await db.query(
    "SELECT S.id as SID,S.year,S.term,S.openDate,S.closeDate,ST.id as STID,ST.title,ST.startDate,ST.endDate FROM datestudy as S,datestop as ST WHERE S.id = ST.datestudyID AND ST.datestudyID = ? ORDER BY ST.startDate",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.get("/date-select/:id", async (req, res) => {
  const id = req.params.id;
  await db.query(
    "SELECT * FROM `datestudy` WHERE id = ?",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.post("/setDateStudy", (req, res) => {
  let year = req.body.year;
  let term = req.body.term;
  let openDate = req.body.openDate;
  let closeDate = req.body.closeDate;
  let status = 0;
  let NewOpenDate = new Date(new Date(openDate).getTime() + 1000 * 60 * 60 * 7)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  let NewCloseDate = new Date(
    new Date(closeDate).getTime() + 1000 * 60 * 60 * 7
  )
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  console.log(NewOpenDate, NewCloseDate);

  let sqlcommand = `INSERT INTO datestudy (year,term,opendate,closedate,status) VALUE (?,?,?,?,?)`;
  let dateItems = [year, term, NewOpenDate, NewCloseDate, status];
  console.log("date item: ", dateItems);

  db.query(sqlcommand, dateItems, (err, result) => {
    if (err) throw err;
    else {
      db.query("SELECT * FROM datestudy ORDER BY year", (err, result) => {
        if (err) throw err;
        else {
          respose = { message: "เพิ่มวันที่เรียนสำเร็จ", data: result };
          res.send(respose);
        }
      });
    }
  });
  
});

router.post("/setDateStop", (req, res) => {
  let title = req.body.title;
  let startDate = req.body.startDate;
  let endDate = req.body.endDate;
  let dateStudyID = req.body.dateStudyID;

  let NewStartDate = new Date(
    new Date(startDate).getTime() + 1000 * 60 * 60 * 7
  )
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  let NewEndDate = new Date(new Date(endDate).getTime() + 1000 * 60 * 60 * 7)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  let sqlcommand = `INSERT INTO datestop (title,startDate,endDate,datestudyID) VALUE (?,?,?,?)`;
  let dateItems = [title, NewStartDate, NewEndDate,dateStudyID];

  
  db.query(sqlcommand, dateItems, (err, result) => {
    if (err) throw err;
    else {
        db.query("SELECT S.id as SID,S.year,S.term,S.openDate,S.closeDate,ST.id as STID,ST.title,ST.startDate,ST.endDate FROM datestudy as S,datestop as ST WHERE S.id = ST.datestudyID AND ST.datestudyID = ? ORDER BY ST.startDate",dateStudyID, (err, result) => {
            if (err) throw err;
            else {
                respose = {
                    message: "เพิ่มวันหยุดสำเร็จ",
                    data: result,
                  };
                res.send(respose);
            }
          });
    }
  });
});

router.post("/delete-datestop", (req, res) => {
  const SID = req.body.SID;
  const STID = req.body.STID;
  db.query("DELETE FROM datestop WHERE id = ?", STID, (err, result) => {
    if (err) throw err;
    else {
      db.query("SELECT S.id as SID,S.year,S.term,S.openDate,S.closeDate,ST.id as STID,ST.title,ST.startDate,ST.endDate FROM datestudy as S,datestop as ST WHERE S.id = ST.datestudyID AND ST.datestudyID = ? ORDER BY ST.startDate",SID,(err, result) => {
        if (err) throw err;
        else {
          respose = { message: "ลบวันหยุดสำเร็จ", data: result };
          res.send(respose);
        }
      });
    }
  });
});

router.put("/setNow", (req, res) => {
  let id = req.body.id;
  let sqlcommand = `UPDATE datestudy SET status=1 WHERE id = ? `;
  let dateItems = [id];

  db.query("SELECT * FROM datestudy WHERE status = 1", (err, result) => {
    if (err) throw err;
    else if (!result[0]) {
      db.query(sqlcommand, dateItems, (err, result) => {
        if (err) throw err;
        else {
          res.send("ตั้งค่าปีการศึกษาและภาคเรียนปัจจุบันสำเร็จ");
          console.log("ตั้งค่าปีการศึกษาและภาคเรียนปัจจุบันสำเร็จ");
        }
      });
    } else {
      db.query(
        `UPDATE datestudy SET status=0 WHERE id = ?`,
        result[0].id,
        (err, result) => {
          if (err) throw err;
          else {
            db.query(sqlcommand, dateItems, (err, result) => {
              if (err) throw err;
              else {
                db.query(
                  "SELECT * FROM datestudy WHERE status = 1",
                  (err, result) => {
                    if (err) throw err;
                    else {
                      respose = {
                        message: "ตั้งค่าปีการศึกษาและภาคเรียนปัจจุบันสำเร็จ",
                        data: result,
                      };
                      res.send(respose);
                      console.log(respose);
                    }
                  }
                );
              }
            });
          }
        }
      );
    }
  });
});

router.delete("/delete-datestudy/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM datestudy WHERE id = ?", id, (err, result) => {
    if (err) throw err;
    else {
      db.query("SELECT * FROM datestudy ORDER BY openDate", (err, result) => {
        if (err) throw err;
        else {
          respose = { message: "ลบวันที่เรียนสำเร็จ", data: result };
          res.send(respose);
        }
      });
    }
  });
});



module.exports = router;
