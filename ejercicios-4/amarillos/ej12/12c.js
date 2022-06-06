const PRIMERO = 1;
const SEGUNDO = 2;
const TERCERO = 3;
        
let puesto;

do {

    puesto = parseInt(window.prompt("Posición:"));

} while(isNaN(puesto) || puesto < 1);

switch(puesto) {
    case PRIMERO:
        console.log("Medalla de oro");
        break;
    case SEGUNDO:
        console.log("Medalla de plata");
        break
    case TERCERO:
        console.log("Medalla de bronce");
        break;
    default:
        console.log("Aver estudiao");
  }