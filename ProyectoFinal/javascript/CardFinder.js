


let urlDigimon = 'https://digimoncard.io/api-public/search.php?n=Coredramon'

let arrayDigimones = [];

function checkNullFields(digimon) {
    if(digimon.maineffect === null) {
        digimon.maineffect = "";
    }

    if(digimon.soureeffect === null) {
        digimon.soureeffect = "";
    }

    if(digimon.name === null) {
        digimon.name = "";
    }

    if(digimon.cardnumber === null) {
        digimon.cardnumber = "";
    }

    if(digimon.cardrarity === null) {
        digimon.cardrarity = "";
    }

    if(digimon.color === null) {
        digimon.color = "";
    }

    if(digimon.digi_type === null) {
        digimon.digi_type = "";
    }

    if(digimon.attribute === null) {
        digimon.attribute = "";
    }

    if(digimon.level === null) {
        digimon.level = "";
    }

    if(digimon.play_cost === null) {
        digimon.play_cost = "";
    }

    if(digimon.evolution_cost === null) {
        digimon.evolution_cost = "";
    }

    if(digimon.artist === null) {
        digimon.artist = "";
    }

    if(digimon.dp === null) {
        digimon.dp = "";
    }
}

function buildDigimonUrl() {
    let url = "https://digimoncard.io/api-public/search.php";
    let inputValue = document.getElementById("findCardsText").value.trim();
    let comboColorValue = document.getElementById("combo-color").value;
    let comboTypeValue = document.getElementById("combo-type").value;

    let notFirstElement = "?";

    if(inputValue !== "") {
        url +=  notFirstElement + `n=${inputValue}`
        notFirstElement = "&";
    }
    if(comboColorValue !== "") {
        url += notFirstElement + `color=${comboColorValue}`;
        notFirstElement = "&";
    }
    if(comboTypeValue !== "") {
        url += notFirstElement + `type=${comboTypeValue}`;
        notFirstElement = "&";
    }
    return url;
}

function checkFullfilledFields() {
    return document.getElementById("findCardsText").value.trim() !== "" || document.getElementById("combo-color").value !== "" || document.getElementById("combo-type").value !== "";
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
            colorClass = ""; 
          break;
      }

      return colorClass;
}

function fullfillDigimonCard(digimon, colorClass){
    return `        
    <div class="cardContainer ${colorClass}">        
        <div class="cardContainer-img">
            <div class="cardMainName">
                ${digimon.name}
            </div>
            <div class="cardExtraInfo">
                <div class="cardExtraInfo-collection">
                ${digimon.cardnumber}
                </div>
                <div class="cardExtraInfo-rarity">
                ${digimon.cardrarity}
                </div>
                <div class="cardExtraInfo-color">
                ${digimon.color}
                </div>
            </div>
            <img  id="${digimon.name}" src="${digimon.image_url}" alt="infoCard" class="cardContainer-photoCard"> 
        </div>

        <div class="cardContainer-info">
            <div class="cardContainer-info-elem">
                <div class="elem-title">
                    Type:
                </div> 
                <div>
                ${digimon.digi_type}
                </div> 
            </div>
            <div class="cardContainer-info-elem"> 
                <div class="elem-title">
                    Attribute:
                </div> 
                <div>
                    ${digimon.attribute}
                </div>
            </div>
            <div class="cardContainer-info-elem"> 
                <div class="elem-title">
                    Level:
                </div> 
                <div>
                ${digimon.level}
                </div>
            </div>
            <div class="cardContainer-info-elem"> 
                <div class="elem-title">
                    Play cost:
                </div> 
                <div>
                ${digimon.play_cost}
                </div>
            </div>
            <div class="cardContainer-info-elem"> 
                <div class="elem-title">
                    Evo cost:
                </div> 
                <div>
                    ${digimon.evolution_cost}
                </div>
            </div>
            <div class="cardContainer-info-elem"> 
                <div class="elem-title">
                    Artist:
                </div> 
                <div>
                ${digimon.artist}
                </div>
            </div>
            <div class="cardContainer-info-elem"> 
                <div class="elem-title">
                    Dp:
                </div> 
                <div>
                ${digimon.dp}
                </div>
            </div>
        </div>

        <div class="cardContainer-effects">
            <div class="cardContainer-effects-favourite">
                <div class="favourite-button">
                    <button onclick="saveFavouriteCard('${digimon.cardnumber}')" id="favouriteButton">
                        Guardar
                    </button>
                </div>
            </div>
                
            <div class="cardContainer-effects-source">
                <div class="effect-title">
                    Main Effect
                </div>
                <div class="effect-info">
                    ${digimon.maineffect} 
                </div>
            </div>
            <div class="cardContainer-effects-hesitate">
                <div class="source-title">
                    Source effect:
                </div>
                <div class="source-info">
                    ${digimon.soureeffect} 
                </div>
            </div>
        </div>
    </div>`
}

function setSuccessField(arrayDigimones) {
    document.getElementById("infoField").classList.add("infoFoundField");
    document.getElementById("infoField").classList.remove("warningField");
    document.getElementById("infoField").classList.remove("errorField");
    document.getElementById("infoField").innerText = `Éxito: ${arrayDigimones.length} digimon(es) encontrado(s)`;
    document.getElementById("infoField").style.visibility = "visible";
}

function setErrorField(message) {
    console.log("Error " + message);
    document.getElementById("infoField").classList.remove("infoFoundField");
    document.getElementById("infoField").classList.remove("warningField");
    document.getElementById("infoField").classList.add("errorField");
    document.getElementById("infoField").innerText = message;
    document.getElementById("infoField").style.visibility = "visible";
}

function setWarningField(message) {
    document.getElementById("infoField").classList.remove("infoFoundField");
    document.getElementById("infoField").classList.add("warningField");
    document.getElementById("infoField").classList.remove("errorField");
    document.getElementById("infoField").innerText = "Error, rellena al menos 1 campo de búsqueda";
    document.getElementById("infoField").style.visibility = "visible";
}

function saveFavouriteCard(cardNumber) {
    let arrayDigimon = getFavouriteDigimons();
    arrayDigimon.push(cardNumber);

    localStorage.setItem("favouriteDigimons", JSON.stringify(arrayDigimon));

    console.log(localStorage.getItem("favouriteDigimons"));
}

function getFavouriteDigimons() {
    var arrayDigimon = [];

    if(localStorage.getItem("favouriteDigimons") === null) {
        localStorage.setItem("favouriteDigimons", JSON.stringify(arrayDigimon));
    }

    return JSON.parse(localStorage.getItem("favouriteDigimons"));
}


document.getElementById("findCardsButton").addEventListener('click',
    () => {

        document.getElementById("infoField").style.visibility = "hidden";
        document.getElementById("findBody__cardList").innerHTML = "";

        if(checkFullfilledFields()) {

            fetch(buildDigimonUrl()).then((response) =>{
                if (!response.ok) {
                    throw Error(response.status);
                } 
                return response.json();

            }).then((data)=>{
                arrayDigimones = data;
                
                setSuccessField(arrayDigimones)

                arrayDigimones.forEach(digimon => {
                    checkNullFields(digimon);

                    document.getElementById("findBody__cardList").innerHTML += fullfillDigimonCard(digimon, getColorCardClass(digimon.color));
                });
            }).catch((error) => {
                let message;
                if(error.message === "400") {
                    message = `Error, no se han encontrado digimones`;
                } else {
                    message = `Error, algo ha ido realmente mal`;
                }
                setErrorField(message);
            })
        } else {
            setWarningField();
        }
    }
)


