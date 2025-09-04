export async function commandExplore(state, ...args) {
    if (args.length !== 1) {
        throw new Error("You must provide a location name or id");
    }
    const location = await state.pokeAPI.fetchLocation(args[0]);
    for (const pokemon of location.pokemon_encounters) {
        console.log(`- ${pokemon.pokemon.name}`);
    }
}
