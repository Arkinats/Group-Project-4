var express = require('express');
var router = express.Router();

var chatLog = [{username: "system", message: "Welcome to CS201r Creative Group Project 4"}];

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;

router.get("/chat", function(req, res, next) {
    //console.log(chatLog);
    res.send(chatLog);
});

router.post("/chat", function(req, res, next) {
    //console.log(res);
    console.log("==============");
    console.log("Trying to post");
    console.log(req.body);
    console.log("==============");
    //console.log(res);
    chatLog.push(req.body);
    res.end('{"success": "Updated successfully", "status": "200"}')
});