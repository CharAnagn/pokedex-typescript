import { createInterface } from "readline";
import { CLICommand } from "./types/types.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";

export function cleanInput(input: string): string[] {
  const splitInput = input.split(" ");

  return splitInput
    .map((word) => word.trim().toLowerCase())
    .filter((word) => word !== "");
}

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
    // can add more commands here
  };
}

export function startREPL() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  rl.prompt();

  rl.on("line", (input) => {
    const words = cleanInput(input);

    if (words.length === 0) {
      rl.prompt();
    }

    const userCommand = words[0];
    const knownCommands = getCommands();

    if (userCommand in knownCommands) {
      try {
        knownCommands[userCommand].callback(getCommands());
      } catch (err) {
        if (err instanceof Error) {
          console.log(`Error: ${err.message}`);
        }
      }
    } else {
      console.log("Unknown command");
      rl.prompt();
      return;
    }
  });
}
