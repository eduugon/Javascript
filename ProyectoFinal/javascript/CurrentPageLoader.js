function checkCurrentPage() {
    document.addEventListener('readystatechange', event => { 

        if (event.target.readyState === "interactive") {
            let mainPage = document.getElementById("mainBody");
            let findPage = document.getElementById("findBody");

            if(mainPage !== null) {
                console.log("Estamos en la pag principal");
                document.getElementById("navHome").classList.add("selected");
                loadFavouriteCards();
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

function loadFavouriteCards() {
    let favourites = getFavouriteDigimonList();

    if(favourites === null || favourites.length === 0) {
        enableMainInfoField();
    } else {
        printFavouriteCards(favourites);
    }
}


function getFavouriteDigimonList() {
    return JSON.parse(localStorage.getItem("favouriteDigimons"));
}

function enableMainInfoField() {
    document.getElementById("mainInfoField").classList.add("infoMainField");
    document.getElementById("mainInfoField").classList.remove("warningField");
    document.getElementById("mainInfoField").classList.remove("errorField");
    document.getElementById("mainInfoField").innerText = `Actualmente no tienes digimones favoritos`;
    document.getElementById("mainInfoField").style.visibility = "visible";
}

function disableMainInfoField() {
    document.getElementById("mainInfoField").innerText = ``;
    document.getElementById("mainInfoField").style.visibility = "hidden";
}

function printFavouriteCards(favourites) {
    let digimon = favourites[0]

    fetch(buildFavDigimonUrl(digimon)).then((response) =>{
        if (!response.ok) {
            throw Error(response.status);
        } 
        return response.json();

    }).then((data)=>{
        let digimonInfo = data;
        checkNullFields(digimonInfo[0])

        setTimeout(() => { }, 5000);

        document.getElementById("mainBody__cardList").innerHTML += fullfillDigimonCardFav(digimonInfo[0]);
    }).catch((error) => {
        let message;
        if(error.message === "400") {
            message = `Error, no se ha encontrado el digimon`;
        } else {
            message = `Error, algo ha ido realmente mal`;
        }

        console.log(error);

        window.alert(message);
    })

    /**
    favourites.forEach((digimon) => {
        fetch(buildFavDigimonUrl(digimon)).then((response) =>{
            if (!response.ok) {
                throw Error(response.status);
            } 
            return response.json();

        }).then((data)=>{
            let digimonInfo = data;
            checkNullFields(digimonInfo[0])

            setTimeout(() => { }, 5000);

            document.getElementById("mainBody__cardList").innerHTML += fullfillDigimonCardFav(digimonInfo[0]);
        }).catch((error) => {
            let message;
            if(error.message === "400") {
                message = `Error, no se ha encontrado el digimon`;
            } else {
                message = `Error, algo ha ido realmente mal`;
            }

            console.log(error);

            window.alert(message);
        })
    });
    **/
}

        


function buildFavDigimonUrl(cardnumber) {
    console.log(`https://digimoncard.io/api-public/search.php?card=${cardnumber}`);
    return `https://digimoncard.io/api-public/search.php?card=${cardnumber}`;
}

function fullfillDigimonCardFav(digimon){
    console.log(`<div class="cardContainer-favs">
    <div class="cardFavName">
        ${digimon.name}
    </div>
    <div class="cardFavInfo">
        <div class="cardExtraInfo-collection">
            ${digimon.cardnumber}
        </div>
        <div class="cardExtraInfo-rarity">
            ${digimon.cardrarity}
        </div>
        <div class="cardExtraInfo-color">
            ${digimon.color}
        </div>
        <div class="cardExtraInfo-level">
            ${digimon.level}
        </div>
        <div class="cardExtraInfo-dp">
            ${digimon.dp}
        </div>
    </div>
    </div>`);


    return `
    <div class="cardContainer-favs">
        <div class="cardFavName">
            ${digimon.name}
        </div>
        <div class="cardFavInfo">
            <div class="cardExtraInfo-collection">
                ${digimon.cardnumber}
            </div>
            <div class="cardExtraInfo-rarity">
                ${digimon.cardrarity}
            </div>
            <div class="cardExtraInfo-color">
                ${digimon.color}
            </div>
            <div class="cardExtraInfo-level">
                ${digimon.level}
            </div>
            <div class="cardExtraInfo-dp">
                ${digimon.dp}
            </div>
        </div>
    </div>`;        
}

function checkNullFields(digimon) {
    if(digimon.name === null) {
        digimon.name = "-";
    }

    if(digimon.cardnumber === null) {
        digimon.cardnumber = "-";
    }

    if(digimon.cardrarity === null) {
        digimon.cardrarity = "-";
    }

    if(digimon.color === null) {
        digimon.color = "-";
    }

    if(digimon.level === null) {
        digimon.level = "-";
    }

    if(digimon.dp === null) {
        digimon.dp = "-";
    }
}