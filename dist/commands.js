import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMapFoward, commandMapBackwards } from "./command_map.js";
export function getCommands() {
    return {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
        map: {
            name: "map",
            description: "Get the next page of locations",
            callback: commandMapFoward,
        },
        mapb: {
            name: "map",
            description: "Get the previous page of locations",
            callback: commandMapBackwards,
        },
    };
}
