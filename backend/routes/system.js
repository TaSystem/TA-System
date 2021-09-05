var express = require('express');
var router = express.Router();
var db = require('../config/db');

router.get('/:id',(req,res)=>{

    let id = req.params.id;
    let sqlcommand = `SELECT * FROM systems WHERE id = ?`;

    db.query(sqlcommand,id,(err,result)=>{
        if(err) console.log(err)
        else{
            res.send(result);
            // if(id == 1){
            //     console.log("ระบบอาจารย์: ",result[0].status?"เปิด":"ปิด");
            // }
            // else{
            //     console.log("ระบบนิสิต: ",result[0].status?"เปิด":"ปิด");
            // }
        }
    })
    
})




router.put('/',(req,res)=>{

    let id = req.body.id;
    let status = req.body.status;
    
    let sqlcommand = `UPDATE systems SET status = ? WHERE id = ?`;
    let applyItem = [status,id];

    db.query(sqlcommand,applyItem,(err,result)=>{
        if(err){console.log(err)}
        else{
            res.send("update system");
            console.log("update system");
        }
    })
})


module.exports = router;