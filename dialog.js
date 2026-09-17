function openPokemonDialog(index) {
    if (searchedPokemonArray) {
        const pokemon = pokemonArray[index];
        currentIndex = searchedPokemonArray.indexOf(pokemon);
    } else {
        currentIndex = index;
    }
    myDialog.showModal();
    myDialog.classList.add("opened");
    document.body.classList.add("no-scroll");
    renderCurrentPokemon();
}

function closeDialog() {
    myDialog.close();
}
function renderBigPokemonCard(index) {
    const pokemon = pokemonArray[index];
    if(!pokemon) {
        console.error(`No Pokémon found  ${index}`);
    return;
    }
    const dialogSprite = document.getElementById(`pokemon-dialog-sprite-${index}`);
    dialogSprite.src = pokemon.sprites.other["official-artwork"].front_default;
    dialogSprite.style.display = "block";
    pokemon.types.forEach((type) => dialogSprite.classList.add(`pokemon-type-${type.type.name}`));

    renderDialogTypeIDName(index, pokemon);
}
 function renderDialogTypeIDName(index, pokemon) {
    const nameEl = document.getElementById(`pokemon-dialog-name-${index}`);
    nameEl.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    const typeContainer = document.getElementById(`pokemon-dialog-types-${index}`);
    typeContainer.innerHTML = pokemon.types.map((type) => showDialogTypeBtn(type)).join("");

    const idEl = document.getElementById(`pokemon-dialog-id-${index}`);
    idEl.textContent = `#${pokemon.id}`;

    renderPokemonStats(index);
}

function changeCard(direction) {
    const currentPokemonArray = searchedPokemonArray || pokemonArray;
    currentIndex += direction;
    if(currentIndex >= currentPokemonArray.length) currentIndex = 0;
    if(currentIndex < 0) currentIndex = currentPokemonArray.length - 1;
    renderCurrentPokemon();
}

function renderCurrentPokemon() {
    const currentPokemonArray = searchedPokemonArray || pokemonArray;
    const pokemon = currentPokemonArray[currentIndex];
    const pokemonIndex = pokemonArray.indexOf(pokemon);

    document.getElementById("pokemon-dialog-content").innerHTML = getTemplateBigPokemonCard(pokemonIndex);
    renderBigPokemonCard(pokemonIndex);
}