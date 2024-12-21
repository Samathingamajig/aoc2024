export const solution = (input: string) => {
    const directionalKeypad = [
        ["", "^", "A"],
        ["<", "v", ">"],
    ];

    const directionalStartRow = 0;
    const directionalStartCol = 2;

    const numericKeypad = [
        // [7, 8, 9],
        // [4, 5, 6],
        // [1, 2, 3],
        ["7", "8", "9"],
        ["4", "5", "6"],
        ["1", "2", "3"],
        ["", "0", "A"],
    ];

    console.log("bonjour");

    const numericStartRow = 3;
    const numericStartCol = 2;

    // const dirs = {
    //     "^": [-1, 0],
    //     v: [1, 0],
    //     "<": [0, -1],
    //     ">": [0, 1],
    // };

    const targets = input.split("\n");
    // let bestPaths: string[][] = [];
    let score = 0;

    for (const target of targets) {
        let partialPaths: string[] = [""];
        // console.log("hola");

        {
            let row = numericStartRow;
            let col = numericStartCol;

            for (const t of target) {
                // console.log({ row, col, t });
                // console.log(`row: ${row}, col: ${col}, t: ${t}`);
                if (t == "") {
                    throw new Error("empty string in target");
                }
                const numRow = numericKeypad.findIndex((row) => row.includes(t));
                const numCol = numericKeypad[numRow].indexOf(t);
                const dr = numRow - row;
                const dc = numCol - col;

                // console.log(`at ${numericKeypad[row][col]}, going to ${t}`);

                let nextPartialPaths = new Set<string>();
                const verticalChangeStr = (dr > 0 ? "v" : "^").repeat(Math.abs(dr));
                const horizontalChangeStr = (dc > 0 ? ">" : "<").repeat(Math.abs(dc));
                // console.log({ dr, dc, verticalChangeStr, horizontalChangeStr });

                let verticalThenHorizontal = true;
                let horizontalThenVertical = true;

                if ((numRow == 3 || row == 3) && (numCol == 0 || col == 0)) {
                    // would go over ""
                    // console.log("would go over ''");

                    if (dr < 0) {
                        // do vertical, then horizontal
                        // verticalThenHorizontal = true;
                        horizontalThenVertical = false;
                    } else if (dr > 0) {
                        // do horizontal, then vertical
                        // horizontalThenVertical = true;
                        verticalThenHorizontal = false;
                    }
                }

                if (verticalThenHorizontal) {
                    partialPaths
                        .map((path) => path + verticalChangeStr + horizontalChangeStr)
                        .forEach((path) => nextPartialPaths.add(path));
                }
                if (horizontalThenVertical) {
                    partialPaths
                        .map((path) => path + horizontalChangeStr + verticalChangeStr)
                        .forEach((path) => nextPartialPaths.add(path));
                }

                // console.log(nextPartialPaths.length);

                partialPaths = [...nextPartialPaths].map((path) => path + "A");

                // const shortestPathLength = Math.min(...partialPaths.map((path) => path.length));
                const shortestPathLength = partialPaths.reduce((min, path) => Math.min(min, path.length), Infinity);
                partialPaths = partialPaths.filter((path) => path.length == shortestPathLength);
                // console.log(partialPaths);

                row = numRow;
                col = numCol;
            }
            // console.log("done", partialPaths);
            // console.log("");
            // console.log("");
            // console.log("");
            // console.log("");
        }

        let myIter = 0;
        // console.log("howdy");
        let carryoverPaths = [...partialPaths];
        for (let indirection = 0; indirection < 25; indirection++) {
            let nextCarryoverPaths = new Set<string>();

            for (const target of carryoverPaths) {
                // console.log("target", target);
                let partialPaths2: string[] = [""];

                let row = directionalStartRow;
                let col = directionalStartCol;
                for (const t of target) {
                    if (t == "") {
                        throw new Error("empty string in target");
                    }
                    // console.log("myIter", myIter++);
                    const numRow = directionalKeypad.findIndex((row) => row.includes(t));
                    const numCol = directionalKeypad[numRow].indexOf(t);
                    const dr = numRow - row;
                    const dc = numCol - col;
                    // console.log(`at ${directionalKeypad[row][col]}, going to ${t}`);

                    let nextPartialPaths2 = new Set<string>();

                    const verticalChangeStr = (dr > 0 ? "v" : "^").repeat(Math.abs(dr));
                    const horizontalChangeStr = (dc > 0 ? ">" : "<").repeat(Math.abs(dc));

                    let verticalThenHorizontal = true;
                    let horizontalThenVertical = true;

                    if ((numRow == 0 || row == 0) && (numCol == 0 || col == 0)) {
                        // would go over ""
                        // console.log("would go over ''");

                        if (dr < 0) {
                            // do horizontal, then vertical
                            // horizontalThenVertical = true;
                            verticalThenHorizontal = false;
                        } else if (dr > 0) {
                            // do vertical, then horizontal
                            // verticalThenHorizontal = true;
                            horizontalThenVertical = false;
                        }
                    }

                    if (verticalThenHorizontal) {
                        partialPaths2
                            .map((path) => path + verticalChangeStr + horizontalChangeStr)
                            .forEach((path) => nextPartialPaths2.add(path));
                    }

                    if (horizontalThenVertical) {
                        partialPaths2
                            .map((path) => path + horizontalChangeStr + verticalChangeStr)
                            .forEach((path) => nextPartialPaths2.add(path));
                    }

                    // console.log("nextPartialPaths2.size", nextPartialPaths2.size);

                    partialPaths2 = [...nextPartialPaths2].map((path) => path + "A");

                    // const shortestPathLength = Math.min.apply(
                    //     null,
                    //     partialPaths2.map((path) => path.length),
                    // );
                    const shortestPathLength = partialPaths2.reduce(
                        (min, path) => Math.min(min, path.length),
                        Infinity,
                    );
                    partialPaths2 = partialPaths2.filter((path) => path.length == shortestPathLength).slice(0, 1);
                    // console.log("pp2", partialPaths2);

                    row = numRow;
                    col = numCol;
                }

                // nextCarryoverPaths = nextCarryoverPaths.concat(partialPaths2);
                // partialPaths2.forEach((path) => nextCarryoverPaths.add(path));
                nextCarryoverPaths.add(partialPaths2[0]);
            }

            carryoverPaths = [...nextCarryoverPaths];

            // console.log("cop", carryoverPaths);
            console.log("cop len", carryoverPaths.length);
        }

        // const minCarryoverPathLength = Math.min.apply(
        //     null,
        //     carryoverPaths.map((path) => path.length),
        // );
        const minCarryoverPathLength = carryoverPaths.reduce((min, path) => Math.min(min, path.length), Infinity);
        // console.log({ minCarryoverPathLength });

        // bestPaths = bestPaths.concat(partialPaths);
        const numericPartOfTarget = +target.replace(/[^0-9]/g, "").replace(/^0+/, "");
        const scoreForTarget = minCarryoverPathLength * numericPartOfTarget;
        console.log(
            `target: ${target}, numericPartOfTarget: ${numericPartOfTarget}, minCarryoverPathLength: ${minCarryoverPathLength}, score: ${scoreForTarget}`,
        );
        score += scoreForTarget;
    }

    // console.log(bestPaths);

    // return input;
    return score;
};
