var express = require("express");
var router = express.Router();
var db = require("../config/db");

router.get("/approve", (req, res) => { // dashborad ค่าใช้จ้ายอนุมัติค่าใช้จ่าย
  db.query("SELECT C.major,SA.cost,C.year,C.term FROM studentapplyta as SA,courses as C,users as U WHERE SA.courseID = C.id AND U.id=SA.userID AND SA.status = 3 ORDER BY C.year,C.term,C.major", (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
    }
  });
});
router.get("/dashboard", (req, res) => { // dashborad ค่าใช้จ้ายอนุมัติค่าใช้จ่าย
  db.query("SELECT C.major,SUM(SA.cost) as sum_cost,C.year,C.term,(SELECT COUNT(DISTINCT(SA2.userID)) FROM studentapplyta as SA2,courses as C2 WHERE C2.id = SA2.courseID AND C2.major = C.major AND C2.year = C.year AND C2.term = C.term AND SA2.status = 3) as count_TA FROM studentapplyta as SA,courses as C,users as U WHERE SA.courseID = C.id AND U.id=SA.userID AND SA.status = 3 GROUP BY C.year,C.term,C.major", (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
    }
  });
});

router.get("/dashboard-expenses", (req, res) => { // dashborad ค่าใช้จ้ายจริง
  db.query("SELECT  major,year,term,cost as sum_cost FROM expenses GROUP BY year,term,major", (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
    }
  });
});

router.post('/add-expenses',(req,res)=>{//เพิ่มค่าใช้จ่ายจริง
  let major = req.body.major;
  let year = req.body.year;
  let term = req.body.term;
  let cost = req.body.cost;
  let sqlcommand,item;

  checkExpenses = `SELECT id FROM expenses WHERE major =? AND year = ? AND term = ?`;
  itemExpenses =[major,year,term];
  
  sqlcommand = `INSERT INTO expenses(major,year,term,cost) VALUES (?,?,?,?)`;
  item =[major,year,term,cost];
  
  db.query(checkExpenses,itemExpenses,(err,result)=>{
      if(err){
          console.log(err);
      }
      else if(result[0]){
        let response = {check:0,
          message: "มีการเพิ่มค่าใช้จ่ายสาขา "+major+" ปี "+year+" เทอม "+term+" แล้ว!!!"}
        res.send(response);
        
      }
      else{
        db.query(sqlcommand,item,(err,result)=>{
          if(err){
              console.log(err);
          }
          else{
            let response = {check:1,
              message: "เพิ่มค่าใช้จ่ายสาขา "+major+" ปี "+year+" เทอม "+term+" สำเร็จ!!!"}
            res.send(response);
            
          }
      });
      }
  });
});




module.exports = router;
