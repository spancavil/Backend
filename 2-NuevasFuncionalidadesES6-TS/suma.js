"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Suma = void 0;
var Suma = /** @class */ (function () {
    //Constructor de clase
    function Suma(operando1, operando2) {
        this.operando1 = operando1;
        this.operando2 = operando2;
    }
    Suma.prototype.resultado = function () {
        return this.operando1 + this.operando2;
    };
    return Suma;
}());
exports.Suma = Suma;
