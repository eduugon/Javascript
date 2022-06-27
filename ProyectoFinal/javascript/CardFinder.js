


let urlDigimon = 'https://digimoncard.io/api-public/search.php?n=Coredramon'

let arrayDigimones = [];

document.getElementById("findCardsButton").addEventListener('click',
    () => {
        let digimonName = document.getElementById("findCardsText").value
        console.log(digimonName);


        fetch(urlDigimon).then((response) =>{
            return response.json()
        }).then((data)=>{
            arrayDigimones = data;
            console.log(arrayDigimones[0])
        })

    }
)