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