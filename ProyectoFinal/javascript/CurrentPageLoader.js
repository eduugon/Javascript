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
        enableMainInfoField("Actualmente no tienes digimones favoritos");
    } else {
        let numFavoritos = digimons.length + 1;
        enableMainInfoField(`Actualmente tienes ${numFavoritos} digimon(es) favoritos`);
        printFavouriteCards(favourites);
    }
}


function getFavouriteDigimonList() {
    return JSON.parse(localStorage.getItem("favouriteDigimons"));
}

function enableMainInfoField(message) {
    document.getElementById("mainInfoField").classList.add("infoMainField");
    document.getElementById("mainInfoField").classList.remove("warningField");
    document.getElementById("mainInfoField").classList.remove("errorField");
    document.getElementById("mainInfoField").innerText = message;
    document.getElementById("mainInfoField").style.visibility = "visible";
}

function disableMainInfoField() {
    document.getElementById("mainInfoField").innerText = ``;
    document.getElementById("mainInfoField").style.visibility = "hidden";
}


let digimons = [
    {
        name: 'Nene Amano',
        carnumber: 'BT10-092',
        cardrarity: 'Rare',
        color: 'Black',
        level: '-',
        dp: '-',
    },
    {
        name: 'Renamon',
        carnumber: 'BT10-032',
        cardrarity: 'Uncommon',
        color: 'Yellow',
        level: '3',
        dp: '1000',
    },     
    {
        name: 'Upamon',
        carnumber: 'BT1-003',
        cardrarity: 'Rare',
        color: 'Blue',
        level: '2',
        dp: '-',
    }, 

    {
        name: 'Demidevimon',
        carnumber: 'BT8-072',
        cardrarity: 'Uncommon',
        color: 'Purple',
        level: '3',
        dp: '2000',
    },  
    {
        name: 'Greymon',
        carnumber: 'BT1-015',
        cardrarity: 'Uncommon',
        color: 'Red',
        level: '4',
        dp: '4000',
    }, 
    {
        name: 'Omnimon',
        carnumber: 'BT1-084',
        cardrarity: 'Super Rare',
        color: 'White',
        level: '7',
        dp: '15000',
    },
    {
        name: 'Kabuterimon',
        carnumber: 'BT1-073',
        cardrarity: 'Alternative Art',
        color: 'Green',
        level: '4',
        dp: '5000',
    },                
]


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

        document.getElementById("mainBody__cardList").innerHTML += fullfillDigimonCardFav(digimonInfo[0], getColorCardClass(digimonInfo[0].color));
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

    digimons.forEach((digimon) =>{
        checkNullFields(digimon)
        document.getElementById("mainBody__cardList").innerHTML += fullfillDigimonCardFav(digimon, getColorCardClass(digimon.color));
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

function fullfillDigimonCardFav(digimon, colorCard){
    return `
    <div class="cardContainer-favs ${colorCard}">
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


function getColorCardClass(color) {

    let colorClass;

    switch (color) {
        case "Yellow":
            colorClass = "yellowDigimonCard"; 
          break;
        case "Black":
            colorClass = "blackDigimonCard"; 
          break;
        case "Green":
            colorClass = "greenDigimonCard"; 
          break;
        case "Blue":
            colorClass = "blueDigimonCard"; 
          break;
        case "Purple":
            colorClass = "purpleDigimonCard"; 
          break;
        case "Red":
            colorClass = "redDigimonCard"; 
          break;
        default:
            colorClass = "whiteDigimonCard"; 
          break;
      }

      return colorClass;
}