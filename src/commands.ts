import { commandCatch } from "./command_catch.js";
import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandInspect } from "./command_inspect.js";
import { commandMapFoward, commandMapBackwards } from "./command_map.js";
import { commandPokedex } from "./command_pokedex.js";

import type { CLICommand } from "./state";

export function getCommands(): Record<string, CLICommand> {
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
      name: "mapb",
      description: "Get the previous page of locations",
      callback: commandMapBackwards,
    },
    explore: {
      name: "explore <location_name>",
      description: "Explore the pokemon in the location",
      callback: commandExplore,
    },
    catch: {
      name: "catch <pokemon_name>",
      description: "Attempt to catch a pokemon",
      callback: commandCatch,
    },
    inspect: {
      name: "inpect <pokemon_name>",
      description: "Inspect a pokemon you caught",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description: "See all the pokemon you've caught",
      callback: commandPokedex,
    },
  };
}
