var express = require('express');
var router = express.Router();
//form data goes here


router.get('/', (req, res, next) => {
    res.render('contact', {title:"Contact Us"})
});

module.exports = router;