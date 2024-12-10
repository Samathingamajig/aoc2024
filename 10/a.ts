export const solution = (input: string) => {
    const grid = input.split("\n").map((line) => line.split("").map(Number));

    // console.log(JSON.stringify(grid, null, 2));

    const queue: { i: number; j: number; id: number }[] = [];
    const visited = new Set<string>();
    const reachableNines: Record<number, Set<string>> = {};

    let nextId = 0;

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 0) {
                queue.push({ i, j, id: nextId++ });
            }
        }
    }

    const dirs = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];

    while (queue.length > 0) {
        const { i, j, id } = queue.pop()!;
        for (const dir of dirs) {
            const newI = i + dir[0];
            const newJ = j + dir[1];
            if (newI < 0 || newI >= grid.length || newJ < 0 || newJ >= grid[newI].length) {
                continue;
            }

            if (grid[newI][newJ] === grid[i][j] + 1) {
                if (grid[newI][newJ] === 9) {
                    if (!reachableNines[id]) {
                        reachableNines[id] = new Set();
                    }
                    reachableNines[id].add(`${newI},${newJ}`);
                    // console.log(`${id} can reach 9 at ${newI},${newJ}`);
                } else {
                    // grid[newI][newJ] = 0;
                    queue.push({ i: newI, j: newJ, id });
                }
            }
        }
    }

    return Object.values(reachableNines).reduce((acc, set) => acc + set.size, 0);
};
