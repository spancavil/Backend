const express= require('express'); //Debo usar ES5;

var router1 = express.Router();

router1.post('/post', function (req, res) {
    var content = JSON.stringify(req.body, null, '\t');
    console.log(content);
    res.send(content);
});

module.exports=router1;