"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Color = function () {
    function Color() {
        _classCallCheck(this, Color);
    }

    _createClass(Color, [{
        key: "randomRgb",
        value: function randomRgb() {
            return Math.floor(Math.random() * (255 - 0));
        }
    }, {
        key: "rgbString",
        value: function rgbString() {
            return "RGB(" + this.randomRgb() + "," + this.randomRgb() + "," + this.randomRgb() + ")";
        }
    }]);

    return Color;
}();

var color = new Color();

console.log(color.rgbString());
