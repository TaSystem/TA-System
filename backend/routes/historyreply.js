var express = require('express');
var router = express.Router();
var db = require('../config/db');

router.get("/:id",async (req, res) => {
    const id = req.params.id;
    await db.query("SELECT URT.teacherapplyID,URT.status,U.name,U.lastname,U.email,U.tel,R.title FROM userreplyteacher as URT,users as U,users_roles as UR,roles as R WHERE URT.userID = U.id AND U.id = UR.userID AND R.id = UR.roleID AND teacherapplyID = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        
      }
    });
});
router.get("/nisit/:id",async (req, res) => {
  const id = req.params.id;
  await db.query("SELECT URT.studentapplyID,URT.status,U.name,U.lastname,U.email,U.tel,R.title FROM userreplystudent as URT,users as U,users_roles as UR,roles as R WHERE URT.userID = U.id AND U.id = UR.userID AND R.id = UR.roleID AND URT.studentapplyID = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      
    }
  });
});



module.exports = router;