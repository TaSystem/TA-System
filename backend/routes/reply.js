var express = require("express");
var router = express.Router();
var db = require("../config/db");

router.put("/teacher-reply", (req, res) => {
  let email = req.body.email;
  let applyTaId = req.body.applyTaId;
  let status = req.body.status;
  let notereply = req.body.notereply;
  let userID;
  let sqlcommand = `UPDATE teacherapplyta SET status = ?,notereply = ? WHERE id = ?`;
  let applyItem = [status, notereply, applyTaId];

  console.log("applyItem: ", applyItem);
  console.log("email: ", email);

  db.query(sqlcommand, applyItem, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      db.query("SELECT id FROM users WHERE email= ?", email, (err, result) => {
        if (err) console.log(err);
        else {
          userID = result[0].id;
          db.query(
            "INSERT INTO userreplyteacher value (?,?,?)",
            [applyTaId, userID, status],
            (err, result) => {
              if (err) console.log(err);
              else {
                if (status == 0) {
                  let respose = {
                    message: "ยกเลิกสำเร็จ!!!",
                    data: result,
                  };
                  res.send(respose);
                } else {
                  let respose = {
                    message: "ยืนยันสำเร็จ!!!",
                    data: result,
                  };
                  res.send(respose);
                }
              }
            }
          );
        }
      });
    }
  });
});

router.put("/check-course-condition", (req, res) => {
  let email = req.body.email;
  let applyTaId = req.body.applyTaId;
  let statusReply = req.body.status;
  let userID;

  let status = true;
  let numberTa = 0;

  let sqlcommand = `UPDATE teacherapplyta SET status = ? WHERE id = ?`;
  let applyItem = [statusReply, applyTaId];

  db.query(
    "SELECT C.id,C.courseID,C.title,C.number_D,C.number_P,C.numberReal FROM courses AS C,Teacherapplyta AS A WHERE C.id = A.courseID AND A.id = ?",
    applyTaId,
    (err, result) => {
      if (err) throw err;
      else {
        //เงื่อนไขในการขอSA
        if (result[0].number_P && result[0].number_D) {
          //เงื่อนไขบรรยายและปฎิบัติ
          if (result[0].numberReal < 40) {
            console.log(
              result[0].courseID + "บรรยายและปฎิบัติมีน้อยกว่า 40 คน"
            );
            status = false;
          } else if (result[0].numberReal >= 40 && result[0].numberReal <= 60) {
            console.log(result[0].courseID + "บรรยายและปฎิบัติมี 40-60  คน");
            numberTa = 1;
          } else {
            console.log(result[0].courseID + "บรรยายและปฎิบัติมีมากกว่า 60 คน");
            numberTa = 2;
          }
        } else if (!result[0].number_P) {
          //เงื่อนไขบรรยาย
          if (result[0].numberReal < 40) {
            console.log(result[0].courseID + "บรรยายมีน้อยกว่า 40 คน");
            status = false;
          } else if (result[0].numberReal >= 40 && result[0].numberReal <= 60) {
            console.log(result[0].courseID + "บรรยายมี 40-60  คน");
            numberTa = 1;
          } else {
            console.log(result[0].courseID + "บรรยายมีมากกว่า 60 คน");

            numberTa = 2;
          }
        } else if (!result[0].number_D) {
          //เงื่อนไขปฎิบัติ
          console.log(result[0].courseID + "หมู่เรียนปฎิบัติให้ผ่าน");
          numberTa = 1;
        } else {
          console.log(result[0].courseID + "ไม่เข้าเงื่อนไขใดๆไม่มีสิทธิ์ขอ");
          status = false;
        }

        let itemUpdate = [status, numberTa, result[0].id];
        console.log("itemUpdate: ", itemUpdate);

        db.query(
          "UPDATE courses SET status=?,numberTAReal=? WHERE id = ?",
          itemUpdate,
          (err, result) => {
            if (err) throw err;
            else {
              db.query(sqlcommand, applyItem, (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  db.query(
                    "SELECT id FROM users WHERE email= ?",
                    email,
                    (err, result) => {
                      if (err) console.log(err);
                      else {
                        userID = result[0].id;
                        db.query(
                          "INSERT INTO userreplyteacher value (?,?,?)",
                          [applyTaId, userID, statusReply],
                          (err, result) => {
                            if (err) console.log(err);
                            else {
                              db.query(
                                "SELECT C.id,C.courseID,C.title,C.level,C.major,C.teacher,C.sec_D,C.sec_P,C.number_D,C.number_P,A.id as AID,A.number1,A.number2,A.status,A.noteapply,U.name_email FROM courses AS C,Teacherapplyta AS A,users AS U WHERE C.id = A.courseID AND A.userID=U.id AND A.status = ?",
                                statusReply - 1,
                                (err, result) => {
                                  if (err) console.log(err);
                                  else {
                                    let respose = {
                                      message: "ตรวจสอบสำเร็จ!!!",
                                      data: result,
                                    };
                                    console.log("ตรวจสอบสำเร็จ!!!");
                                    res.send(respose);
                                  }
                                }
                              );
                            }
                          }
                        );
                      }
                    }
                  );
                }
              });
            }
          }
        );
      }
    }
  );
});

router.put("/teacher-reply-note", (req, res) => {
  let id = req.body.id;
  let notereply = req.body.notereply;

  let sqlcommand = `UPDATE teacherapplyta SET note = ? WHERE id = ?`;
  let applyItem = [notereply, id];
  db.query(sqlcommand, applyItem, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Teacher reply note!!!");
    }
  });
});

router.put("/student-reply", (req, res) => {
  let email = req.body.email;
  let id = req.body.studentapplyID;
  let status = req.body.status;
  let hrperweek = req.body.hrperweek;
  let lvl = req.body.lvl;
  let notereply = req.body.notereply;
  let courseID = req.body.courseID;
  let userID, cost;

  let sqlcommand;
  let applyItem;

  if (status == 3) {
    //ยืนยันว่าเป็น TA แล้วเพิ่มcost
    console.log("lvl: ", lvl);
    if (lvl == "ปริญญาตรี") {
      cost = hrperweek * 30 * 15;
      console.log("ปริญญาตรี");
    } else {
      cost = hrperweek * 40 * 15;
      console.log("ปริญญาโท");
    }
    sqlcommand = `UPDATE studentapplyta SET status = ?,cost = ? WHERE id = ?`;
    applyItem = [status, cost, id];
  } else {
    sqlcommand = `UPDATE studentapplyta SET status = ?,notereply = ? WHERE id = ?`;
    applyItem = [status, notereply, id];
  }

  console.log("sql: ", sqlcommand);
  console.log("applyItem: ", applyItem);
  console.log("email: ", email);

  db.query("SELECT id FROM users WHERE email= ?", email, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      userID = result[0].id;
      db.query(
        "SELECT COUNT(SA.id) as CountTA,C.numberTAReal FROM courses as C,studentapplyta as SA WHERE C.id = SA.courseID AND SA.status>=2 AND SA.courseID = ?",
        courseID,
        (err, result) => {
          if (err) throw err;
          else {
            if (status == 0) {
              db.query(
                "INSERT INTO userreplystudent value (?,?,?)",
                [id, userID, status],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    db.query(sqlcommand, applyItem, (err, result) => {
                      if (err) {
                        console.log(err);
                      } else {
                        let respose = {
                          message: "ยกเลิกสำเร็จ!!!",
                          data: result,
                        };
                        res.send(respose);
                      }
                    });
                  }
                }
              );
            }else if(status == 3){
              
              db.query(sqlcommand, applyItem, (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                    let respose = {
                      message: "ยืนยันสำเร็จ!!!",
                      data: result,
                    };
                    res.send(respose);
                }
              });

            } else if (result[0].CountTA >= result[0].numberTAReal) {
              let response = {
                check: 0,
                message: "รายวิชานี้มีนิสิตช่วยงานครบแล้ว โปรดยกเลิก",
              };
              res.send(response);
            } else {
              db.query(
                "INSERT INTO userreplystudent value (?,?,?)",
                [id, userID, status],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    db.query(sqlcommand, applyItem, (err, result) => {
                      if (err) {
                        console.log(err);
                      } else {
                          let respose = {
                            message: "ยืนยันสำเร็จ!!!",
                            data: result,
                          };
                          res.send(respose);
                      }
                    });
                  }
                }
              );
            }
          }
        }
      );
    }
  });
});

router.put("/student-reply-note", (req, res) => {
  let id = req.body.id;
  let note = req.body.note;

  let sqlcommand = `UPDATE studentapplyta SET note = ? WHERE id = ?`;
  let applyItem = [note, id];
  db.query(sqlcommand, applyItem, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("student reply note!!!");
    }
  });
});

module.exports = router;
