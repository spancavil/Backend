class Colors {
    constructor(){
    }

    randomRgb(){
        return Math.floor(Math.random()* (255-0));
    }

    rgbString(){
        return `RGB(${this.randomRgb()},${this.randomRgb()},${this.randomRgb()})`
    }
}

const color1 = new Colors();

console.log(color1.rgbString());