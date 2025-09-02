export function cleanInput(input: string): string[] {
  const splitInput = input.split(" ");

  return splitInput
    .map((word) => word.trim().toLowerCase())
    .filter((word) => word !== "");
}
