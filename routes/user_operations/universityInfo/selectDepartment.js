var express = require('express');
var global_variables = require('../../../global_variables');
var db = require('../../model/db');
var router = express.Router();

router.post('/', function (req, res) {
    if(req.header("secure")==global_variables.apiKey()){
        var uniCode = req.body.uniCode;
        var unitID = req.body.unitID;
        var facID = req.body.facID;


        db.query("SELECT * FROM department where uid =(select uid from university where uniCode = ?) and unitID=? and facID=?  ",[uniCode,unitID,facID], function (err, result, fields) {
            if (err){
                throw err;
                console.log("db hatası");
                res.send({code: 400, message:result});
            }
            else{
                res.send({code: 200, message:result});
            }
        });
    }
    else {
        res.send({code : 401, message : "Access Denied..."});
    }
});




module.exports = router;