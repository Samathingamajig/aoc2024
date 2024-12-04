export const solution = (input: string) => {
    const grid = input.split("\n").map((row) => row.split(""));
    let xmases = 0;
    for (let i = 0; i < grid.length - 2; i++) {
        for (let j = 0; j < grid[i].length - 2; j++) {
            if (
                grid[i][j] === "M" &&
                grid[i][j + 2] === "M" &&
                grid[i + 1][j + 1] === "A" &&
                grid[i + 2][j + 2] === "S" &&
                grid[i + 2][j] === "S"
            ) {
                xmases++;
            }

            if (
                grid[i][j] === "M" &&
                grid[i][j + 2] === "S" &&
                grid[i + 1][j + 1] === "A" &&
                grid[i + 2][j + 2] === "S" &&
                grid[i + 2][j] === "M"
            ) {
                xmases++;
            }

            if (
                grid[i][j] === "S" &&
                grid[i][j + 2] === "S" &&
                grid[i + 1][j + 1] === "A" &&
                grid[i + 2][j + 2] === "M" &&
                grid[i + 2][j] === "M"
            ) {
                xmases++;
            }

            if (
                grid[i][j] === "S" &&
                grid[i][j + 2] === "M" &&
                grid[i + 1][j + 1] === "A" &&
                grid[i + 2][j + 2] === "M" &&
                grid[i + 2][j] === "S"
            ) {
                xmases++;
            }
        }
    }
    return xmases;
};
