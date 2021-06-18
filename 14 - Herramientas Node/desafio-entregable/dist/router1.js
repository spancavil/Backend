"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router1 = express_1.default.Router();
router1.post('/post', function (req, res) {
    var content = JSON.stringify(req.body, null, '\t');
    console.log(content);
    res.send(content);
});
exports.default = router1;
