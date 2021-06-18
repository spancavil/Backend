class Color {
    constructor(){
    }

    randomRgb(){
        return Math.floor(Math.random()* (255-0));
    }

    rgbString(){
        return `RGB(${this.randomRgb()},${this.randomRgb()},${this.randomRgb()})`
    }
}

const color = new Color();

console.log(color.rgbString());