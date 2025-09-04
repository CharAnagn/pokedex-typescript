import { Cache } from "./pokecache.js";
export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    cache;
    constructor() {
        this.cache = new Cache(Date.now());
    }
    async fetchLocations(pageURL) {
        const url = pageURL || `${PokeAPI.baseURL}/location-area`;
        const cachedLocations = this.cache.get(url);
        if (cachedLocations) {
            return cachedLocations;
        }
        try {
            const resp = await fetch(url);
            if (!resp.ok) {
                throw new Error(`${resp.status} ${resp.statusText}`);
            }
            const locations = await resp.json();
            this.cache.add(url, locations);
            return locations;
        }
        catch (e) {
            throw new Error(`Error fetching locations: ${e.message}`);
        }
    }
    async fetchLocation(locationName) {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
        try {
            const resp = await fetch(url);
            if (!resp.ok) {
                throw new Error(`${resp.status} ${resp.statusText}`);
            }
            const location = await resp.json();
            return location;
        }
        catch (e) {
            throw new Error(`Error fetching locations: ${e.message}`);
        }
    }
}
