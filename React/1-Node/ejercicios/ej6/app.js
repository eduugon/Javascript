let factorial = require('./funciones/factorial'); 
let supervillains = require("supervillains")

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);  
}



for (let i = 0; i < 4; i++) {
    let randomNumber = getRandomArbitrary(1, 20);
    let allSupers = supervillains.all;
    console.log(allSupers[randomNumber]);
}