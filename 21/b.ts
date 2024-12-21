let initialRun = true;
export const solution = (input: string) => {
    const directionalKeypad = [
        ["", "^", "A"],
        ["<", "v", ">"],
    ];

    const directionalStartRow = 0;
    const directionalStartCol = 2;
    const directionalEvilRow = 0;
    const directionalEvilCol = 0;

    const numericKeypad = [
        // [7, 8, 9],
        // [4, 5, 6],
        // [1, 2, 3],
        ["7", "8", "9"],
        ["4", "5", "6"],
        ["1", "2", "3"],
        ["", "0", "A"],
    ];

    // console.log("bonjour");

    const numericStartRow = 3;
    const numericStartCol = 2;
    const numericEvilRow = 3;
    const numericEvilCol = 0;

    // const dirs = {
    //     "^": [-1, 0],
    //     v: [1, 0],
    //     "<": [0, -1],
    //     ">": [0, 1],
    // };

    const targets = input.split("\n");
    // let bestPaths: string[][] = [];
    let score = 0;

    const calculateLengthCache = new Map<string, number>();
    const toKey = (path: string, depth: number) => `${path},${depth}`;

    const INITIAL_DEPTH = initialRun ? 3 : 26;
    // const INITIAL_DEPTH = initialRun ? 3 : 101;

    let mismatches = 0;

    const calculateLength = (path: string, depth: number): number => {
        // console.log(`calculateLength("${path}", ${depth})`);
        const key = toKey(path, depth);
        if (calculateLengthCache.has(key)) {
            return calculateLengthCache.get(key)!;
        }

        if (depth === 0) {
            const answer = path.length;
            calculateLengthCache.set(key, answer);
            return answer;
        }

        const gridOfChoice = depth === INITIAL_DEPTH ? numericKeypad : directionalKeypad;
        const startRow = depth === INITIAL_DEPTH ? numericStartRow : directionalStartRow;
        const startCol = depth === INITIAL_DEPTH ? numericStartCol : directionalStartCol;
        const evilRow = depth === INITIAL_DEPTH ? numericEvilRow : directionalEvilRow;
        const evilCol = depth === INITIAL_DEPTH ? numericEvilCol : directionalEvilCol;

        let row = startRow;
        let col = startCol;

        let totalLength = 0;

        for (const t of path) {
            if (t === "") {
                throw new Error("empty string in target");
            }
            // console.log(`going for t = ${t}`);
            const numRow = gridOfChoice.findIndex((row) => row.includes(t));
            const numCol = gridOfChoice[numRow].indexOf(t);
            const dr = numRow - row;
            const dc = numCol - col;
            const verticalChangeStr = (dr > 0 ? "v" : "^").repeat(Math.abs(dr));
            const horizontalChangeStr = (dc > 0 ? ">" : "<").repeat(Math.abs(dc));

            let verticalThenHorizontal = true;
            let horizontalThenVertical = true;

            if ((numRow === evilRow || row === evilRow) && (numCol === evilCol || col === evilCol)) {
                const flip = depth === INITIAL_DEPTH ? -1 : 1;

                if (flip * dr < 0) {
                    // horizontalThenVertical = true;
                    verticalThenHorizontal = false;
                } else if (flip * dr > 0) {
                    // verticalThenHorizontal = true;
                    horizontalThenVertical = false;
                }
            }

            // let bestNextPath = "";
            let bestNextLength = Infinity;

            if (verticalThenHorizontal) {
                const nextPath = verticalChangeStr + horizontalChangeStr + "A";
                const nextLength = calculateLength(nextPath, depth - 1);
                if (nextLength < bestNextLength) {
                    // bestNextPath = nextPath;
                    bestNextLength = nextLength;
                }
            }
            if (horizontalThenVertical) {
                const nextPath = horizontalChangeStr + verticalChangeStr + "A";
                const nextLength = calculateLength(nextPath, depth - 1);
                if (nextLength < bestNextLength) {
                    if (verticalThenHorizontal) mismatches++;
                    // bestNextPath = nextPath;
                    bestNextLength = nextLength;
                }
            }

            totalLength += bestNextLength;

            row = numRow;
            col = numCol;
        }

        const answer = totalLength;
        calculateLengthCache.set(key, answer);
        return answer;
    };

    initialRun = false;

    // console.log(`mismatches: ${mismatches}`);

    // return calculateLength(targets[0], INITIAL_DEPTH);
    return targets.reduce((acc, target, i) => {
        const numericPartOfTarget = +target.replace(/[^0-9]/g, "").replace(/^0+/, "");
        const scoreForTarget = calculateLength(target, INITIAL_DEPTH) * numericPartOfTarget;
        if (i == targets.length - 1) {
            console.log(`mismatches: ${mismatches}`);
            // console.log({ acc, target, i });
        }
        // console.log(`target: ${target}, numericPartOfTarget: ${numericPartOfTarget}, score: ${scoreForTarget}`);
        return acc + scoreForTarget;
    }, 0);
};
