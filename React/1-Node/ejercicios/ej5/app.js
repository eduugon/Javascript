let objeto = require('./datos'); 


let paises = objeto.paises.a.concat(objeto.paises.b);
paises = paises.concat(objeto.paises.c)


objeto.favoritos.forEach(fav => {
    console.log(paises[fav])
});
