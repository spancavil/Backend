//EVENTOS
//Basicamente cada evento tiene un nombre y una serie de callback asociados (1 o varios) en un array.

function Event(name) {
    this.name = name;
    this.callbacks = [];
}

Event.prototype.registerCallback = function (callback) {
    this.callbacks.push(callback);
}

//REACTOR
//En el reactor se podría definir un objeto literal dentro del cual pondremos cada cada evento por su nombre, por ejemplo:
// eventos => {evento1: }
function Reactor() {
    this.events = {};
}
Reactor.prototype.registerEvent = function (eventName) {
    var event = new Event(eventName);
    this.events[eventName] = event;
};
Reactor.prototype.dispatchEvent = function (eventName, eventArgs) {
    this.events[eventName].callbacks.forEach(function (callback) {
        callback(eventArgs);
    });
};
Reactor.prototype.addEventListener = function (eventName, callback) {
    this.events[eventName].registerCallback(callback);
};
let arg1 = "arg1";
let arg2 = "arg2"

function callback1 () {
    console.log ("Callback 1 ejecutado");
}

function callback2 () {
    console.log ("Callback 2 ejecutado");
}

function callback3 () {
    console.log ("Callback 3 ejecutado");
}

function callback4 () {
    console.log ("Callback 4 ejecutado");
}

let reactor = new Reactor();
//Registramos el evento 1 y sus callbacks.
reactor.registerEvent("evento1");
reactor.addEventListener("evento1", callback1);
reactor.addEventListener("evento1", callback2);

//Registramos el evento 2 y sus callbacks
reactor.registerEvent("evento2");
reactor.addEventListener("evento2", callback3);
reactor.addEventListener("evento2", callback4 );

//Despachamos el evento a su callback correspondiente
reactor.dispatchEvent("evento1", null);

for (const callbacks in reactor) {
    if (Object.hasOwnProperty.call(reactor, callbacks)) {
        const element = reactor[callbacks];
        console.log(element);
    }
}

