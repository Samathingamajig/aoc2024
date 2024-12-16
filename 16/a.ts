export const solution = (input: string) => {
    const grid = input.split("\n").map((row) => row.split(""));

    const startRow = grid.findIndex((row) => row.includes("S"));
    const startCol = grid[startRow].indexOf("S");
    const endRow = grid.findIndex((row) => row.includes("E"));
    const endCol = grid[endRow].indexOf("E");
    console.log(startRow, startCol, endRow, endCol);

    const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];

    const toKey = (row: number, col: number) => row * 1000 + col;

    const queue: [number, number, number, number, Set<number>][] = [
        [startRow, startCol, 0, 0, new Set<number>([toKey(startRow, startCol)])],
        [startRow, startCol, 1, 1000, new Set<number>([toKey(startRow, startCol)])],
        [startRow, startCol, 2, 2000, new Set<number>([toKey(startRow, startCol)])],
        [startRow, startCol, 3, 1000, new Set<number>([toKey(startRow, startCol)])],
    ];

    // dijstra's best path

    let bestScore = Infinity;

    mainLoop: while (queue.length) {
        // console.log(queue.length);
        const [row, col, dirIdxTemp, score, visited] = queue.shift()!;
        if (score >= bestScore) {
            continue;
        }

        const dirIdx = dirIdxTemp % 4;

        const [dr, dc] = directions[dirIdx];

        let newRow = row;
        let newCol = col;

        let newScore = score;
        let successfulMove = false;
        let mycount = 0;

        while (grid[newRow + dr] && grid[newRow + dr][newCol + dc] && grid[newRow + dr][newCol + dc] !== "#") {
            newRow += dr;
            newCol += dc;
            // console.log(
            //     grid.map((row, r) => row.map((char, c) => (visited.has(toKey(r, c)) ? "x" : char)).join("")).join("\n"),
            // );

            // if (++mycount % 2 === 0) {
            //     prompt();
            // }
            if (visited.has(toKey(newRow, newCol))) {
                continue mainLoop;
            }

            visited.add(toKey(newRow, newCol));

            newScore++;
            if (newRow === endRow && newCol === endCol) {
                // console.log("potential best score:", newScore);
                bestScore = Math.min(bestScore, newScore);

                // console.log(
                //     grid
                //         .map((row, r) => row.map((char, c) => (visited.has(toKey(r, c)) ? "x" : " ")).join(""))
                //         .join("\n"),
                // );

                // console.log(visited.size);

                continue mainLoop;
            }

            const [dr1, dc1] = directions[(dirIdx + 1) % 4];
            const [dr2, dc2] = directions[(dirIdx + 3) % 4];

            if (grid[newRow + dr1] && grid[newRow + dr1][newCol + dc1] && grid[newRow + dr1][newCol + dc1] !== "#") {
                queue.push([newRow, newCol, dirIdx + 1, newScore + 1000, structuredClone(visited)]);
            }

            if (grid[newRow + dr2] && grid[newRow + dr2][newCol + dc2] && grid[newRow + dr2][newCol + dc2] !== "#") {
                queue.push([newRow, newCol, dirIdx + 3, newScore + 1000, structuredClone(visited)]);
            }

            successfulMove = true;
        }

        // console.log(newScore);

        if (newRow === 9 && newCol === 3) {
            // console.log(
            //     grid.map((row, r) => row.map((char, c) => (visited.has(toKey(r, c)) ? "x" : " ")).join("")).join("\n"),
            // );
            // console.log(visited.size, newScore);
        }

        if (successfulMove) {
            // queue.push([newRow, newCol, dirIdx, newScore, structuredClone(visited)]);
            queue.push([newRow, newCol, dirIdx + 1, newScore + 1000, structuredClone(visited)]);
            // queue.push([newRow, newCol, dirIdx + 2, newScore + 2000, structuredClone(visited)]);
            queue.push([newRow, newCol, dirIdx + 3, newScore + 1000, structuredClone(visited)]);
        }
    }

    return bestScore;
};
