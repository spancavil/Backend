"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resta = void 0;
var Resta = /** @class */ (function () {
    //Constructor de clase
    function Resta(operando1, operando2) {
        this.operando1 = operando1;
        this.operando2 = operando2;
    }
    Resta.prototype.resultado = function () {
        return this.operando1 - this.operando2;
    };
    return Resta;
}());
exports.Resta = Resta;
