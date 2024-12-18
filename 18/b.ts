import { PriorityQueue } from "@datastructures-js/priority-queue";

let initialRun = true;

const partA = (grid: { blocked: boolean; distance: number }[][], size: number): boolean => {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            grid[i][j].distance = Infinity;
        }
    }

    grid[0][0].distance = 0;

    const queue = new PriorityQueue<{ row: number; col: number; score: number }>((a, b) => a.score - b.score);
    queue.enqueue({ row: 0, col: 0, score: 0 });
    const dirs = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
    ];

    while (queue.size() > 0) {
        const { row, col, score } = queue.dequeue();

        for (const [dx, dy] of dirs) {
            const newRow = row + dy;
            const newCol = col + dx;
            if (newRow < 0 || newRow >= size || newCol < 0 || newCol >= size) {
                continue;
            }

            const cell = grid[newRow][newCol];
            if (cell.blocked) {
                continue;
            }

            const newScore = score + 1;
            if (newScore < cell.distance) {
                cell.distance = newScore;
                queue.enqueue({ row: newRow, col: newCol, score: newScore });
            }
        }
    }

    return grid[size - 1][size - 1].distance !== Infinity;
};

export const solution = (input: string) => {
    const locs = input.split("\n").map((l) => l.split(",").map(Number));
    // .slice(0, initialRun ? 12 : 1024);
    // console.log(locs);
    const size = initialRun ? 7 : 71;
    const grid = new Array(size)
        .fill(0)
        .map(() => new Array(size).fill(0).map(() => ({ blocked: false, distance: Infinity })));
    // for (const [x, y] of locs) {
    //     grid[y][x].blocked = true;
    // }
    // console.log(grid.map((r) => r.map((c) => (c.blocked ? "#" : ".")).join("")).join("\n"));

    grid[0][0].distance = 0;

    // console.log(grid);

    // console.log(
    //     grid.map((r) => r.map((c) => (c.blocked ? "#" : c.distance !== Infinity ? "O" : ".")).join(" ")).join("\n"),
    // );

    for (let i = 0; i < locs.length; i++) {
        const [x, y] = locs[i];
        grid[y][x].blocked = true;

        if (!partA(grid, size)) {
            initialRun = false;
            return `${locs[i][0]},${locs[i][1]}`;
        }
    }

    throw new Error("No solution found");

    // if (initialRun) {
    //     initialRun = false;
    // }

    // return grid[size - 1][size - 1].distance;
};
