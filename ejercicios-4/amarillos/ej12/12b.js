const PRIMERO = 1;
const SEGUNDO = 2;
const TERCERO = 3;
        
let puesto;

do {

    puesto = parseInt(window.prompt("Posición:"));

} while(isNaN(puesto) || puesto < 1);

if(puesto === PRIMERO) {
    console.log("Medalla de oro");
} else if(puesto === SEGUNDO) {
    console.log("Medalla de plata");
} else if(puesto === TERCERO) {
    console.log("Medalla de bronce");
} else {
    console.log("Lo importante es participar");
}