const moment = require("moment");

let birthday = moment("13-05-1989", "DD/MM/YYYY");

mensaje1 = `Hoy es ${moment().format('DD/MM/YYYY')}`;
mensaje2 = `Nací el ${birthday}`;
mensaje3 = `Pasaron ${moment().diff(birthday, "days")} días de mi nacimiento.`;


console.log(mensaje1);
console.log(mensaje2);
console.log(mensaje3);