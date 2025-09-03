export function commandHelp(commands) {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:");
    for (const command in commands) {
        console.log(`${command}: ${commands[command].description}`);
    }
}
