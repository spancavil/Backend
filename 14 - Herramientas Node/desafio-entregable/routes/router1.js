"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router1 = express_1["default"].Router();
router1.post('/post', function (req, res) {
    var content = JSON.stringify(req.body, null, '\t');
    console.log(content);
    res.send(content);
});
exports["default"] = router1;
