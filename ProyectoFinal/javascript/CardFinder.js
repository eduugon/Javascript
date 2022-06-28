


let urlDigimon = 'https://digimoncard.io/api-public/search.php?n=Coredramon'

let arrayDigimones = [];

function checkUndefinedFields(digimon) {
    if(digimon.maineffect === undefined) {
        digimon.maineffect = "";
    }

    if(digimon.sourceffect === undefined) {
        digimon.sourceffect = "";
    }
}

document.getElementById("findCardsButton").addEventListener('click',
    () => {
        let digimonName = document.getElementById("findCardsText").value
        console.log(digimonName);


        fetch(urlDigimon).then((response) =>{
            return response.json()
        }).then((data)=>{
            arrayDigimones = data;
            arrayDigimones.forEach(digimon => {

                checkUndefinedFields(digimon);


                let infoDigimon = `        
            <div class="cardContainer">        
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
                            ${digimon.sourceffect} 
                        </div>
                    </div>
                </div>
            </div>`

            document.getElementById("findBody__cardList").innerHTML += infoDigimon;
            });
        })

    }
)