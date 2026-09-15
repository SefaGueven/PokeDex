const BASE_URL = "https://pokeapi.co/api/v2/";
const LIMIT = 28;
//   Grundstruktur einer  Pokédex-App  – mit Paginierung (offset), 
//  einer Gesamtliste (pokemonArray), einem aktuellen Anzeige-Index (currentIndex) und
//  einem separaten Platz für Suchergebnisse (searchedPokemonArray).
let offset = 0;
let pokemonArray =[];
let currentIndex = 0;
let searchedPokemonArray = null ;

// DOM-Referenzen, die im ganzen Script wiederverwendet werden
const myDialog =document.getElementById("pokemon-dialog");
const loadMoreBtn = document.getElementById("loading-more-pokemon");
const backToStart = document.getElementById("back-to-start-btn");
const errorMessage = document.getElementById("error-no-match-found");

//Cleanup dafür,dass die Seite wieder normal ist,sobald man den Dialogfenster schließt.
myDialog.addEventListener("close",() => {
    myDialog.classList.remove("opened");
    document.body.classList.remove("no-scroll");
});
function init() {
    loadMoreBtn.style.display ="none"; // Mehr Laden-button unsichtbar bisDaten da sind.
    fetchData(offset);
    
}
function toggleLoadingSpinner(){
    document.getElementById("loading-container").classList.toggle("hide-loading-spinner");
}
async function fetchData(offset) {
    try{
        const response = await fetch(`${BASE_URL}pokemon?limit=${LIMIT}&offset=${offset}`);
        if(!response.ok)throw new Error("There are problems loading the Pokémon! Please reload the page!");
        const responseToJson = await response.json();
        await getDetails(responseToJson);
        }catch (error){
            renderError(error.massage);
        }
    
}
function renderError(message) {
    loadMoreBtn.style.display = "none";
    errorMessage.innerHTML += showErrorMessage(message);
}
// Requests starten
async function getDetails(responseToJson) {
    const promises =responseToJson.resuluts.map((pokemon) =>    //Warten, bis alle fertig sind.
        fetch(pokemon.url).then((res) => res.json()) // wandelt jede Response direkt in JSON um.
    );
    const pokemonDetails = await Promise.all(promises);
    await renderPokemons(pokemonDetails);    //Anzeigen
    loadMoreBtn.style.display ="flex";  //Button wieder sichtbar.
}

async function renderPokemons(pokemonDetails) {
    const thumbnailRef = document.getElementById("pokemon-thumbnails-content");
    if (offset === 0)thumbnailRef.innerHTML ="";

     // Templates erst als String zusammenbauen und einmalig einfügen,
    // statt bei jeder Iteration innerHTML += (spart Reflows)
    const startIndex = pokemonArray.length;
    const templates = pokemonDetails.map((_, i) =>getTemplateSmallPokemonCard(startIndex +i));
    thumbnailRef.innerHTML += templates.join("");

    pokemonDetails.forEach((pokemon, i) =>{
        renderSmallPokemonCard(pokemon,startIndex + i);
        pokemonArray.push(pokemon); 
       });
       await waitForData();
}


