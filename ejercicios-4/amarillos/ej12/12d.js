const PRIMERO = 1;
const SEGUNDO = 2;
const TERCERO = 3;
        
let puesto;

do {

    puesto = parseInt(window.prompt("Posición:"));

} while(isNaN(puesto) || puesto < 1);

if(puesto === PRIMERO || puesto === SEGUNDO || puesto === TERCERO) {
    console.log("Sube al podio");
} else {
    console.log("emosido engañado");
}