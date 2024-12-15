export const solution = (input: string) => {
    const [gridPre, movesPre] = input.split("\n\n");

    const grid = gridPre.split("\n").map((row) => row.split(""));
    const moves = movesPre.replaceAll("\n", "").trim();

    // console.log(grid, moves);

    // <^^>>>vv<v>>v<<
    const dirs = {
        "^": [-1, 0],
        ">": [0, 1],
        v: [1, 0],
        "<": [0, -1],
    };

    let row = -1;
    let col = -1;

    findLoop: for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            if (grid[r][c] === "@") {
                row = r;
                col = c;
                break findLoop;
            }
        }
    }

    grid[row][col] = ".";

    for (const move of moves) {
        const [dr, dc] = dirs[move as keyof typeof dirs];
        let tr = row;
        let tc = col;

        while (grid[tr + dr][tc + dc] === "O") {
            tr += dr;
            tc += dc;
        }

        if (grid[tr + dr][tc + dc] === ".") {
            grid[tr + dr][tc + dc] = "O";

            row += dr;
            col += dc;
            grid[row][col] = ".";
        }

        // row += r;
        // col += c;

        // if (grid[row][col] === "#") {
        //     row -= r;
        //     col -= c;
        // }
    }

    // console.log(grid.map((row) => row.join("")).join("\n"));

    // console.log({ row, col });

    let score = 0;

    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            if (grid[r][c] === "O") {
                score += r * 100 + c;
            }
        }
    }

    return score;
};
