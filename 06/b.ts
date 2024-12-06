// const partAPath = (grid: string[][], initialCaretPos: { i: number; j: number }) => {
const partAPath = (grid: boolean[][], initialCaretPos: { i: number; j: number }) => {
    const visited = new Set<string>();

    const caretPos = { i: initialCaretPos.i, j: initialCaretPos.j };
    // visited.add(`${caretPos.i},${caretPos.j}`);

    const directions = [
        { i: -1, j: 0 },
        { i: 0, j: 1 },
        { i: 1, j: 0 },
        { i: 0, j: -1 },
    ];
    let directionsIndex = 0;

    // let counter = 0;
    while (true) {
        // console.log("hi " + counter++);
        const currentDirection = directions[directionsIndex];
        const nextPos = { i: caretPos.i + currentDirection.i, j: caretPos.j + currentDirection.j };

        if (grid[nextPos.i] === undefined || grid[nextPos.i][nextPos.j] === undefined) {
            break;
        }

        // if (grid[nextPos.i][nextPos.j] === "#") {
        if (grid[nextPos.i][nextPos.j]) {
            directionsIndex = (directionsIndex + 1) % 4;
            continue;
        }

        caretPos.i = nextPos.i;
        caretPos.j = nextPos.j;
        visited.add(`${caretPos.i},${caretPos.j}`);
    }

    visited.delete(`${initialCaretPos.i},${initialCaretPos.j}`); // can't spawn on start position

    return visited;
};

export const solution = (input: string) => {
    // const loopers = new Set<string>();
    let loopers = 0;

    const caretPos = { i: 0, j: 0 };
    // const grid = input.split("\n").map((row) => row.split(""));
    const grid = input.split("\n").map((row, i) =>
        row.split("").map((cell, j) => {
            if (cell === "^") {
                caretPos.i = i;
                caretPos.j = j;
                return false;
            }
            return cell === "#";
        }),
    );

    // console.log(grid.map((row) => row.map((cell) => (cell ? "#" : ".")).join("")).join("\n"));

    // for (let i = 0; i < grid.length; i++) {
    //     if (grid[i].includes("^")) {
    //         caretPos.i = i;
    //         caretPos.j = grid[i].indexOf("^");
    //         grid[i][caretPos.j] = ".";
    //         break;
    //     }
    // }
    // grid[caretPos.i][caretPos.j] = ".";
    // console.log(caretPos);

    const initialPath = partAPath(grid, caretPos);

    // const doRun = (grid: string[][], initialCaretPos: { i: number; j: number }) => {
    const doRun = (grid: boolean[][], initialCaretPos: { i: number; j: number }) => {
        const visited = new Set<string>();
        const directions = [
            { i: -1, j: 0 },
            { i: 0, j: 1 },
            { i: 1, j: 0 },
            { i: 0, j: -1 },
        ];
        let directionsIndex = 0;

        let caretPos = { i: initialCaretPos.i, j: initialCaretPos.j };
        // visited.add(`${caretPos.i},${caretPos.j},${directionsIndex}`);

        // let counter = 0;
        while (true) {
            // console.log("hi " + counter++);
            const currentDirection = directions[directionsIndex];
            const nextPos = { i: caretPos.i + currentDirection.i, j: caretPos.j + currentDirection.j };

            if (grid[nextPos.i] === undefined || grid[nextPos.i][nextPos.j] === undefined) {
                // console.log("Out of bounds at", nextPos);
                return false;
            }

            // if (grid[nextPos.i][nextPos.j] === "#") {
            if (grid[nextPos.i][nextPos.j]) {
                // directionsIndex = (directionsIndex + 1) % 4;
                directionsIndex = (directionsIndex + 1) & 3;
                // directionsIndex = directionsIndex === 3 ? 0 : directionsIndex + 1;
                // directionsIndex = directionsIndex + 1;
                // if (directionsIndex === 4) {
                //     directionsIndex = 0;
                // }
                const key = `${caretPos.i},${caretPos.j},${directionsIndex}`;
                if (visited.has(key)) {
                    // console.log("Found loop at", caretPos);
                    return true;
                }
                visited.add(key);
                continue;
            }

            caretPos.i = nextPos.i;
            caretPos.j = nextPos.j;
        }
    };

    // for (let i = 0; i < grid.length; i++) {
    //     for (let j = 0; j < grid[i].length; j++) {
    //         if (grid[i][j] !== "#") {
    //             // const gridCopy = grid.map((row) => [...row]);
    //             grid[i][j] = "#";
    //             if (doRun(grid, caretPos)) {
    //                 // loopers.add(`${i},${j}`);
    //                 loopers++;
    //             }
    //             grid[i][j] = ".";
    //         }
    //     }
    // }

    for (const pos of initialPath) {
        const [i, j] = pos.split(",").map(Number);
        // console.log({ i, j });

        // const gridCopy = grid.map((row) => [...row]);
        grid[i][j] = true;
        if (doRun(grid, caretPos)) {
            // loopers.add(`${i},${j}`);
            loopers++;
        }
        grid[i][j] = false;
    }

    // return loopers.size;
    return loopers;
};
