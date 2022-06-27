function checkCurrentPage() {
    document.addEventListener('readystatechange', event => { 

        if (event.target.readyState === "interactive") {
            let mainPage = document.getElementById("mainBody");
            let findPage = document.getElementById("findBody");

            if(mainPage !== null) {
                console.log("Estamos en la pag principal");
                document.getElementById("navHome").classList.add("selected");
            } else if(findPage !== null) {
                console.log("Estamos en la pag buscar");
                document.getElementById("navFind").classList.add("selected");
            } else {
                console.log("Estamos en la pag acerca de");
                document.getElementById("navInfo").classList.add("selected");
            }
        }
    });
}

checkCurrentPage();