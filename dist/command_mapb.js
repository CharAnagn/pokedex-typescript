import { PokeAPI } from "./pokeapi.js";
export async function commandMapb(state) {
    const api = new PokeAPI();
    let locations = await api.fetchLocations(state.prevLocationsURL);
    for (const location of locations.results) {
        console.log(location.name);
    }
}
