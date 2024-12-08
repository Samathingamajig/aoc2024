let countAAAA = 0;
export const solution = (input: string) => {
    // if (countAAAA++ > 0) {
    //     return -1;
    // }
    const grid = input.split("\n").map((line) => line.split(""));

    const positions: Record<string, [number, number][]> = {};

    const antinodes = new Set<string>();

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const char = grid[i][j];
            if (char === ".") {
                continue;
            }
            if (!positions[char]) {
                positions[char] = [];
            }
            positions[char].push([i, j]);
        }
    }

    for (const [key, tiles] of Object.entries(positions)) {
        // console.log(key, positions[key]);

        for (let t1i = 0; t1i < tiles.length; t1i++) {
            for (let t2i = t1i + 1; t2i < tiles.length; t2i++) {
                const [t1x, t1y] = tiles[t1i];
                const [t2x, t2y] = tiles[t2i];

                const dx = t2x - t1x;
                const dy = t2y - t1y;

                let x = t1x + dx;
                let y = t1y + dy;

                if (x >= 0 && x < grid.length && y >= 0 && y < grid[x].length) {
                    if (grid[x][y] !== key) {
                        antinodes.add(`${x},${y}`);
                    }
                }

                x = t2x - dx;
                y = t2y - dy;

                if (x >= 0 && x < grid.length && y >= 0 && y < grid[x].length) {
                    if (grid[x][y] !== key) {
                        antinodes.add(`${x},${y}`);
                    }
                }

                x = t1x - dx;
                y = t1y - dy;

                if (x >= 0 && x < grid.length && y >= 0 && y < grid[x].length) {
                    if (grid[x][y] !== key) {
                        antinodes.add(`${x},${y}`);
                    }
                }

                x = t2x + dx;
                y = t2y + dy;

                if (x >= 0 && x < grid.length && y >= 0 && y < grid[x].length) {
                    if (grid[x][y] !== key) {
                        antinodes.add(`${x},${y}`);
                    }
                }

                // for (
                //     let x = t1x, y = t1y;
                //     x < grid.length && x >= 0 && y < grid[x].length && y >= 0;
                //     x += dx, y += dy
                // ) {
                //     // if (x === t1x && y === t1y) {
                //     //     continue;
                //     // }

                //     // if (x === t2x && y === t2y) {
                //     //     continue;
                //     // }

                //     // for (let ; ; y += dy) {
                //     // if (grid[x][y] === "#") {
                //     //     break;
                //     // }
                //     // if (grid[x][y] === ".") {
                //     //     continue;
                //     // }
                //     // if (grid[x][y] !== grid[t1x][t1y] && grid[x][y] !== grid[t2x][t2y]) {
                //     antinodes.add(`${x},${y}`);
                //     // }
                //     // }
                // }

                // // for (let x = t1x; x < grid.length && x >= 0; x -= dx) {
                // for (
                //     let x = t1x, y = t1y;
                //     x < grid.length && x >= 0 && y < grid[x].length && y >= 0;
                //     x -= dx, y -= dy
                // ) {
                //     // for (let y = t1y; y < grid[x].length && y >= 0; y -= dy) {
                //     // if (grid[x][y] === "#") {
                //     //     break;
                //     // }
                //     // if (grid[x][y] === ".") {
                //     //     continue;
                //     // }
                //     // if (grid[x][y] !== grid[t1x][t1y] && grid[x][y] !== grid[t2x][t2y]) {
                //     antinodes.add(`${x},${y}`);
                //     // }
                //     // }
                // }
            }
        }
    }

    // console.log(antinodes);

    return antinodes.size;
};

// console.log("foo");

console.log(
    solution(`..........
..........
..........
....a.....
..........
.....a....
..........
..........
..........
..........`),
);

console.log("bar");
