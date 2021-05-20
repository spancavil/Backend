"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Animal = /** @class */ (function () {
    function Animal(theName) {
        this.name = theName;
    }
    Animal.prototype.beberAgua = function () {
        return "Glup glup glup";
    };
    return Animal;
}());
var Perro = /** @class */ (function (_super) {
    __extends(Perro, _super);
    function Perro(name, raza) {
        var _this = _super.call(this, name) || this;
        _this.raza = raza;
        return _this;
    }
    Perro.prototype.ladrar = function (intensidad) {
        if (intensidad <= 2) {
            return "guau ...(Ladro despaciito!)";
        }
        else if (intensidad < 6) {
            return "guau guau ... (Ladro normal)";
        }
        else {
            return "GUAU GUAU GUAU !! (Ladro con todo!!)";
        }
    };
    return Perro;
}(Animal));
var Mocho = new Perro("Mocho", "pug");
console.log(Mocho.beberAgua());
console.log(Mocho.ladrar(8));
