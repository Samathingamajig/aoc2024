// import { PriorityQueue } from "@datastructures-js/priority-queue";

let initialRun = true;
export const solution = (input: string) => {
    const grid = input.split("\n").map((row) => row.split(""));

    const startRow = grid.findIndex((row) => row.includes("S"));
    const startCol = grid[startRow].indexOf("S");
    const endRow = grid.findIndex((row) => row.includes("E"));
    const endCol = grid[endRow].indexOf("E");

    grid[startRow][startCol] = ".";
    grid[endRow][endCol] = ".";

    // const pq = new PriorityQueue<{ row: number; column: number; remainingCheatTime: number }>();
    // const queue: { row: number; column: number; remainingCheatTime: number; time: number }[] = [
    //     [startRow, startCol, 2, 0],
    // ];
    const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];

    // const fastestTime = (grid: string[][]) => {
    const bestScores = grid.map((row) => row.map(() => ({ fromStart: Infinity, fromEnd: Infinity })));
    // const toKey = (row: number, col: number) => row * 1000 + col;

    const queue: [number, number, number][] = [[startRow, startCol, 0]];

    while (queue.length) {
        const [row, col, time] = queue.shift()!;
        if (bestScores[row][col].fromStart <= time) {
            continue;
        }

        bestScores[row][col].fromStart = time;

        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            if (newRow < 0 || newRow >= grid.length || newCol < 0 || newCol >= grid[0].length) {
                continue;
            }

            if (grid[newRow][newCol] === "#") {
                continue;
            }

            queue.push([newRow, newCol, time + 1]);
        }
    }

    queue.push([endRow, endCol, 0]);

    while (queue.length) {
        const [row, col, time] = queue.shift()!;
        if (bestScores[row][col].fromEnd <= time) {
            continue;
        }

        bestScores[row][col].fromEnd = time;

        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            if (newRow < 0 || newRow >= grid.length || newCol < 0 || newCol >= grid[0].length) {
                continue;
            }

            if (grid[newRow][newCol] === "#") {
                continue;
            }

            queue.push([newRow, newCol, time + 1]);
        }
    }

    // return bestScores[endRow][endCol];
    // };

    const fastestNormalTime = bestScores[endRow][endCol].fromStart;
    const threshold = initialRun ? 50 : 100;

    let timeSaves = 0;

    for (let rowA = 0; rowA < grid.length; rowA++) {
        for (let colA = 0; colA < grid[0].length; colA++) {
            for (let rowB = 0; rowB < grid.length; rowB++) {
                for (let colB = 0; colB < grid[0].length; colB++) {
                    if (rowA === rowB && colA === colB) {
                        continue;
                    }

                    const manhattanDistance = Math.abs(rowA - rowB) + Math.abs(colA - colB);

                    if (manhattanDistance > 20) continue;

                    if (grid[rowB][colB] === "#") {
                        continue;
                    }

                    let timeA = bestScores[rowA][colA].fromStart;
                    // if (timeA === Infinity) {
                    //     for (const [dr, dc] of directions) {
                    //         const newRow = rowA + dr;
                    //         const newCol = colA + dc;
                    //         if (newRow < 0 || newRow >= grid.length || newCol < 0 || newCol >= grid[0].length) {
                    //             continue;
                    //         }

                    //         if (grid[newRow][newCol] === "#") {
                    //             continue;
                    //         }

                    //         timeA = Math.min(timeA, bestScores[newRow][newCol].fromStart) + 1;
                    //     }
                    // }

                    const time = timeA + bestScores[rowB][colB].fromEnd + manhattanDistance;

                    if (fastestNormalTime - time >= threshold) {
                        timeSaves++;
                    }
                }
            }
        }
    }

    // const fastestNormalTime = fastestTime(grid);

    // console.log(fastestNormalTime);

    // const timeSaves: Record<number, number> = {};

    // for (let initialRow = 1; initialRow < grid.length - 1; initialRow++) {
    //     for (let initialCol = 1; initialCol < grid[0].length - 1; initialCol++) {
    //         if (grid[initialRow][initialCol] !== "#") {
    //             continue;
    //         }

    //         grid[initialRow][initialCol] = ".";

    //         const time = fastestTime(grid);
    //         const diff = fastestNormalTime - time;

    //         if (diff > 0) {
    //             timeSaves[diff] = timeSaves[diff] ?? 0;
    //             timeSaves[diff]++;
    //         }

    //         grid[initialRow][initialCol] = "#";
    //     }
    // }

    // console.log(timeSaves);

    // const timeSaves2 = [...Object.entries(timeSaves)]
    //     .filter(([time, count]) => +time >= threshold)
    //     .reduce((acc, [time, count]) => acc + count, 0);

    if (initialRun) {
        initialRun = false;
    }

    // return timeSaves2;
    return timeSaves;
};
