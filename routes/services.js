var express = require('express');
var router = express.Router();
var fs = require("fs")
var filedata
fs.readFile("json/services.json","utf8", function(err, data){
  if(err) throw Error;
  else {
  filedata = JSON.parse(data)
  }
});




/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('services', {
    title:'Services',
    serv: filedata});
});

module.exports = router;
