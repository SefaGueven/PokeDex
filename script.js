const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
const limit = 25;
let offset = 0;
let pokemonArray = [];
let currentIndex = 0;
let searchedPokemonArray = [];


function init   () {
const loadMoreButton = document.getElementById("load-more");
loadMoreButton.style.display = "none";
fetchData(offset);
}
function toggleLoadingSpinner(){
    const loadingContainer = document.getElementById("loading-container");
    loadingContainer.classList.toggle("hide-loading-spinner");
}


let allPkms= [{
name: "pkm1",
type: "grass"
},
]

function renderNames() {
    for (let i = 0; i < allPkms.length; i++) {
    document.getElementById('list').innerHTML+=`<h1 class="bg_${allPkms[i].type}">${allPkms[i].name}</h1>`
        
    }
    
}
function getColor(type) {
    switch (type) {
        case "grass":
            return "#12541";
        default:
            return "#12541";
    }
    
} 