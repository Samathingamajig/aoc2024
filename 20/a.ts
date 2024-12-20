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

    const fastestTime = (grid: string[][]) => {
        const bestScores = grid.map((row) => row.map(() => Infinity));
        // const toKey = (row: number, col: number) => row * 1000 + col;

        const queue: [number, number, number][] = [[startRow, startCol, 0]];

        while (queue.length) {
            const [row, col, time] = queue.shift()!;
            if (bestScores[row][col] <= time) {
                continue;
            }

            bestScores[row][col] = time;

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

        return bestScores[endRow][endCol];
    };

    const fastestNormalTime = fastestTime(grid);

    // console.log(fastestNormalTime);

    const timeSaves: Record<number, number> = {};

    for (let initialRow = 1; initialRow < grid.length - 1; initialRow++) {
        for (let initialCol = 1; initialCol < grid[0].length - 1; initialCol++) {
            if (grid[initialRow][initialCol] !== "#") {
                continue;
            }

            grid[initialRow][initialCol] = ".";

            const time = fastestTime(grid);
            const diff = fastestNormalTime - time;

            if (diff > 0) {
                timeSaves[diff] = timeSaves[diff] ?? 0;
                timeSaves[diff]++;
            }

            grid[initialRow][initialCol] = "#";
        }
    }

    // console.log(timeSaves);

    const threshold = initialRun ? 0 : 100;

    const timeSaves2 = [...Object.entries(timeSaves)]
        .filter(([time, count]) => +time >= threshold)
        .reduce((acc, [time, count]) => acc + count, 0);

    if (initialRun) {
        initialRun = false;
    }

    return timeSaves2;
};
