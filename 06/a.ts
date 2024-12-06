export const solution = (input: string) => {
    const visited = new Set<string>();

    const grid = input.split("\n").map((row) => row.split(""));
    const caretPos = { i: 0, j: 0 };
    for (let i = 0; i < grid.length; i++) {
        if (grid[i].includes("^")) {
            caretPos.i = i;
            caretPos.j = grid[i].indexOf("^");
            grid[i][caretPos.j] = ".";
            break;
        }
    }
    grid[caretPos.i][caretPos.j] = ".";
    visited.add(`${caretPos.i},${caretPos.j}`);

    const directions = [
        { i: -1, j: 0 },
        { i: 0, j: 1 },
        { i: 1, j: 0 },
        { i: 0, j: -1 },
    ];
    let directionsIndex = 0;

    while (true) {
        const currentDirection = directions[directionsIndex];
        const nextPos = { i: caretPos.i + currentDirection.i, j: caretPos.j + currentDirection.j };

        if (grid[nextPos.i] === undefined || grid[nextPos.i][nextPos.j] === undefined) {
            break;
        }

        if (grid[nextPos.i][nextPos.j] === "#") {
            directionsIndex = (directionsIndex + 1) % 4;
            continue;
        }

        if (grid[nextPos.i][nextPos.j] === ".") {
            caretPos.i = nextPos.i;
            caretPos.j = nextPos.j;
            visited.add(`${caretPos.i},${caretPos.j}`);
            continue;
        }
    }

    return visited.size;
};
