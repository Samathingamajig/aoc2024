// let fullRun = false;
export const solution = (input: string) => {
    // if (!fullRun) {
    //     fullRun = true;
    //     return 9021;
    // }
    const [gridPre, movesPre] = input.split("\n\n");

    const grid = gridPre.split("\n").map((row) =>
        row
            .split("")
            .flatMap((cell) => {
                switch (cell) {
                    case "#":
                        return ["#", "#"];
                    case "O":
                        return ["[", "]"];
                    case ".":
                        return [".", "."];
                    case "@":
                        return ["@", "."];
                    default:
                        throw new Error("Invalid cell");
                }
            })
            .map((cell) => ({ val: cell, status: 0 })),
    );
    // const gridFlat = grid.flat();
    // console.log(gridFlat);
    const moves = movesPre.replaceAll("\n", "").trim();
    // console.log(grid.map((row) => row.map((c) => c.val).join("")).join("\n"));

    // console.l

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
            if (grid[r][c].val === "@") {
                row = r;
                col = c;
                break findLoop;
            }
        }
    }

    grid[row][col].val = ".";

    let id = 1;

    const canMove = (r: number, c: number, dr: number, dc: number, fromPair: boolean): boolean => {
        if (grid[r][c].status === id) {
            return grid[r][c].val !== "#";
        }

        grid[r][c].status = id;

        // const newR = r + dr;
        // const newC = c + dc;
        if (grid[r][c].val === "#") {
            return false;
        } else if (grid[r][c].val === ".") {
            return true;
        } else if (grid[r][c].val === "[") {
            if (dr === 0) {
                return canMove(r, c + dc, dr, dc, false);
            }

            return canMove(r + dr, c, dr, dc, false) && (fromPair || canMove(r, c + 1, dr, dc, true));
        } else if (grid[r][c].val === "]") {
            if (dr === 0) {
                return canMove(r, c + dc, dr, dc, false);
            }

            return canMove(r + dr, c, dr, dc, false) && (fromPair || canMove(r, c - 1, dr, dc, true));
        }

        throw new Error("Invalid cell");
    };

    const moveFn = (r: number, c: number, dr: number, dc: number, fromPair: boolean) => {
        // if (grid[r][c].moved) {
        if (grid[r][c].status === id) {
            return;
        }

        // grid[r][c].moved = true;
        grid[r][c].status = id;

        if (grid[r][c].val === ".") {
            return;
        } else if (grid[r][c].val === "[") {
            if (dr === 0) {
                moveFn(r, c + dc, dr, dc, false);
                grid[r + dr][c + dc].val = grid[r][c].val;
                // grid[r + dr][c + dc].moved = true;
                grid[r + dr][c + dc].status = id;
                grid[r][c].val = ".";
                return;
            }

            moveFn(r + dr, c, dr, dc, false);
            grid[r + dr][c + dc].val = grid[r][c].val;
            // grid[r + dr][c + dc].moved = true;
            grid[r + dr][c + dc].status = id;
            grid[r][c].val = ".";

            if (!fromPair) {
                moveFn(r, c + 1, dr, dc, true);
                grid[r][c + 1].val = ".";
                grid[r][c + 1].status = id;
            }
        } else if (grid[r][c].val === "]") {
            if (dr === 0) {
                moveFn(r, c + dc, dr, dc, false);
                grid[r + dr][c + dc].val = grid[r][c].val;
                // grid[r + dr][c + dc].moved = true;
                // grid[r + dr][c + dc].status = id;
                grid[r][c].val = ".";
                return;
            }

            moveFn(r + dr, c, dr, dc, false);
            grid[r + dr][c + dc].val = grid[r][c].val;
            // grid[r + dr][c + dc].moved = true;
            grid[r + dr][c + dc].status = id;
            grid[r][c].val = ".";
            if (!fromPair) {
                moveFn(r, c - 1, dr, dc, true);
                grid[r][c - 1].val = ".";
                // grid[r][c + 1].status = id;
            }
        } else {
            throw new Error('Invalid cell "' + grid[r][c].val + '"');
        }
    };

    for (const move of moves) {
        const [dr, dc] = dirs[move as keyof typeof dirs];
        let tr = row;
        let tc = col;

        // console.log("dir = " + move);
        if (canMove(row + dr, col + dc, dr, dc, false)) {
            id++;
            // console.log("true");
            moveFn(row + dr, col + dc, dr, dc, false);
            row += dr;
            col += dc;
        } else {
            // break;
        }

        id++;

        // while (grid[tr + dr][tc + dc] === "O") {
        //     tr += dr;
        //     tc += dc;
        // }

        // if (grid[tr + dr][tc + dc] === ".") {
        //     grid[tr + dr][tc + dc] = "O";

        //     row += dr;
        //     col += dc;
        //     grid[row][col] = ".";
        // }

        // row += r;
        // col += c;

        // if (grid[row][col] === "#") {
        //     row -= r;
        //     col -= c;
        // }
        // const temp = grid[row][col].val;
        // grid[row][col].val = "@";
        // console.log(grid.map((row) => row.map((c) => c.val).join("")).join("\n"));
        // console.log("(temp = " + temp + ")");
        // grid[row][col].val = temp;
        // prompt("\n");

        // for (const cell of gridFlat) {
        //     cell.moved = false;
        // }
    }

    // grid[row][col].val = "@";

    // console.log(grid.map((row) => row.map((c) => c.val).join("")).join("\n"));

    // console.log({ row, col });

    let score = 0;

    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            if (grid[r][c].val === "[") {
                score += r * 100 + c;
            }
        }
    }

    return score;
};
