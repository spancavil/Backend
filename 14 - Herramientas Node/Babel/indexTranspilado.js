"use strict";

var lista = [0, 2, 3, 6];

lista.map(function (x) {
  return x * 2;
}).forEach(function (e) {
  return console.log(e);
});

elemento = lista.filter(function (e) {
  return e === 2;
});
