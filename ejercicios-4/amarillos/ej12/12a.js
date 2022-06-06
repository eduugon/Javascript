const PRIMERO = 1;
const SEGUNDO = 2;
const TERCERO = 3;
        
let puesto;

do {

    puesto = parseInt(window.prompt("Posición:"));

} while(isNaN(puesto) || puesto < 1);

if(puesto === PRIMERO) {
    console.log("Ganaste");
} else {
    console.log("Cagaste")
}
