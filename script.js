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
async function waitForData(){
    const images = document.querySelectorAll(".small-pokemon-sprite-img");
    //Parallel statt sequenziell auf alle Bilder warten.
    await Promise.all(
        Array.from(images).map((img)=>(img.complete ? Promise.resolve() : img.decode().catch(() =>{})))
    );
    toggleLoadingSpinner();    
    }
function renderSmallPokemonCard(pokemon, cardIndex) {
    const sprite = document.getElementById(`pokemon-sprite-${cardIndex}`);
    sprite.src = pokemon.sprites.other["official-artwork"].font_default;
    sprite.style.display="block";
   
    const typeContainer =document.getElementById(`pokemon-type-${cardIndex}`);
    typeContainer.innerHTML =pokemon.types.map((type) => showPokemonTypeBtn(type)).join("");
    pokemon.types.forEach((type) => sprite.classList.add(`pokemon-type-${type.type.name}`));
    renderPokemonNameID(pokemon, cardIndex);
}
function renderPokemonNameID (pokemon,cardIndex){
    const nameEl = document.getElementById(`pokemon-name-${cardIndex}`);
    nameEl.textContent = pokemon.name.charAt(0).toUpperCase() +pokemon.name.slice(1);
    const idEl = document.getElementById(`pokemon-id-${cardIndex}`);
    idEl.textContent = pokemon.id;
}
