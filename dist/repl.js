import { createInterface } from "readline";
export function cleanInput(input) {
    const splitInput = input.split(" ");
    return splitInput
        .map((word) => word.trim().toLowerCase())
        .filter((word) => word !== "");
}
export function startREPL() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex >",
    });
    rl.prompt();
    rl.on("line", (input) => {
        const arrayOfWords = cleanInput(input);
        if (arrayOfWords.length === 0) {
            rl.prompt();
        }
        console.log(`Your command was: ${arrayOfWords[0]}`);
        rl.prompt();
    });
}
