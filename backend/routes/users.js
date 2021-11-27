var express = require("express");
var router = express.Router();
var db = require("../config/db");
var upload = require("../config/multer.config");

router.get("/", async (req, res) => {
  await db.query(
    "SELECT U.id as UID,U.email,U.name_email,U.name,U.lastname,U.level,U.department,U.tel,R.id as RID,R.title FROM users as U,users_roles as US,roles as R WHERE U.id = US.userID AND R.id = US.roleID AND US.roleID !=5 ORDER BY R.id",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
  // res.sendFile(__dirname+'/index.html');
});

router.get("/get-role", async (req, res) => {
  await db.query("SELECT * FROM roles WHERE id !=5", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.get("/users-SA", async (req, res) => {
  await db.query(
    "SELECT SA.userID,COUNT(SA.courseID) as count_courses,SUM(SA.hrperweek) as sumHour,U.email,U.name_email,U.name,U.lastname,U.idStudent,U.tel,U.department,U.tel,U.level as lvl,U.nameBank,U.idBank,U.fileCardStudent,U.fileBookBank,C.year,C.term FROM studentapplyta as SA,users as U,courses as C WHERE SA.userID = U.id AND C.id = SA.courseID AND C.year IN (SELECT DISTINCT(year) FROM datestudy WHERE status = 1) AND C.term IN (SELECT DISTINCT(term) FROM datestudy WHERE status = 1) AND SA.status = 3 GROUP BY SA.userID",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  await db.query(
    "SELECT U.id as UID,U.email,U.name_email,U.name,U.lastname,U.level,U.department,U.tel,R.id as RID,R.title FROM users as U,users_roles as US,roles as R WHERE U.id = US.userID AND R.id = US.roleID AND U.id = ?",
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

router.get("/users-SA/:id", async (req, res) => {
  const courseID = req.params.id;
  await db.query(
    "SELECT * FROM studentapplyta as SA,users as U WHERE U.id=SA.userID AND SA.status=3 AND SA.courseID = ?",
    courseID,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.get("/course-owner/:id", async (req, res) => {
  const courseID = req.params.id;
  await db.query(
    "SELECT U.email,U.name_email,U.name,U.lastname,U.department,U.tel,R.title as roleTitle FROM teacherapplyta as TA,users as U,roles as R,users_roles as UR WHERE U.id = TA.userID AND U.id = UR.userID AND UR.roleID = R.id AND TA.status = 5 AND TA.courseID = ?",
    courseID,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.post("/profiledetail", async (req, res) => {
  const email = req.body.email;
  if (email) {
    await db.query(
      "SELECT  * FROM users,roles,users_roles WHERE users.id = users_roles.userID AND roles.id = users_roles.roleID AND users.email = ?",
      email,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log("fetch profile data");
          res.send(result);
        }
      }
    );
  }
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const name_email = req.body.name_email;
  const imgURL = req.body.imgURL;
  const created_at = new Date();
  const updated_at = new Date();
  const role = req.body.role;
  if (email) {
    await db.query(
      "SELECT * FROM users WHERE email = ? ",
      email,
      (err, result) => {
        if (err) {
          console.log(err);
        } else if (result.length > 0) {
          const userID = result[0].id;
          db.query(
            "SELECT  * FROM users,roles,users_roles WHERE users.id = users_roles.userID AND roles.id = users_roles.roleID AND users_roles.userID = ?",
            userID,
            (err, result) => {
              const title = result[0].title;
              if (err) {
                console.log(err);
              } else if (
                result[0].name_email == null &&
                result[0].imgURL == null
              ) {
                db.query(
                  "UPDATE users SET name_email=?,imgURL=?,created_at=?,updated_at=? WHERE id=?",
                  [name_email, imgURL, created_at, updated_at, userID],
                  (err, result) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log(title);
                      console.log("welcome role set");
                      let ans = { path: "/provostCourses", result: result };
                      res.send(ans);
                    }
                  }
                );
              } else {
                console.log(result[0].title);
                console.log("welcome back");

                let ansTeacher = {
                  path: "/provost/provostCourses",
                  result: result,
                };

                let ansStudent = { path: "/nisit", result: result };

                if (role == 5) {
                  res.send(ansStudent);
                } else {
                  res.send(ansTeacher);
                }
              }
            }
          );
          console.log(result[0].id);
        } else {
          db.query(
            "INSERT INTO users (email,name_email,imgURL,created_at,updated_at) VALUES(?,?,?,?,?)",
            [email, name_email, imgURL, created_at, updated_at],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                db.query(
                  "select id FROM users WHERE email=?",
                  email,
                  (err, result) => {
                    if (err) {
                      console.log(err);
                    } else {
                      const id = result[0].id;
                      console.log(id);
                      db.query(
                        "INSERT INTO users_roles VALUES(?,?)",
                        [id, role],
                        (err, result) => {
                          if (err) {
                            console.log(err);
                          } else {
                            db.query(
                              "SELECT  * FROM users,roles,users_roles WHERE users.id = users_roles.userID AND roles.id = users_roles.roleID AND users_roles.userID = ?",
                              id,
                              (err, result) => {
                                if (err) {
                                  console.log(err);
                                } else {
                                  console.log(result[0].title);
                                  console.log("first login");
                                  let ans = {
                                    path: "/nisit/registerNisit",
                                    result: result,
                                  };
                                  res.send(ans);
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
            }
          );
        }
      }
    );
  }
});

router.post("/create", (req, res) => {
  const email = req.body.email;
  const name_email = req.body.name_email;
  const imgURL = req.body.imgURL;
  db.query(
    "INSERT INTO users (email,name_email,imgURL) VALUES(?,?,?)",
    [email, name_email, imgURL],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("User inserted");
      }
    }
  );
});

router.post("/profile",
  upload.fields([
    { name: "fileCardStudent", maxCount: 1 },
    { name: "fileBookBank", maxCount: 1 },
  ]),
  (req, res) => {
    const name = req.body.name;
    const lastname = req.body.lastname;
    const idStudent = req.body.idStudent;
    const level = req.body.level;
    const department = req.body.department;
    const tel = req.body.tel;
    const nameBank = req.body.nameBank;
    const idBank = req.body.idBank;
    const fileCardStudent = req.files.fileCardStudent[0].filename;
    const fileBookBank = req.files.fileBookBank[0].filename;
    const updated_at = new Date();
    db.query(
      "INSERT INTO users (name,lastname,idStudent,level,department,tel,nameBank,idBank,fileCardStudent,fileBookBank,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        name,
        lastname,
        idStudent,
        level,
        department,
        tel,
        nameBank,
        idBank,
        fileCardStudent,
        fileBookBank,
        updated_at,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("User inserted");
        }
      }
    );
  }
);

router.post("/set-role", (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let lastname = req.body.lastname;
  let department = req.body.department;
  let tel = req.body.tel;
  let roleID = req.body.roleID;

  let items = [email, name, lastname, department, tel];
  console.log("items: ", items);

  db.query(
    "INSERT INTO users (email,name,lastname,department,tel) VALUES(?,?,?,?,?)",
    items,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        db.query(
          "INSERT INTO users_roles(userID,roleID) VALUES (?,?)",
          [result.insertId, roleID],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              db.query("SELECT U.id as UID,U.email,U.name_email,U.name,U.lastname,U.level,U.department,U.tel,R.id as RID,R.title FROM users as U,users_roles as US,roles as R WHERE U.id = US.userID AND R.id = US.roleID AND US.roleID !=5 ORDER BY R.id", (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  let response = {data:result,
                    message: "เพิ่มบุคลากรสำเร็จ"}
                  res.send(response);
                }
              });
            }
          }
        );
      }
    }
  );
});

router.put("/update-profile",
upload.fields([
  { name: "fileCardStudent", maxCount: 1 },
  { name: "fileBookBank", maxCount: 1 },
]), (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const lastname = req.body.lastname;
  const idStudent = req.body.idStudent;
  const level = req.body.level;
  const department = req.body.department;
  const tel = req.body.tel;
  const updated_at = new Date();
  db.query(
    "UPDATE users SET name = ?,lastname = ?,idStudent = ?,level = ?,department = ?,tel = ?,updated_at=? WHERE id = ?",
    [name, lastname, idStudent, level, department, tel, updated_at, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        db.query(
          "SELECT  * FROM users,roles,users_roles WHERE users.id = users_roles.userID AND roles.id = users_roles.roleID AND users.id = ?",
          id,
          (req, res) => {
            if (err) console.log(err);
            else {
              console.log("User Updated");
              let ans = { result: result, message: "update profile!!!" };
              res.send(ans);
            }
          }
        );
      }
    }
  );
});

router.put("/update-banking", (req, res) => {
  const id = req.body.id;
  const nameBank = req.body.nameBank;
  const idBank = req.body.idBank;
  const fileCardStudent = req.body.fileBookBank;
  const fileBookBank = req.body.fileBookBank;
  const updated_at = new Date();
  db.query(
    "UPDATE users SET nameBank = ?,idBank = ?,fileCardStudent = ? ,fileBookBank = ?,updated_at=? WHERE id = ?",
    [nameBank, idBank, fileCardStudent, fileBookBank, updated_at, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("User Updated");
        let ans = { result: result, message: "update profile!!!" };
        res.send(ans);
      }
    }
  );
});

router.put(
  "/edit-profile",
  upload.fields([
    { name: "fileCardStudent", maxCount: 1 },
    { name: "fileBookBank", maxCount: 1 },
  ]),
  (req, res) => {
    const id = req.body.id;
    const email = req.body.email;
    const name_email = req.body.name_email;
    const imgURL = req.body.imgURL;
    const name = req.body.name;
    const lastname = req.body.lastname;
    const idStudent = req.body.idStudent;
    const level = req.body.level;
    const department = req.body.department;
    const tel = req.body.tel;
    const nameBank = req.body.nameBank;
    const idBank = req.body.idBank;
    const Branch = req.body.Branch;
    const fileCardStudent = req.files.fileCardStudent[0].filename;
    const fileBookBank = req.files.fileBookBank[0].filename;
    const updated_at = new Date();
    db.query(
      "UPDATE users SET email = ?,name_email = ?,imgURL = ?,name = ?,lastname = ?,idStudent = ?,level = ?,department = ?,tel = ?,nameBank = ?,idBank = ?,Branch = ?,fileCardStudent = ?,fileBookBank = ?,updated_at=? WHERE id = ?",
      [
        email,
        name_email,
        imgURL,
        name,
        lastname,
        idStudent,
        level,
        department,
        tel,
        nameBank,
        idBank,
        Branch,
        fileCardStudent,
        fileBookBank,
        updated_at,
        id,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("User Updated");
        }
      }
    );
  }
);

router.put("/edit-profile-teacher", async (req, res) => {
  const email = req.body.email;
  const userID = req.body.userID;
  const name = req.body.name;
  const lastname = req.body.lastname;
  const level = req.body.level;
  const department = req.body.department;
  const tel = req.body.tel;
  const updated_at = new Date();
  const roleID = req.body.roleID;
  
  let editUser = `UPDATE users SET name = ?,lastname = ?,level = ?,department = ?,tel = ?,updated_at=? WHERE id = ?`;
  let userDetail = [name, lastname, level, department, tel, updated_at, userID];
  let editUserRole = `UPDATE users_roles SET roleID = ? WHERE userID = ?`;
  let Roletitle = [roleID, userID];
  let editUserWithEMail = `UPDATE users SET name = ?,lastname = ?,level = ?,department = ?,tel = ?,updated_at=? WHERE email = ?`;
  let userDetailWithEmail = [name, lastname, level, department, tel, updated_at, email];

  if(email){
    db.query(editUserWithEMail, userDetailWithEmail, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("อัปเดตข้อมูลสำเร็จ");
      }
    });
  }else{
    await db.query(editUser, userDetail, (err, result) => {
    if (err) {
      console.log(err);
    } else if (roleID) {
      db.query(editUserRole, Roletitle, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("อัปเดตข้อมูลสำเร็จ");
        }
      });
    } else {
      res.send("อัปเดตข้อมูลสำเร็จ");
    }
  });}
});

router.delete("/delete/:email", (req, res) => {
  const email = req.params.email;
  db.query("DELETE FROM users WHERE email = ?", email, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("ลบสำเร็จ");
    }
  });
});

module.exports = router;
