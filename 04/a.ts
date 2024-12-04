export const solution = (input: string) => {
    const grid = input.split("\n").map((row) => row.split(""));
    const forward = input.split("\n").reduce((acc, row) => acc + row.split("XMAS").length - 1, 0);
    const backward = input.split("\n").reduce((acc, row) => acc + row.split("SAMX").length - 1, 0);
    let diagonal = 0;
    for (let i = 0; i < grid.length - 3; i++) {
        for (let j = 0; j < grid[i].length - 3; j++) {
            if (
                grid[i][j] === "X" &&
                grid[i + 1][j + 1] === "M" &&
                grid[i + 2][j + 2] === "A" &&
                grid[i + 3][j + 3] === "S"
            ) {
                // console.log("\\", i, j);
                diagonal++;
            }

            if (
                grid[i][j + 3] === "X" &&
                grid[i + 1][j + 2] === "M" &&
                grid[i + 2][j + 1] === "A" &&
                grid[i + 3][j] === "S"
            ) {
                // console.log("/", i, j);
                diagonal++;
            }

            if (
                grid[i][j] === "S" &&
                grid[i + 1][j + 1] === "A" &&
                grid[i + 2][j + 2] === "M" &&
                grid[i + 3][j + 3] === "X"
            ) {
                // console.log("\\b", i, j);
                diagonal++;
            }

            if (
                grid[i][j + 3] === "S" &&
                grid[i + 1][j + 2] === "A" &&
                grid[i + 2][j + 1] === "M" &&
                grid[i + 3][j] === "X"
            ) {
                // console.log("/b", i, j);
                diagonal++;
            }
        }
    }

    let vertical = 0;

    for (let i = 0; i < grid.length - 3; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === "X" && grid[i + 1][j] === "M" && grid[i + 2][j] === "A" && grid[i + 3][j] === "S") {
                vertical++;
            }

            if (grid[i][j] === "S" && grid[i + 1][j] === "A" && grid[i + 2][j] === "M" && grid[i + 3][j] === "X") {
                vertical++;
            }
        }
    }

    console.log({ forward, backward, diagonal, vertical });

    return forward + backward + diagonal + vertical;
};
